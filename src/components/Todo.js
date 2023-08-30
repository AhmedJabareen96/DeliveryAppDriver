import Gmaps from "./GMaps/GMaps"
import Gmapslauncher from "./GMaps/GMapsLauncher" 

import React, { useEffect, useState }  from "react";
import axios from 'axios';



export default function Todo(props) {
 // console.log("props.name:" + props.name);
  const [newName, setNewName] = useState(props.name);
 // console.log("newName:" + newName);
//  console.log("props.completed:" + props.completed);

   


  const [delivires, setDelivireis] = useState([]);
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await axios.get('http://localhost:5000/deliveryitem/');
        setDelivireis(response.data); 
       //console.log(  response.data)      
        //props= delivires 
    
      } catch (error) {      
        console.log('Error fetching data from the API:', error);
      }
    };
  
    fetchData();    
  }, []); 
         
   
  //console.log(delivires[0].items) 
  const array = delivires[0].items.split('#') 
  //console.log(array)
   
     const jsonArray = []
  
 //  let usr = localStorage.getItem("username")  
 //  console.log( "this isssssssssssssss " + usr)    
  
  for (let i = 0; i < array.length && usr; i++) {
    const currentString = array[i];
    //console.log("this is that : " + currentString);
    let temp = currentString.split(',')
    // console.log( temp) 
    // console.log(temp[0])
    // console.log(temp[1]) 
    // console.log(temp[2]) 
    // console.log(temp[3])
    // console.log(temp[4])
    // console.log(temp[5])
    // console.log(temp[6])
    
  //console.log(temp.length)    
  
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
  //  if(temp.length ==7) console.log(jsonObject)
    if(temp.length ==7 && usr==temp[1] ) jsonArray.push(jsonObject);      
       
  } 
  
  console.log(jsonArray)



// for(const order of array ){

//  console.log(order)

//  const temp = order.split(",")
//  console.log(temp)
//   const jsonObject = { 
//     userId: temp[0],
//     deliverId: temp[1],
//     itemid: temp[2], 
//     quantity : temp[3],
//     storeId : temp[4],
//     lat : temp[5] ,
//     lng : temp[6], 
//   };  
    
  
// }
 

//here split and show data 
//const array 


  function handleChange(e) {
    setNewName(e.target.value);
  }




  function handleSubmit(e) {
   // console.log("handling submit");
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const [isEditing, setEditing] = useState(false);
  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#444',
  };

  const submitButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '14px',
    backgroundColor: '#5f9ea0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };
  const cinputStyle = {
    padding: '15px',
    fontSize: '18px',
    color: '#fff',
    background: 'linear-gradient(135deg, #ff6b6b, #c44569)',
    border: 'none',
    borderRadius: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    outline: 'none',
    width: '300px',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group" style={labelStyle}>
        <label style = {labelStyle} className="todo-label" htmlFor={props.id}></label>
        <input
        style = {inputStyle}
          id={props.id}
          className="todo-text todoinput"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group" style={labelStyle}>
        <button
          type="button"
          className="btn todo-cancel"
          style={submitButtonStyle}
          onClick={() => {
            setNewName(props.name);
            setEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit"
          style={submitButtonStyle}
          onClick={() => {
            props.editTask(props.id, newName);
            setEditing(false);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo stack-small">
      <div className="c-cb" style={labelStyle} >   
        <input
          id={props.id} 
          type="checkbox"
          className="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name }
        </label>
      </div>



      <div className="btn-group" style={labelStyle}>
        
        <button
          type="button"
          className="btn"
          style={submitButtonStyle}
          onClick={() => {
            alert("go to map here");
            //here to enter the code to call gmaps 
//this one do not delete to find to open google maps and find route 
  window.open("https://maps.google.com?q="+"28.430348957506485"+","+"76.98648305807664" );
//window.open("http://maps.googleapis.com/maps/api/distancematrix/json?origins=54.406505,18.67708&destinations=54.446251,18.570993&mode=driving&language=en-EN&sensor=false")
//window.open("https://maps.googleapis.com/maps/api/distancematrix/json?destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=AIzaSyBGbKsSSNn0N9UJQiec9ldowf05Rd013_k")

//


// let Distance=acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371

     
            
            



          }}
        >
          Open Map 
        </button>
        {/* <button
          type="button"
          className="btn btn__danger"
          style={submitButtonStyle}
          onClick={() => {
            props.deleteTask(props.id);
          }}
        >
          Delete
        </button> */}
      </div>
    </div>
  );

  return isEditing ? editingTemplate : viewTemplate;
}
