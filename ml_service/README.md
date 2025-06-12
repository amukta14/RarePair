# RarePair ML Microservice

This is a FastAPI-based microservice for organ allocation and survival prediction.

## Endpoints

- `POST /predict` — Accepts donor and recipient data, returns a mock survival score and allocation decision.

## Running Locally

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Example Request

```json
{
  "donor": {
    "id": "d1",
    "blood_type": "Bombay",
    "age": 32,
    "location": "Mumbai",
    "genetic_markers": ["A1", "B2"]
  },
  "recipient": {
    "id": "r1",
    "blood_type": "Bombay",
    "age": 28,
    "urgency": "high",
    "location": "Mumbai",
    "genetic_markers": ["A1", "B2"]
  }
}
```

## Example Response

```json
{
  "survival_score": 1.0,
  "allocation_decision": "approved",
  "explanation": "High compatibility"
}
``` 