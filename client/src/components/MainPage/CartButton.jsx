import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";
import Cart from "../Cart/Cart.jsx";
import styled from "styled-components";
import { ReactComponent as CartIcon } from "./cart.svg";
import { useAlert } from "react-alert";
import Modal from "react-modal";

const CartButton = (props) => {
  let customStyles = {};
  if (window.innerWidth > 1220) {
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
  } else {
    customStyles = {
      overlay: {
        position: "fixed",
        zIndex: 1020,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setId] = useState(null);

  const openModal = (id) => {
    setModalIsOpen(true);
    setId(id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="fixed-cart">
      <div className="fixed-cart-content">
      <NavLink onClick={openModal} className="cart-icon">
        <CartIcon fill="#16642C" className="cart-svg" />
        <div className="cart-amount">{props.cart.length}</div>
      </NavLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Cart
          closeModal={closeModal}
          cart={props.cart}
          deleteCart={props.deleteCart}
          incrementAmount={props.incrementAmount}
          decrementAmount={props.decrementAmount}
        />
      </Modal>
      </div>
    </div>
  );
};

export default CartButton;
