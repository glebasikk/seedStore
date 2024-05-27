import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';


import { Routes, Route, BrowserRouter as Router } from "react-router-dom";



import AddForm from "./components/AddForm/AddForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AdminSignIn from './components/AdminSignIn/AdminSignIn';
import ChangePassword from './components/AdminSignIn/ChangePassword';
import FilesPage from './components/FilesPage/FilesPage';
import MainPage from "./components/MainPage/MainPage.jsx";
import './App.css';





const App=(props)=> {
  const [state, setState] = useState("");

  const defaulVal=[]
  const [filteredSeeds, setFilter] = useState(defaulVal);


  /*
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  
  useEffect(() => {
    callBackendAPI()
    console.log(filteredSeeds)
   
    .then(res => setState(res.express))
    .catch(err => console.log(err));
    
  }, [])
  const callBackendAPI = async () => {
    const response = await fetch('http://localhost:3000/main').then((response)=>response.json()).then()

    setFilter(response)
    console.log(response)
  };

  useEffect(() => {
    fetch("/main", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFilter(data);
        console.log(filteredSeeds);
      })
      .catch((error) => console.log(error));
  }, []);
  */
  
  const [images, setImages] = useState("")
  const [img, setImg] = useState("")
  
  useEffect(() => {
    const res=fetch('/downloadpicture', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: "1713438902906-1303507287_Tomato.png",
      })
    }).then(res => setImg(res))
    .catch(error =>{
      console.log(error)
    })
    /*
    .then(fetch('/downloadpicture', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: images,
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      //if(data.length!==0){
      //  setImg(data[0])
      //}
    })
    .catch(error =>{
      console.log(error)
    })
    )
    */
  }, []);


  return (
    
    <Router>
      <div className='wrapper'>
          <Routes>
            <Route path="/" element={<MainPage list={props.state.list}/>} />
            <Route path="/add/:id" element={<AddForm />} />
            <Route path="/secret-admin-link" element={<AdminSignIn />} />
            <Route path="/secret-files-link" element={<FilesPage />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Routes>
          
        </div>
      
    </Router>
  );
}



export default App;