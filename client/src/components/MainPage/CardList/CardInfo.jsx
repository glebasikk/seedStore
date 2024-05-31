import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16642C",
    },
  },
});

const CardInfo = (props) => {
  const [image, setImg] = useState([]);
  const product = props.product[0];
  const getPics = async () => {
    const request = await fetch("http://31.128.38.52:5000/seedpictures", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seedId: product.id,
      }),
    });
    let content = await request.json();
    content = content.map((x) => x.picture);
    let pictures = [];
    for (let i = 0; i < content.length; i++) {
      const res = await fetch("http://31.128.38.52:5000/downloadpicture", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: content[i],
        }),
      })
        .then((res) => res.blob())
        .then((data) => {
          pictures[i] = URL.createObjectURL(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setImg(pictures);
    }
  };

  let defaultVal = {
    name: "",
    desc: "",
    type: "",
    growType: "",
    provider: "",
    additionaiInfo: [{ [""]: "" }],
    categories: [""],
  };
  const [productInfo, setProduct] = useState(defaultVal);
  const [page, setPage] = useState(props.page);
  const fetchProduct = async () => {
    const request = await fetch("http://31.128.38.52:5000/seedallInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seedId: product.id,
      }),
    });
    let content = await request.json();
    if (content.categories !== null) {
      let growType = content.categories
        .filter((x) => x.categoryType === "growType")
        .map((x) => x.name)
        .join(", ");
      let obj1 = {
        categoryType: "growType",
        name: growType,
      };
      let seedType = content.categories
        .filter((x) => x.categoryType === "seedType")
        .map((x) => x.name)
        .join(", ");
      let obj2 = {
        categoryType: "seedType",
        name: seedType,
      };
      let provider = content.categories
        .filter((x) => x.categoryType === "provider")
        .map((x) => x.name)
        .join(", ");
      let obj3 = {
        categoryType: "provider",
        name: provider,
      };
      if (content.additionaiInfo === null) {
        content.additionaiInfo = [];
      }
      let cats = [obj1, obj2, obj3];
      cats.forEach((x) => {
        content.additionaiInfo.push({ title: x.categoryType, content: x.name });
      });
    }
    if (content.additionaiInfo !== null) {
      content.additionaiInfo
        .filter((x) => x.title === "provider")
        .map((x) => (x.title = "Производитель"));
      content.additionaiInfo
        .filter((x) => x.title === "seedType")
        .map((x) => (x.title = "Вид"));
      content.additionaiInfo
        .filter((x) => x.title === "growType")
        .map((x) => (x.title = "Способ выращивания"));
    }
    setProduct(content);
  };
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  useEffect(() => {
    fetchProduct();
    setTotalPrice(product.price * amount);
  }, [page, amount]);

  useEffect(() => {
    getPics();
  }, []);

  let incrementAmount = () => {
    setAmount(amount + 1);
  };
  let decrementAmount = () => {
    if (amount !== 1) {
      setAmount(amount - 1);
    }
  };

  let Wrapper = styled.div`
    height: 225px;
    position: relative;
    width: 400px;
    overflow-x: hidden;
  `;

  const Slide = styled.div`
    display: flex;
    width: 400px;
    height: 225px;
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => `translateX(${props.xPosition}px)`};
     {
      width: 100%;
      height: 100%;
    }
  `;
  //let images = getImages();

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
  let images = image;

  return (
    <div className="card-info">
      <div className="close-button">
        <Close
          onClick={function () {
            props.closeModal();
          }}
        />
      </div>
      <div className="image-block">
        <div className="image-block-child">
        
          <CCarousel controls indicators>
            {images.length > 0 &&
              image.map((x) => (
                <CCarouselItem>
                  <CImage
                    className="d-block w-100 slider-wrapper-info"
                    src={x}
                    alt="slide 1"
                  />
                </CCarouselItem>
              ))}
          </CCarousel>
          
        </div>
        <div className="image-block-child ">
          <p className="chars-title">
            <b>Основные характеристики</b>
          </p>
          <div className="scroll">
            {productInfo.additionaiInfo !== null &&
              productInfo.additionaiInfo.map((x) => (
                <div>
                  <div className="chars-table ">
                    <div> {x.title}</div>
                    <div className="green"> {x.content}</div>
                  </div>
                  <hr className="chars-table-hr" />
                </div>
              ))}
          </div>
        </div>
        <div></div>
      </div>
      <div className="text-block">
        <p className="text-title">
          <b> {product.name} </b>
        </p>
        {productInfo.info}
      </div>
      <div className="price-block">
        <div className="price-one child">
          <div style={{ color: "black" }}>
            <b>{productInfo.price}р</b>
          </div>
          <div>цена за упаковку</div>
        </div>
        <div className="child">
          <ThemeProvider theme={theme}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              {window.innerWidth > 1220 && (
                <Button
                  disableRipple="true"
                  sx={{ "&.MuiButtonBase-root:hover": { bgcolor: "#16642C" } }}
                >
                  Количество
                </Button>
              )}

              <Button onClick={decrementAmount}>-</Button>
              <Button
                disableRipple="true"
                sx={{ "&.MuiButtonBase-root:hover": { bgcolor: "#16642C" } }}
              >
                {amount}
              </Button>
              <Button onClick={incrementAmount}>+</Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
        <div className="price-one child">
          <div style={{ color: "black" }}>
            <b>{totalPrice}р</b>
          </div>
          <div>итого</div>
        </div>
      </div>
      <div className="addcart-block">
        <ThemeProvider theme={theme}>
          <Button
            onClick={function () {
              props.addCart(
                product.id,
                productInfo.price,
                product.name,
                amount
              );
              props.closeModal();
            }}
            variant="contained"
            style={{ width: "120px", height: "60px" }}
          >
            Добавить в корзину
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CardInfo;
