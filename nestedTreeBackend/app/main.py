from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import crud, schemas,models
from .database import SessionLocal, engine, get_db
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Get the single tree
@app.get("/api/tree", response_model=schemas.Tree)
def get_tree(db: Session = Depends(get_db)):
    trees = crud.get_tree(db)
    if not trees:
        raise HTTPException(status_code=404, detail="Tree not found")
    return trees[0]  # Only one tree expected

# Replace the single tree
@app.post("/api/tree", response_model=schemas.Tree)
def replace_tree(tree: schemas.TreeCreate, db: Session = Depends(get_db)):
    return crud.replace_tree(db, tree)
