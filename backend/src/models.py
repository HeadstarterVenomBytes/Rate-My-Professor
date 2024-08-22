from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from enum import StrEnum


class YesNo(StrEnum):
    YES = "yes"
    NO = "no"


class Attendance(StrEnum):
    MANDATORY = "Mandatory"
    NOT_MANDATORY = "Not Mandatory"


class Grade(StrEnum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    F = "F"
    NOT_SURE_YET = "Not sure yet"

class ProfessorReview(BaseModel):
    quality: int
    difficulty: int
    course: str
    date: datetime
    review: str
    helfpulVotes: int
    unhelpfulVotes: int
    textbook: Optional[YesNo] = None
    forCredit: Optional[YesNo] = None
    attendence: Optional[Attendance]  = None
    grade: Optional[Grade] = None
    wouldTakeAgain: Optional[YesNo] = None
    tags: list[str] | None = []

class Professor(BaseModel):
    name: str
    department: str
    university: str
    averageRating: float
    numRatings: int
    tags: list[str]
    reviews: list[ProfessorReview]
    