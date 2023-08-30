import React from 'react';


const containerStyle = {
  width: '100%',
  height: '100vh', // Set the container to take the full height of the viewport
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f0f0f0',
  padding: '20px',
  boxSizing: 'border-box',
};

const appStyle = {
  width: '100%', // Set the app to take the full width of the container
  height: '100%', // Set the app to take the full height of the container
  padding: '20px',
  background: '#f1f0f1', // Background color for the entire app

  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  boxSizing: 'border-box',
  overflowY: 'auto', // Add vertical scrolling if the content overflows
};



const headerStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  borderRadius: '8px 8px 0 0', // Rounded top corners
};

const taskTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const taskRowStyle = {
  borderBottom: '1px solid #ccc',
};

const taskHeaderCellStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const taskCellStyle = {
  padding: '10px',
};

const doneButtonStyle = {
  backgroundColor: '#61bd4f',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 15px',
  width: '100px', // Fixed width for both buttons
  cursor: 'pointer',
};

const paragraphStyle = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '1.5',
  textAlign: 'left',
  margin: '10px 0',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'normal',
  // Add more CSS properties as needed
};

const doneButtonStyleHover = {
  backgroundColor: '#3b8b3b', // Slightly darker green on hover
};

const openMapButtonStyle = {
  backgroundColor: '#fca311',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 15px',
  width: '100px', // Fixed width for both buttons
  cursor: 'pointer',
  marginRight: '10px', // Keep a consistent margin between buttons
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};
function numberToColor(number) {
  // Set a fixed saturation and lightness value
  const saturation = 50;
  const lightness = 50;

  // Calculate hue based on the number, so each number gets a distinct color
  const hue = (number * 137.508) % 360;

  // Convert HSL color to CSS color representation
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


function TaskList({ initialData, handleTaskDone, handleDoneButtonHover }) {
  // Rest of the TaskList component code
  if(!localStorage.getItem("username")) return <div>


    <p style={headerStyle}> You are not authrized, please login first !</p>
  </div>
  return (
    <>
      <h1 style={headerStyle}>Driver pick up list</h1>
 <table style={taskTableStyle}>
        <thead>
          <tr style={taskRowStyle}>
          <th style={taskHeaderCellStyle}>Actions</th>
            <th style={taskHeaderCellStyle}>User ID</th>
            <th style={taskHeaderCellStyle}>Deliver ID</th>
            <th style={taskHeaderCellStyle}>Name</th>
            <th style={taskHeaderCellStyle}>Quantity</th>
            <th style={taskHeaderCellStyle}>Store ID</th>
            <th style={taskHeaderCellStyle}>Latitude</th>
            <th style={taskHeaderCellStyle}>Longitude</th>
   
          </tr>
        </thead>
        <tbody>
          {initialData.map((task, index) => (
            <tr key={index} style={taskRowStyle}>
                          <td style={taskCellStyle}>
                <button
                  style={{ ...openMapButtonStyle, marginRight: '5px' }}
                  onClick={() => {
                   // alert('map ' + task.lat + ' ' + task.lng);
                    window.open(
                      'https://maps.google.com?q=' + task.lat + '+' + task.lng
                    );
                  }}
                >
                  Open map
                </button>
                <button
                  style={doneButtonStyle}
                  onClick={() => handleTaskDone(index)}
                  onMouseOver={() => handleDoneButtonHover(index, true)}
                  onMouseOut={() => handleDoneButtonHover(index, false)}
                >
                  Done
                </button>
              </td>
              <td style={task.quantity == 0 ? { ...taskCellStyle, backgroundColor: 'red' } : { ...taskCellStyle, backgroundColor: numberToColor((task.lat)*70)}}><p style={paragraphStyle}>{task.userId}</p></td>
              <td style={task.quantity == 0 ? { ...taskCellStyle, backgroundColor: 'red' } : taskCellStyle}><p style={paragraphStyle}>{task.deliverId == localStorage.getItem("username") ? task.deliverId : ''}</p></td>
              <td style={task.quantity == 0 ? { ...taskCellStyle, backgroundColor: 'red' } : taskCellStyle}><p style={paragraphStyle}>{task.name}</p></td>
              <td style={task.quantity == 0 ? { ...taskCellStyle, backgroundColor: 'red' } : taskCellStyle}>
  <p style={paragraphStyle}>{task.quantity}</p>
</td>
              <td style={taskCellStyle}><p style={paragraphStyle}>{task.storeId}</p></td>
              <td style={taskCellStyle}><p style={paragraphStyle}>{task.lat}</p></td>
              <td style={taskCellStyle}><p style={paragraphStyle}>{task.lng}</p></td>
  
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;

