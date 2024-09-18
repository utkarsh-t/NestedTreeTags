from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Tree(Base):
    __tablename__ = "tree"  # Singular table name

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    data = Column(String, nullable=True)
    parent_id = Column(Integer, ForeignKey('tree.id'), nullable=True)

    parent = relationship("Tree", remote_side=[id], backref="children")
