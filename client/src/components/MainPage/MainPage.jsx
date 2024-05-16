import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './MainPage.css';
import CardList from "./CardList/CardList.jsx";
import Carousel from "./Carousel/Carousel.jsx";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";
import Footer from "../Footer/Footer.jsx";
import add from "./add.svg"; // Svg Icon
import styled from "styled-components";

import { useAlert } from 'react-alert'

import Pagination  from '@mui/material/Pagination';

const MainPage = (props) => {
   const alert = useAlert()
    const [search, setSearch] = useState(props.list);
    const defaultVal = {
      count: 1,
      rows: [{ id: 1, name: " ", info: " ", price: 0 }],
    };
  
    const [seeds, setSeeds] = useState(defaultVal);
    const [page, setPage] = useState(1)
  
    const [name,setName]=useState("")
    const [category,setCategory]=useState([])
  
    const handleChangePagination=(event,value)=>{
      setPage(value)
    }

    const fetchProducts = async (page) => {
      let body={}
      if(name!=="" && category.length>0)  {
        body= {
          name: name,
          category:category,
        }
      }
      else if(name==="" && category.length>0){
        body= {
          category:category,
        }
      }
      else if(name!=="" && category.length<1){
        body= {
          name: name,
        }
      }
      const request = await fetch("/allSeedSort?page="+page, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      })
      let result=await request.json()
      setSeeds(result)
      //setPage(1)
    }
    let searchData=(searchName)=>{ 
      setName(searchName)
    }
    let searchCategories=(categories)=>{
      setCategory(categories)
    }
    useEffect(() => {
      fetchProducts(page);
    }, [page,name,category]);
      
  function uploadImage(event) {
    var reader = new FileReader();
    var name = event.target.files[0].name;
    reader.addEventListener("load", function () {
      if (this.result && localStorage) {
        window.localStorage.setItem(name, this.result);
      } else {
        alert();
      }
    });
    reader.readAsDataURL(event.target.files[0]);
   window.location.reload()
  }

  function getImages() {
    let arr = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      let res = window.localStorage.getItem(window.localStorage.key(i));
      var image = new Image();
      image.src = res;
      arr.push(image.src);
    }
    return arr;
  }
  let images = getImages();

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);

  const handleClickPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setXPosition(xPosition + width);
  };
  const handleClicknext = () => {
    if (index === images.length - 1) {
      setIndex(0);
      setXPosition(0);
    } else {
      setIndex(index + 1);
      setXPosition(xPosition - width);
    }
  };
  /*
        useEffect(() => {
          const handleAutoplay = setInterval(handleClicknext, 3000);
          return () => clearInterval(handleAutoplay);
        }, [handleClicknext]);
  */

  let Input;

  let isAdmin = sessionStorage.getItem("token");
  if (isAdmin) {
    Input = styled.div`
      display: block;
    `;
  } else {
    Input = styled.div`
      display: none;
    `;
  }

  const [growType, setGrowType] = useState([""]);
  const [type, setType] = useState([""]);
  const [provider, setProvider] = useState([""]);

  const getApiData = async () => {
    const response = await fetch(
      "/listofcategories"
    ).then((response) => response.json());

  setGrowType(response.status.filter(x=>x.categoryType==="growType"));
  setType(response.status.filter(x=>x.categoryType==="seedType"));
  setProvider(response.status.filter(x=>x.categoryType==="provider"));
  };
  useEffect(() => {
    getApiData();
  }, []);

let [cartItems, setCartItems]=useState([])

let addCart=(id,price, name, amount)=>{
    if(cartItems.find(x=>x.name===name)){
      alert.success("Товар уже есть в корзине")
    }
    else{
    setCartItems((cartItems)=>[...cartItems, {id:id,name:name, price:price, amount:amount, totalPrice:price*amount} ])
    }
} 
let deleteCart=(id)=>{
  const newCart = cartItems.filter(item => item.id !== id);
  setCartItems(newCart);
} 
let incrementAmount=(id)=>{
  setCartItems(cartItems.map(el => el.id === id ? {...el, amount: ++el.amount} : el));
}
let decrementAmount=(id, amount)=>{
  if(amount!==1){
    setCartItems(cartItems.map(el => el.id === id ? {...el, amount: --el.amount} : el))
  }
}


  return (
    <div className="container">
     <Header searchData={searchData} cart={cartItems} deleteCart={deleteCart} incrementAmount={incrementAmount} decrementAmount={decrementAmount}/>
      <div className="flex">
      
        <SideBar growType={growType} type={type} provider={provider} searchCategories={searchCategories} />
        <Carousel
          images={images}
          setWidth={setWidth}
          xPosition={xPosition}
          isAdmin={isAdmin}
          handleClickPrev={handleClickPrev}
          handleClicknext={handleClicknext}
          uploadImage={uploadImage}
        />
      </div>

      <Input>
        <div className="add-pic-background">
          <label className="add-pic">
            <input
              type="file"
              id="myFile"
              style={{ display: "none" }}
              size="50"
              onChange={(e) => uploadImage(e)}
            />
            <img src={add} style={{ height: 50, width: 33 }}></img>
            <p>Добавить новое изображение</p>
          </label>
        </div>
      </Input>

      <CardList isAdmin={isAdmin} page={page} seeds={seeds} handleChangePagination={handleChangePagination} addCart={addCart}/>
      
      <Footer/>
    </div>
  );
};

export default MainPage;


