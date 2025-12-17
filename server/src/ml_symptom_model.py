# ml_symptom_model.py

import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.naive_bayes import MultinomialNB
import joblib

# -------------------------
# Sample dataset
# -------------------------
# Each record: symptoms (list), age, duration_days -> condition
data = [
    (["fever", "cough"], 25, 2, "Flu"),
    (["fever", "headache"], 30, 1, "Flu"),
    (["cough", "sore_throat", "runny_nose"], 22, 3, "Common Cold"),
    (["headache"], 28, 1, "Migraine"),
    (["fatigue", "vomiting"], 40, 2, "Gastroenteritis"),
    (["chest_pain", "breathlessness"], 60, 1, "Heart Issue"),
]

# Separate features and labels
symptoms, ages, durations, labels = zip(*data)

# -------------------------
# Convert symptoms to binary features
# -------------------------
mlb = MultiLabelBinarizer()
X_symptoms = mlb.fit_transform(symptoms)

# Combine symptoms, age, duration
import numpy as np

X = np.hstack(
    [X_symptoms, np.array(ages).reshape(-1, 1), np.array(durations).reshape(-1, 1)]
)

# -------------------------
# Train classifier
# -------------------------
clf = MultinomialNB()
clf.fit(X, labels)

# -------------------------
# Save model and encoder
# -------------------------
joblib.dump(clf, "ml_model_symptoms.joblib")
joblib.dump(mlb, "mlb_encoder.joblib")

print("ML symptom model and encoder saved successfully!")
