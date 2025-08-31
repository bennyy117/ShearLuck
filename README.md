# ShearLuck: Trustworthy Location Reviews

**Team**: ShearLuck, National University of Singapore  
**Competition**: TikTok TechJam 2025, Track 1  
**Objective**: Automatically classify location reviews as Valid, Advertisement, Irrelevant, or Not Visited with high accuracy (>90%) and transparency.

This full-stack app uses a Flask backend with a BERT-based model and a ReactJS frontend (built with Vite) for real-time review classification.

## Project Structure

- **backend/**: Flask API (`app.py`) for classification.
- **frontend/**: ReactJS app (using Vite) for user interaction.
- **saved_model/**: Model weights (`pytorch_model.bin`), `label_encoder.pkl`, `scaler.pkl`.
- **data/**: ~6,400 balanced reviews (1,600 per class).

## Prerequisites

- Python 3.11+ (backend)
- Node.js 16+, npm (frontend)
- CUDA-enabled GPU (optional)
- Git

## Setup Instructions

### Backend
1. Clone the repo:
   ```bash
   git clone https://github.com/ShearLuck/Trustworthy-Location-Reviews.git
   cd Trustworthy-Location-Reviews
   ```

2. Create virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:

   ```bash
   pip install flask flask-cors transformers torch textblob joblib pandas numpy scikit-learn
   ```
4. Ensure `saved_model` has `pytorch_model.bin`, `label_encoder.pkl`, `scaler.pkl`.
5. Run backend:

   ```bash
   python backend/app.py
   ```

   API runs at `http://0.0.0.0:5001/predict`.

### Frontend

1. Navigate to frontend:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   npm install lucide-react react-router-dom leaflet react-leaflet
   ```
3. Setup TailwindCSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

4. Run dev server:

   ```bash
   npm run dev
   ```

   Access at `http://localhost:5173` (port may vary).

## Usage

* **Frontend**: Visit `http://localhost:5173`, enter a review, and view classification (Valid, Advertisement, Irrelevant, Not Visited). Confidence scores and parameters can be seen in `Track1:Filter-Reviews-Noise.ipynb`.
* **API**: POST to `http://localhost:5001/predict`:

  ```json
  {"review": "Great restaurant!"}
  ```

  Response:

  ```json
  {"category": "Valid", "sentiment": 0.75, "relevancy_score": 0.6, "review_length": 17}
  ```

## Technical Details

### Dataset

* **Sources**: Hotel Reviews (2,700), Google Maps Restaurant Reviews (1,600), Advertisement Text (1,600), Deceptive Opinion Spam (400).
* **Total**: 6,400 balanced reviews (1,600 per class).
* **Labeling**: Manual + few-shot labeling.
* **Preprocessing**: Drop missing/erroneous rows, lowercase text, standardize formats.

### Features

* **Textual**: Sentiment (TextBlob), relevancy (word-length heuristic).
* **Metadata**: Review length.
* **Scaler**: StandardScaler for numeric features.

### Model

* **Tokenizer**: `bert-base-uncased`.
* **Architecture**: BERT embeddings + numeric features, fully connected layers (128 units, ReLU, 4-way softmax).
* **Training**: PyTorch, Hugging Face Trainer, balanced dataset.
* **Metrics**: Accuracy (0.99375), Macro F1 (0.99375).

### Frontend

* ReactJS, TailwindCSS, built with Vite.
* Features: Review input, classification display, map integration with Leaflet, navigation with React Router, optional SHAP visualizations.

## Outcomes

* \>90% accuracy, balanced performance across classes.
* Scalable few-shot labeling.
* Transparent predictions via SHAP.
* Reduces manual moderation for platforms like Google Maps.

## Technical Stack

* **Backend**: Flask, PyTorch, Hugging Face Transformers, TextBlob, scikit-learn.
* **Frontend**: ReactJS, TailwindCSS, Vite.
* **APIs**: OpenAI o-mini-4.
* **Tools**: Google Colab (GPU), VS Code, GitHub, GitHub Actions.

## Troubleshooting

* **Backend**: Verify `saved_model` files, CUDA, dependencies.
* **Frontend**: Check Node.js/npm and Vite are installed, ensure backend is running.
* **Model**: Validate dataset balance, scaler compatibility.
