import React, { useEffect, useState } from "react";

import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import Delete from "@mui/icons-material/Delete";


import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#16642C",
    },
  },
});

const Slider = (props) => {
  const [image, setImg] = useState([]);
  const [update, setUpdate] = useState([]);
  const getPics = async () => {
    const request = await fetch("http://31.128.38.52:5000/allpicturiesslider", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let content = await request.json();

    let pictures = [];
    for (let i = 0; i < content.length; i++) {
      const res = await fetch("http://31.128.38.52:5000/downloadpictureslider", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: content[i].id,
        }),
      })
        .then((res) => res.blob())
        .then((data) => {
          pictures[i] = URL.createObjectURL(data);
        })
        .catch((error) => {
          console.log(error);
        });

      content[i].picture = pictures[i];
    }

    setImg(content);
  };
  const [files, setFiles] = useState([]);
  let handleSubmit = (e) => {
    e.preventDefault();
    files.forEach((x) => {
      const data = new FormData();
      data.append("file", x);
      fetchAddPicture(data);
    });
  };
  let fetchAddPicture = async (data) => {
    let req = await fetch("http://31.128.38.52:5000/addpictureslider", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: data,
    });
    let status = await req;
    if (status.status !== 200) {
      //alert.error("Ошибка в загрузке изображений");
    }
    setUpdate(Math.random());
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // alert.success("Файлы выбраны");
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file`, file);
      });
      setFiles(formData);
    } else {
      //alert.error("Не выбран ни один файл");
    }
  };
  let handleDelete = (id) => {
    fetch("http://31.128.38.52:5000/delpictureslider", {
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
    setUpdate(Math.random());
    window.location.reload();
  };
  let isAdmin = sessionStorage.getItem("token");
  useEffect(() => {
    getPics();
  }, [update]);
  return (
    <div>
      <div className="slider-wrapper">
        <CCarousel controls indicators>
          {image.length > 0 &&
            image.map((x) => (
              <CCarouselItem>
                <CImage
                  className="d-block w-100 slider-wrapper"
                  src={x.picture}
                  alt="slide 1"
                />
                {isAdmin && (
                  <div className="del-slider-pic">
                    <div className="del-slider-pic-child">
                      <button
                        onClick={function () {
                          handleDelete(x.id);
                        }}
                      >
                        <Delete sx={{ color: "white", fontSize: 34 }} />
                      </button>
                    </div>
                  </div>
                )}
              </CCarouselItem>
            ))}
        </CCarousel>
      </div>
      {isAdmin && (
        <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit} className="add-slider-pic-form">
          Загрузить изображения для слайдера
          <input
            type="file"
            accept="image/*"
            multiple
            //style={{display:"none"}}
            onChange={handleFileChange}
            id="multiple-file-input"
          />
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        </form>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Slider;
