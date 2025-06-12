from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Root route
@app.get("/")
def read_root():
    return {"message": "ML Service is running"}

class Donor(BaseModel):
    id: str
    blood_type: str
    age: int
    location: str
    genetic_markers: Optional[List[str]] = None

class Recipient(BaseModel):
    id: str
    blood_type: str
    age: int
    urgency: str
    location: str
    genetic_markers: Optional[List[str]] = None

class PredictionRequest(BaseModel):
    donor: Donor
    recipient: Recipient

class PredictionResponse(BaseModel):
    survival_score: float
    allocation_decision: str
    explanation: str

@app.post("/predict", response_model=PredictionResponse)
def predict_match(data: PredictionRequest = Body(...)):
    # Mock logic: higher survival if blood types match and urgency is high
    score = 0.5
    if data.donor.blood_type == data.recipient.blood_type:
        score += 0.3
    if data.recipient.urgency == "high":
        score += 0.15
    if data.donor.age < 40 and data.recipient.age < 40:
        score += 0.05
    allocation = "approved" if score > 0.7 else "waitlist"
    explanation = "High compatibility" if allocation == "approved" else "Needs review"
    return PredictionResponse(
        survival_score=round(score, 2),
        allocation_decision=allocation,
        explanation=explanation
    )
