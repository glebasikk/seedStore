import React, { Component, useEffect, useState } from "react";
import Slider from "./Slider";
import "./MainPage.css";
import CardList from "./CardList/CardList.jsx";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";
import Footer from "../Footer/Footer.jsx";
import styled from "styled-components";
import CartButton from "./CartButton";

import { useAlert } from "react-alert";

const MainPage = (props) => {
  const alert = useAlert();
  const [search, setSearch] = useState(props.list);
  const defaultVal = {
    count: 1,
    rows: [{ id: 1, name: " ", info: " ", price: 0 }],
  };

  const [seeds, setSeeds] = useState(defaultVal);
  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const fetchProducts = async (page) => {
    let body = {};
    if (name !== "" && category.length > 0) {
      body = {
        name: name,
        category: category,
      };
    } else if (name === "" && category.length > 0) {
      body = {
        category: category,
      };
    } else if (name !== "" && category.length < 1) {
      body = {
        name: name,
      };
    }
    const request = await fetch("/allSeedSort?page=" + page, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    let result = await request.json();
    setSeeds(result);
  };
  let searchData = (searchName) => {
    setName(searchName);
    setPage(1);
  };
  let searchCategories = (categories) => {
    setCategory(categories);
    setPage(1);
  };

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
    window.location.reload();
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
    const response = await fetch("/listofcategories").then((response) =>
      response.json()
    );

    setGrowType(response.status.filter((x) => x.categoryType === "growType"));
    setType(response.status.filter((x) => x.categoryType === "seedType"));
    setProvider(response.status.filter((x) => x.categoryType === "provider"));
  };
  useEffect(() => {
    getApiData();
  }, []);

  let [cartItems, setCartItems] = useState([]);

  let addCart = (id, price, name, amount) => {
    if (cartItems.find((x) => x.name === name)) {
      alert.error("Товар уже есть в корзине");
    } else {
      alert.success("Товар добавлен");
      setCartItems((cartItems) => [
        ...cartItems,
        {
          id: id,
          name: name,
          price: price,
          amount: amount,
          totalPrice: price * amount,
        },
      ]);
      let cartObject=(cartItems) => [
        ...cartItems,
        {
          id: id,
          name: name,
          price: price,
          amount: amount,
          totalPrice: price * amount,
        },
      ]
      sessionStorage.setItem("cart", cartObject);
    }
  };
  let deleteCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    sessionStorage.setItem("cart", newCart);
  };
  let incrementAmount = (id) => {
    setCartItems(
      cartItems.map((el) =>
        el.id === id ? { ...el, amount: ++el.amount } : el
      )
    );
    sessionStorage.setItem(
      "cart",
      cartItems.map((el) =>
        el.id === id ? { ...el, amount: ++el.amount } : el
      )
    );
  };
  let decrementAmount = (id, amount) => {
    if (amount !== 1) {
      setCartItems(
        cartItems.map((el) =>
          el.id === id ? { ...el, amount: --el.amount } : el
        )
      );
      sessionStorage.setItem(
        "cart",
        cartItems.map((el) =>
          el.id === id ? { ...el, amount: --el.amount } : el
        )
      );
    }
  };
  const [update, forceUpdate] = useState("");
  useEffect(() => {
    fetchProducts(page);
  }, [page, name, category, update]);

  let deleteSeed = async (id) => {
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
      forceUpdate(status);
    } else {
      alert.error("Ошибка удаления");
    }
    //window.location.reload();
  };

  return (
    <div className="app-container">
      <Header searchData={searchData} />
      <div className="flex">
        <SideBar
          growType={growType}
          type={type}
          provider={provider}
          searchCategories={searchCategories}
        />
        <Slider />
      </div>

      <CardList
        isAdmin={isAdmin}
        page={page}
        seeds={seeds}
        handleChangePagination={handleChangePagination}
        addCart={addCart}
        deleteSeed={deleteSeed}
      />
      <CartButton
        cart={cartItems}
        deleteCart={deleteCart}
        incrementAmount={incrementAmount}
        decrementAmount={decrementAmount}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
