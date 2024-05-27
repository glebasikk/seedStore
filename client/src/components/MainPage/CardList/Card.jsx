import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Card.css';
import { ReactComponent as Edit } from "./edit.svg";
import { ReactComponent as Delete } from "./delete.svg";


const Card = (props) => {
  
  const [images, setImages] = useState("")
  const [img, setImg] = useState("")
  const [page,setPage]=useState(props.page)

  const getPics=async() => {
    const request= await fetch('/seedpictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seedId: props.id,
      })
    })
    let content = await request.json();
    content=content.map(x=>x.picture)
    
    const res= await fetch('/downloadpicture', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: content[0],
      })
    })
    .then(res => res.blob())
    .then(data=>{setImg(URL.createObjectURL(data))})
    .catch(error =>{
      console.log(error)
    })   
  } 
  useEffect(() => {
    getPics();
  }, [props.id]);
 

let link="/add/:"+props.id
  return (
    <div className="card">
      <img src={img} className="card-img"></img>
      <div className="card-name"><b>{props.name}</b>{props.isAdmin &&<div className="edit-buttons"><a><NavLink to={link} className="add-new"><Edit className="edit-button" /></NavLink></a><a onClick={function(){props.handleDelete(props.id)}}><Delete className="edit-button" /></a></div>}</div>
      <div className="card-provider">{props.provider}</div>
      <hr className="card-hr"/>
      <div className="card-desc">{props.info}</div>
      <hr className="card-hr" style={{ margin: "0px 0px 20px 0px"}} />
      <div className="price-section">
      
      <button  className="button card-button" onClick={function () {props.openModal(props.id, img)}}>Подробнее</button>

      <div className="card-name"><b>{props.price}р.</b><p className="price">/упаковка</p></div>
      </div>
    </div>
  );
};

export default Card;