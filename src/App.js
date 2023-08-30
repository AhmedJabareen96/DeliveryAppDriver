import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Login from './components/login/Login';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './Tasklist'; // Import the TaskList component
import {UserContext} from "./UserContext";
import Register from "./components/request-form/Register";
import ForgotYourPassword from "./components/forgot-password/ForgotYourPassword";
import PostRegister from "./components/post-register/PostRegister";


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

function App() {
  const [initialData, setInitialData] = useState([]);
  const [tempData, setTempData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
   axios.get('http://localhost:5000/deliveryitem/') 
   .then( res => {

    setTempData(res.data[0].items)
    setTemp(res)
    let usr = localStorage.getItem("username") 




    console.log(res.data[0].items)
    const array = res.data[0].items.split('#') 
    const jsonArray = []
    let flag = 0;
    for (let i = 0; i < array.length && usr; i++) { 
      const currentString = array[i]; 
      let temp = currentString.split(',')
      console.log(temp) 
        const jsonObject = { 
        userId: temp[0], 
        deliverId: temp[1],        
        name: temp[2],    
        quantity : temp[3],  
        storeId : temp[4],      
        lat : temp[5] ,  
        lng : temp[6],      
        completed : false, 
        id : i         
      };

      console.log("User Name: " );  
      console.log( usr );   
      console.log("temp[1]: " );
      console.log( temp[1] );     
      if(temp.length ===7  && temp[1] == usr)  jsonArray.push(jsonObject);
      if(temp.length ===7 && temp[2] == usr && temp[2] == "Client" && !flag)  {jsonArray.push(jsonObject); flag++;} 
    }   
    console.log(jsonArray) 
    setInitialData(jsonArray)
   } 
   );
  }, []);   

  const handleDoneButtonHover = (index, isHovering) => {
    setInitialData((prevData) => {
      const updatedData = [...prevData]; 
      updatedData[index].isHovering = isHovering;
      return updatedData;
    });
  };
  const handleTaskDone = (index) => {
    setInitialData((prevData) => {
      const updatedData = [...prevData];
      const T = updatedData[index];
      let string = T.userId + "," + T.deliverId + "," + T.name + "," + T.quantity + "," + T.storeId + "," + T.lat + "," + T.lng + "#";
      console.log(string);
      const newTempData = tempData.replace(string, ''); // Create a new string with the updated items


      // Update the state with the newTempData
      setTempData(newTempData);
      // Update the items field in temp.data
      temp.data[0].items = newTempData;
      console.log("doneeeeeeeeeeeeeee");
      axios
      .put('http://localhost:5000/deliveryitem/64bc0a16ab25bef73c2fe3c7', {
        items: temp.data[0].items
      })
      .then((res) => {
        console.log(tempData);
      })
      .catch((e) => {
        console.log("error" + e);
      });

      updatedData.splice(index, 1);
      return updatedData;
    });
  };
  
  return (
    <UserContext.Provider value={{username, setUsername}}>
      {console.log(localStorage.getItem("username"))}
    <div style={containerStyle}>
    <div style={appStyle}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-paswword" element={<ForgotYourPassword />} />
          <Route path="/post-register" element={<PostRegister />} />
          <Route path="/" element={<TaskList initialData={initialData} handleTaskDone={handleTaskDone} handleDoneButtonHover={handleDoneButtonHover} />} />
          {/* Add more routes for other components/pages */}
        </Routes>
      </Router>
    </div>
  </div>
    </UserContext.Provider>
  );
}




export default App;
