from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn as nn
import joblib
from textblob import TextBlob
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "saved_model"  
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ------------------------
# Load tokenizer + BERT backbone
# ------------------------
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

# ------------------------
# Load label encoder + scaler
# ------------------------
le = joblib.load(os.path.join(MODEL_PATH, "label_encoder.pkl"))
scaler = joblib.load(os.path.join(MODEL_PATH, "scaler.pkl"))

# ------------------------
# Define model class
# ------------------------
class BertWithFeatures(nn.Module):
    def __init__(self, bert_model_name, num_features, num_labels):
        super().__init__()
        self.bert = AutoModel.from_pretrained(bert_model_name)
        hidden_size = self.bert.config.hidden_size
        self.classifier = nn.Sequential(
            nn.Linear(hidden_size + num_features, 128),
            nn.ReLU(),
            nn.Linear(128, num_labels)
        )

    def forward(self, input_ids, attention_mask, features):
        input_ids = input_ids.to(device)
        attention_mask = attention_mask.to(device)
        features = features.to(device)
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        combined = torch.cat([pooled_output, features], dim=1)
        logits = self.classifier(combined)
        return logits

# ------------------------
# Load classifier weights
# ------------------------
model = BertWithFeatures("bert-base-uncased", num_features=3, num_labels=len(le.classes_))
model.load_state_dict(torch.load(os.path.join(MODEL_PATH, "pytorch_model.bin"), map_location=device))
model.to(device)
model.eval()
USE_REAL_MODEL = True

# ------------------------
# Label map
# ------------------------
label_map = {i: label for i, label in enumerate(le.classes_)}

# ------------------------
# Compute sentiment & relevancy
# ------------------------
def compute_sentiment(text):
    return (TextBlob(text).sentiment.polarity + 1) / 2  # -1..1 -> 0..1

def compute_relevancy(text):
    words = text.split()
    if len(words) == 0:
        return 0.5
    long_words = sum(1 for w in words if len(w) > 3)
    return long_words / len(words)  # 0..1

# ------------------------
# Predict endpoint
# ------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    review = data.get("review", "").strip()

    if not review:
        return jsonify({"category": "INVALID_INPUT"}), 400

    # Tính numeric features
    review_length = len(review)
    sentiment = compute_sentiment(review)
    relevancy_score = compute_relevancy(review)
    numeric_features = scaler.transform([[review_length, sentiment, relevancy_score]])
    numeric_features = torch.tensor(numeric_features, dtype=torch.float).to(device)

    # Tokenize
    inputs = tokenizer([review], return_tensors="pt", truncation=True, padding=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    # Predict
    with torch.no_grad():
        logits = model(inputs['input_ids'], inputs['attention_mask'], numeric_features)
        pred_id = torch.argmax(logits, dim=1).item()

    category = label_map[pred_id]

    return jsonify({
        "category": category,
        "sentiment": sentiment,
        "relevancy_score": relevancy_score,
        "review_length": review_length
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
