# predict_symptoms.py

import sys
import json
import joblib
import os
from symptom_module import predict_conditions as rule_based_predict

# Load ML model
current_dir = os.path.dirname(__file__)
clf = joblib.load(os.path.join(current_dir, "model.joblib"))
mlb = joblib.load(os.path.join(current_dir, "mlb.joblib"))


def predict_ml(symptoms):
    try:
        X = mlb.transform([symptoms])
        prediction = clf.predict(X)[0]
        return prediction
    except Exception:
        return None


def main():
    raw_input = sys.stdin.read()
    data = json.loads(raw_input)
    symptoms = data.get("symptoms", [])
    age = data.get("age", 30)
    duration_days = data.get("duration_days", 1)

    # 1️⃣ Try ML prediction
    ml_pred = predict_ml(symptoms)

    # 2️⃣ If ML cannot predict, fallback to rule-based
    if not ml_pred or ml_pred == "Unknown":
        result = rule_based_predict(
            " ".join(symptoms), age=age, duration_days=duration_days
        )
        output = {"method": "rule_based", "result": result}
    else:
        output = {"method": "ml_model", "predicted_condition": ml_pred}

    print(json.dumps(output))


if __name__ == "__main__":
    main()
