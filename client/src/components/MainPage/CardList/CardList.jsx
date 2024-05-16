import { NavLink } from "react-router-dom";
import Card from "./Card.jsx";
import CardInfo from "./CardInfo.jsx";
import "./Card.css";
import styled from "styled-components";
import add from "./add.svg";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Pagination from "@mui/material/Pagination";
import { useAlert } from "react-alert";

const CardList = (props) => {
  let seeds = props.seeds;
  const alert = useAlert();
  let handleDelete = async (id) => {
    let req = await fetch("/delseed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let status = await req;
    if (status.status === 200) {
      alert.success("Товар удален");
    } else {
      alert.error("Ошибка удаления");
    }
    //window.location.reload();
  };
  let pagesCount = Math.ceil(seeds.count / 10);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setId] = useState(null);
  const [img, setImg] = useState("");

  const openModal = (id, img) => {
    setModalIsOpen(true);
    setId(id);
    setImg(img);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let AddCard;
  if (props.isAdmin) {
    AddCard = styled.div`
      width: 365px;
      background-color: #eff0ee;
      padding: 20px;
      margin-top: 30px;
      box-shadow: 0px 0px 10px 0px #7c7c7c;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #16642c;
      gap: 15px;
    `;
  } else {
    AddCard = styled.div`
      display: none;
    `;
  }

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
        padding: "20px",
      },
    };
  }

  return (
    <div>
      <div className="list">
        <AddCard>
          <img src={add} style={{ height: 200, width: 200 }} />
          <NavLink to="/add/:0" className="add-new">
            Добавить новый товар
          </NavLink>
        </AddCard>
        {seeds.rows.map((x) => (
          <Card
            id={x.id}
            img={x.img}
            info={x.info}
            provider={x.provider}
            price={x.price}
            name={x.name}
            openModal={openModal}
            page={props.page}
            isAdmin={props.isAdmin}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CardInfo
          closeModal={closeModal}
          page={props.page}
          img={img}
          product={seeds.rows.filter((x) => x.id === modalId)}
          addCart={props.addCart}
        />
      </Modal>
      <div className="pagination-buttons">
        <Pagination
          variant="outlined"
          size="large"
          onChange={(e, t) => {
            props.handleChangePagination(e, t);
          }}
          count={pagesCount}
          page={props.page}
        />
      </div>
    </div>
  );
};
export default CardList;
