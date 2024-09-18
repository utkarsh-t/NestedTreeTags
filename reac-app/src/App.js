import React, { useEffect, useState } from 'react';
import TreeNode from './TreeNode';
import axios from 'axios';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

function App() {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    // Fetch the tree from the backend on initial load
    axios
      .get('http://localhost:8080/api/tree')
      .then((response) => {
        setTree(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tree:', error);
        // Set default tree if there is an error
        setTree(initialTree);
      });
  }, []);

  const addData = (nodeName, data) => {
    const newTree = { ...tree };
  
    const addDataRecursive = (node) => {
      if (node.name === nodeName) {
        node.data = data;
      } else if (node.children) {
        node.children.forEach(addDataRecursive);
      }
    };
  
    addDataRecursive(newTree);
    setTree(newTree);
  
    // Save updated tree to backend
    axios.post('http://localhost:8080/api/tree', newTree).catch((error) => {
      console.error('Error saving tree:', error);
    });
  };
  
  // Function to add a child to the parent node
  const addChild = (parentName) => {
    console.log(parentName)
    const newTree = { ...tree };
  
    const addChildRecursive = (node) => {
      if (node.name === parentName) {
        if (!node.children) {
          node.children = [];
        }

        const childName = `${parentName}-child${node.children.length + 1}`;

        // Check if the child already exists
        if (!node.children.some(child => child.name === childName)) {
          node.children.push({ name: childName, data: '' });
        }
        return true; // Stop further recursion after adding child
      } else if (node.children) {
        // Continue recursion for child nodes
        return node.children.some(addChildRecursive);
      }
      return false;
    };
  
    addChildRecursive(newTree);
    setTree(newTree);
  
    // Save updated tree to backend
    axios.post('http://localhost:8080/api/tree', newTree).catch((error) => {
      console.error('Error saving tree:', error);
    });
  };
  const removeChild = (childName) => {
    const newTree = { ...tree };
  
    const removeChildRecursive = (node) => {
      if (node.children) {
        const indexToRemove = node.children.findIndex(child => child.name === childName);
        
        if (indexToRemove !== -1) {
          // Remove child from children array
          node.children.splice(indexToRemove, 1);
          return true; // To stop further recursion
        }
        
        // Continue recursion
        return node.children.some(removeChildRecursive);
      }
      return false;
    };
  
    removeChildRecursive(newTree);
    setTree(newTree);
  
    // Save updated tree to backend
    axios.post('http://localhost:8080/api/tree', newTree).catch((error) => {
      console.error('Error saving tree:', error);
    });
  };
  
  return (
    <div className="app-container">
      <h1>Nested Tags Tree</h1>
      {tree ? (
        <TreeNode node={tree} addChild={addChild} removeChild={removeChild} addData={addData} level={0} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
