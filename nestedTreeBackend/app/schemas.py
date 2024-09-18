from pydantic import BaseModel
from typing import List, Optional

class TreeBase(BaseModel):
    name: str
    data: Optional[str] = None

class TreeCreate(TreeBase):
    children: Optional[List["TreeCreate"]] = None

    class Config:
        orm_mode = True

class TreeUpdate(TreeBase):
    children: Optional[List["TreeUpdate"]] = None

class Tree(TreeBase):
    id: int
    children: List["Tree"] = []

    class Config:
        orm_mode = True
