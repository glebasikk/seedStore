import React, { useEffect, useState } from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as CartIcon } from "./cart.svg";
import { FileCopy } from "@mui/icons-material";

import Cart from "../../Cart/Cart.jsx"

import Modal from "react-modal";

const Header = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setId] = useState(null);

  const openModal = (id) => {
    setModalIsOpen(true);
    setId(id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let searchData = (el) => {
    props.searchData(el);
  };

  let customStyles={}
if(window.innerWidth > 1220){
  customStyles = {
    overlay: {
      position: "fixed",
      zIndex: 1020,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative",
      background: "white",
      width: "870px",
      height: "590px",
      inset: "auto",
      overflowY: "auto",
      borderRadius: "0.3rem",
      padding: "20px 50px",
      
    },
  };
}else{
  customStyles = {
    overlay: {
      position: "fixed",
      zIndex: 1020,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative",
      background: "white",
      width: "100%",
      height: "100%",
      inset: "auto",
      overflowY: "auto",
      borderRadius: "0.3rem",
      padding: "10px",
      
    },
  };
}
  return (
    <div>
    <nav className="header">
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
          <NavLink onClick={openModal} className="cart-icon">
            <CartIcon fill="white" className="cart-svg" />
            <p>Корзина</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="secret-files-link" className="cart-icon">
             <FileCopy sx={{ fontSize: 35, color: "white" }} />
            <p>Перечень товаров</p>
          </NavLink>
        </div>
        <div className="phone-icon">
          <p>+375(29)123-45-67</p>
          <p>+375(29)123-45-67</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
          <Cart closeModal={closeModal} cart={props.cart} deleteCart={props.deleteCart} incrementAmount={props.incrementAmount} decrementAmount={props.decrementAmount}/>
      </Modal>
      
    </nav>
    <div className="phone-icon-mobile">
          <p>+375(29)123-45-67</p>
          <p>+375(29)123-45-67</p>
        </div>
    </div>
  );
};

export default Header;
