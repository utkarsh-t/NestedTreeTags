import React, { useState } from 'react';
import './TreeNode.css'; // Import the CSS for TreeNode styling

const TreeNode = ({ node, addChild, removeChild,addData, level  }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(node.name);
  const [data, setData] = useState(node.data || '');
    var firstTimeChildData=true;
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleEdit = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      node.name = nodeName;
    }
  };

  // Handle data input change
  const handleDataChange = (e) => {
    
   
    setData(e.target.value);
  };

  // Generate full name based on parent hierarchy
  const fullName = nodeName;
  const children = node?.children || [];
  const nodeData=node?.data||''
//   console.log(node.children.length);
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
          <span>
            {nodeData==""?(<input 
              type="text" 
              value={data}
              hidden={children.length >0} 
              onChange={handleDataChange} 
              placeholder="Enter data"
            />):(<p></p>)}
          </span>
        </div>
        <div className="button-group">
          {data === '' ? (
            <button 
              className="add-child-btn" 
              onClick={() => {addChild(node.name)}}
            >
              Add Child
            </button>
          ) : nodeData=="" ?(
            
            <button 
                
              className="add-data-btn" 
              onClick={() => {node.data=data;addData(node.name,data)}}
            >
              Add Data
            </button>
          ):(<p></p>)}
          <button 
            className="remove-child-btn" 
            onClick={() => removeChild(node.name)}
          >
            Remove Child
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="children">
          {/* Show data if node has data and no children */}
          {data && !node.children?.length && (
            <div className="node-data">
              <span>Data: <input 
              type="text" 
              value={data}
              hidden={children.length >0} 
              onChange={handleDataChange} 
              placeholder="Enter data"
            />
                <p></p>
              <button 
                
                className="add-data-btn" 
                onClick={() => addData(node.name,data)}
              >
                Add Data
              </button>
            
              </span>
            </div>
          )}
          {node.children && node.children.map((child, index) => (
            <TreeNode 
              key={index} 
              node={child} 
              addChild={addChild} 
              removeChild={removeChild} 
              addData={addData}
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
