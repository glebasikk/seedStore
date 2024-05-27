import React, { useEffect, useState } from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as CartIcon } from "./cart.svg";
import { FileCopy } from "@mui/icons-material";

import Cart from "../../Cart/Cart.jsx"

import Modal from "react-modal";

const Header = (props) => {
 
  let searchData = (el) => {
    props.searchData(el);
  };


  return (
    <div>
    <nav className="app-header">
      <div className="header-wrapper">
        <div className="logo">
          <Logo fill="white" className="svg-logo" />
          <p className="title">Title</p>
        </div>
        <div>
          <form>
            <input
              className="search"
              type="search"
              placeholder="Поиск..."
              onChange={(e) => searchData(e.target.value)}
            />
          </form>
        </div>
        <div>
          <NavLink to="secret-files-link" className="file-icon">
             <FileCopy sx={{ fontSize: 35, color: "white" }} />
            <p>Перечень товаров</p>
          </NavLink>
        </div>
        <div className="phone-icon">
          <p>+375(29)123-45-67</p>
          <p>+375(29)123-45-67</p>
        </div>
      </div>
    
      
    </nav>
    <div className="phone-icon-mobile">
          <p>+375(29)123-45-67</p>
          <p>+375(29)123-45-67</p>
        </div>
  
    </div>
    
  );
};

export default Header;
