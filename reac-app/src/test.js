import React, { useState } from 'react';
import './TreeNode.css'; // Import the CSS for TreeNode styling

const TreeNode = ({ node, addChild, removeChild, level, parentName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(node.name);
  const [nodeData, setNodeData] = useState(node.data || '');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleEdit = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      node.name = nodeName;
    }
  };

  const handleDataChange = (e) => {
    setNodeData(e.target.value);
    if (e.target.value.trim() === '') {
      // Show 'Add Child' button if data is cleared
      setIsEditing(false);
    }
  };

  const handleAddChild = () => {
    if (nodeData.trim() === '') {
      addChild(node.name);
    }
  };

  const handleAddData = () => {
    if (nodeData.trim() !== '') {
      // Logic to update or save data
      node.data = nodeData;
      setIsEditing(false);
    }
  };

  const fullName = nodeName;

  return (
    <div className={`tree-node level-${level}`}>
      <div className="node-header">
        <div className="node-content">
          <button className="collapse-btn" onClick={toggleCollapse}>
            {isCollapsed ? '>' : 'v'}
          </button>
          {isEditing ? (
            <input
              className="edit-input"
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              onKeyDown={handleEdit}
            />
          ) : (
            <span className="node-name" onClick={() => setIsEditing(true)}>
              {fullName}
            </span>
          )}
          <span>: 
            <input
              type="text"
              value={nodeData}
              onChange={handleDataChange}
            />
          </span>
        </div>
        <div className="button-group">
          {nodeData.trim() === '' && (
            <button className="add-child-btn" onClick={handleAddChild}>
              Add Child
            </button>
          )}
          {nodeData.trim() !== '' && (
            <button className="add-data-btn" onClick={handleAddData}>
              Add Data
            </button>
          )}
          {nodeData.trim() !== '' && (
            <button className="remove-child-btn" onClick={() => removeChild(node.name)}>
              Remove Child
            </button>
          )}
        </div>
      </div>

      {!isCollapsed && node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <TreeNode 
              key={index} 
              node={child} 
              addChild={addChild} 
              removeChild={removeChild} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
