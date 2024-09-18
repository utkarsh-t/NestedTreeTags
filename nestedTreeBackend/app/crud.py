from sqlalchemy.orm import Session
from . import models, schemas

def get_tree(db: Session):
    return db.query(models.Tree).filter(models.Tree.parent_id == None).all()

def replace_tree(db: Session, tree: schemas.TreeCreate):
    # Clear existing records
    db.query(models.Tree).delete()

    # Create the root node
    db_tree = models.Tree(name=tree.name, data=tree.data, parent_id=None)
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)

    # Convert Pydantic model to dictionary
    tree_dict = tree.dict()

    def add_children(parent_id, children):
        if children is None:
            children = []
        for child in children:
            db_child = models.Tree(name=child['name'], data=child.get('data'), parent_id=parent_id)
            db.add(db_child)
            db.commit()
            db.refresh(db_child)
            add_children(db_child.id, child.get('children', []))

    add_children(db_tree.id, tree_dict.get('children', []))
    return db_tree