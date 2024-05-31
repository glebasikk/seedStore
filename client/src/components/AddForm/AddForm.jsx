import React, { useEffect, useState, useReducer } from "react";
import { NavLink } from "react-router-dom";
import "./AddForm.css";
import { ReactComponent as Logo } from "./logo.svg";
import Footer from "../Footer/Footer.jsx";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Typography, Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16642C",
    },
  },
});

const AddForm = (props) => {
  const alert = useAlert();
  const params = useParams();
  let id = parseInt(params.id.slice(1));

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  let defaultSeed = {
    name: "",
    price: 0,
    categoryId: [""],
    info: "",
    title: [""],
    content: [""],
  };

  const [seed, setSeed] = useState(defaultSeed);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let previewFiles = files.map((x) => URL.createObjectURL(x));
    //files=
    setSelectedFiles(previewFiles);
    if (files.length > 0) {
      alert.success("Файлы выбраны");
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file`, file);
      });
      setFiles(formData);
    } else {
      alert.error("Не выбран ни один файл");
    }
  };

  let defaultVal = {
    name: "",
    desc: "",
    type: "",
    growType: "",
    provider: "",
    additionaiInfo: [
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
      { [""]: "" },
    ],
    categories: [""],
  };
  const [productInfo, setProduct] = useState(defaultVal);
  const [oldImages, setOldImages] = useState("");

  let newType = productInfo.categories
    .filter((x) => x.categoryType === "seedType")
    .map((x) => x.id);
  let newProvider = productInfo.categories
    .filter((x) => x.categoryType === "provider")
    .map((x) => x.id);
  let newGrowType = productInfo.categories
    .filter((x) => x.categoryType === "growType")
    .map((x) => x.id);

  let seedTypeChange = (event) => {
    newType = event.target.value;
  };
  let seedProviderChange = (event) => {
    newProvider = event.target.value;
  };
  let seedGrowTypeChange = (event) => {
    newGrowType = event.target.value;
  };

  const fetchProduct = async () => {
    const request = await fetch("31.128.38.53:5000/seedallInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        seedId: id,
      }),
    });
    let content = await request.json();

    if (content.categories === null) {
      content.categories = ["", "", ""];
    }
    if (content.additionaiInfo === null) {
      content.additionaiInfo = [];
    }
    while (content.additionaiInfo.length < 8) {
      content.additionaiInfo.push({ title: "", content: "" });
    }
    setProduct(content);
  };

  const getPics = async () => {
    const request = await fetch("http://31.128.38.52:5000/seedpictures", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seedId: id,
      }),
    });
    let content = await request.json();
    let ids = content.map((x) => x.id);
    let picNames = content.map((x) => x.picture);
    let pictures = [];
    for (let i = 0; i < content.length; i++) {
      const res = await fetch("http://31.128.38.52:5000/downloadpicture", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: picNames[i],
        }),
      })
        .then((res) => res.blob())
        .then((data) => {
          pictures[i] = URL.createObjectURL(data);
        })
        .catch((error) => {
          console.log(error);
        });

      let x = pictures.map((x, i) => {
        return [ids[i], x];
      });
      setOldImages(x);
    }
  };
  const [growType, setGrowType] = useState([""]);
  const [type, setType] = useState([""]);
  const [provider, setProvider] = useState([""]);

  const getCategories = async () => {
    const response = await fetch("http://31.128.38.52:5000/listofcategories").then((response) =>
      response.json()
    );
    setGrowType(response.status.filter((x) => x.categoryType === "growType"));
    setType(response.status.filter((x) => x.categoryType === "seedType"));
    setProvider(response.status.filter((x) => x.categoryType === "provider"));
  };

  const [imageError, setImageError] = useState(false);
  const fetchAdd = async (name, price, desc, title, content, categoryId) => {
    const request = await fetch("http://31.128.38.52:5000/addseedallinfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        price: price,
        categoryId: categoryId,
        info: desc,
        title: title.filter((x) => x !== ""),
        content: content.filter((x) => x !== ""),
      }),
    });
    let status = await request;
    let newSeed = await request.json();
    if (status.status === 200) {
      files.forEach((x) => {
        const data = new FormData();
        data.append("seedId", newSeed.id);
        data.append("file", x);
        fetchAddPicture(data);
      });
      alert.success("Товар успешно добавлен");
    } else {
      alert.error("Ошибка добаления");
    }
  };

  const fetchUpdate = async (name, price, desc, title, content, categoryId) => {
    const request = await fetch("http://31.128.38.52:5000/updateseedallinfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        seedId: id,
        name: name,
        price: price,
        categoryId: categoryId,
        info: desc,
        title: title.filter((x) => x !== ""),
        content: content.filter((x) => x !== ""),
      }),
    });
    let newSeed = await request.json();
    let status = await request;

    if (status.status === 200) {
      files.forEach((x) => {
        const data = new FormData();
        data.append("seedId", newSeed.id);
        data.append("file", x);
        fetchAddPicture(data);
      });
      alert.success("Товар успешно изменен");
      forceUpdate(status);
    } else {
      alert.error("Ошибка! Товар не изменен");
    }
  };
  let fetchAddPicture = async (data) => {
    let req = await fetch("http://31.128.38.52:5000/addpicture", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: data,
    });
    let status = await req;
    if (status.status !== 200) {
      alert.error("Ошибка в загрузке изображений");
    }
  };

  let save = async () => {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let charName1 = document.getElementById("charName1").value;
    let charName2 = document.getElementById("charName2").value;
    let charName3 = document.getElementById("charName3").value;
    let charName4 = document.getElementById("charName4").value;
    let charName5 = document.getElementById("charName5").value;
    let charName6 = document.getElementById("charName6").value;
    let charName7 = document.getElementById("charName7").value;
    let charName8 = document.getElementById("charName8").value;
    let charVal1 = document.getElementById("charVal1").value;
    let charVal2 = document.getElementById("charVal2").value;
    let charVal3 = document.getElementById("charVal3").value;
    let charVal4 = document.getElementById("charVal4").value;
    let charVal5 = document.getElementById("charVal5").value;
    let charVal6 = document.getElementById("charVal6").value;
    let charVal7 = document.getElementById("charVal7").value;
    let charVal8 = document.getElementById("charVal8").value;

    let title = [
      charName1,
      charName2,
      charName3,
      charName4,
      charName5,
      charName6,
      charName7,
      charName8,
    ];
    let content = [
      charVal1,
      charVal2,
      charVal3,
      charVal4,
      charVal5,
      charVal6,
      charVal7,
      charVal8,
    ];

    let categoryId = [];
    categoryId.push(newType);
    categoryId.push(newGrowType);
    categoryId.push(newProvider);

    if (id === 0) {
      fetchAdd(name, price, desc, title, content, categoryId.flat(2));
    } else {
      fetchUpdate(name, price, desc, title, content, categoryId.flat(2));
    }
    setSelectedFiles([]);
    setFiles([]);
  };

  let deleteImage = (event) => {
    event.preventDefault();
    let ids = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    
    
    for (var i = 0; i < checkboxes.length; i++) {
      ids.push(checkboxes[i].value);
    }
    ids = ids.map(Number);
    ids.forEach((x) => {
      fetchDeleteImage(x);
      
    });

  };
  let fetchDeleteImage = async (id) => {
    let req = await fetch("http://31.128.38.52:5000/delpicture", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    }).catch((error) => {
      console.log(error);
    });
    let status = await req;
    if (status.status === 200) {
      alert.success("Изображение удалено");
      forceUpdate(status);
    } else {
      alert.error("Ошибка удаления");
    }
    setOldImages([])
  };

  const [update, forceUpdate] = useState("");

  useEffect(() => {
    if (id !== 0) {
      fetchProduct();
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (id !== 0) {
      fetchProduct();
      getPics();
    }
  }, [update]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <nav className="app-header" style={{ position: "relative" }}>
          <div className="header-wrapper">
            <div className="admin-header">
              <NavLink to="/">
                <div className="logo">
                  <Logo fill="white" width="60px" height="60px" />
                  <p className="title">Твои семена</p>
                </div>
              </NavLink>
              <div className="for-admin">Для администратора</div>
            </div>
          </div>
        </nav>
        <div className="admin-pannel">
          <div className="admin-pannel-child">
            <div className="upload-pics">
              <Box
                p={3}
                m={1}
                border="1px dashed #ccc"
                borderRadius={8}
                textAlign="center"
              >
                <PhotoCamera sx={{ fontSize: 100, color: "#16642C" }} />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="multiple-file-input"
                />
                <label htmlFor="multiple-file-input">
                  <Button variant="outlined" component="span">
                    Выберите изображения
                  </Button>
                </label>
                {selectedFiles.length > 0 && (
                  <div>
                    <Typography variant="subtitle1" mt={2}>
                      Выбранные изображения:
                    </Typography>
                    <ul>
                      {selectedFiles.map((file) => (
                        <img className="del-image" src={file} />
                      ))}
                    </ul>
                  </div>
                )}
              </Box>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  id="name"
                  label="Название"
                  variant="outlined"
                  key={productInfo.name}
                  defaultValue={productInfo.name}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  id="price"
                  label="Цена"
                  variant="outlined"
                  type="number"
                  key={productInfo.price}
                  defaultValue={productInfo.price}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Производитель
                </InputLabel>
                <Select
                  multiple
                  key={productInfo.categories
                    .filter((x) => x.categoryType === "provider")
                    .map((x) => x.id)}
                  defaultValue={productInfo.categories
                    .filter((x) => x.categoryType === "provider")
                    .map((x) => x.id)}
                  labelId="demo-simple-select-autowidth-label"
                  id="provider"
                  label="Производитель"
                  required="required"
                  onChange={seedProviderChange}
                >
                  {provider.length > 0 &&
                    provider.map((x) => (
                      <MenuItem key={x.id} value={x.id}>
                        {x.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Вид
                </InputLabel>
                <Select
                  multiple
                  key={productInfo.categories
                    .filter((x) => x.categoryType === "seedType")
                    .map((x) => x.id)}
                  defaultValue={productInfo.categories
                    .filter((x) => x.categoryType === "seedType")
                    .map((x) => x.id)}
                  onChange={seedTypeChange}
                  labelId="demo-simple-select-autowidth-label"
                  id="type"
                  label="Вид"
                  required="required"
                >
                  {type.length > 0 &&
                    type.map((x) => (
                      <MenuItem
                        key={`${Math.floor(Math.random() * 1000)}-min`}
                        value={x.id}
                      >
                        {x.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Способ выращивания
                </InputLabel>
                <Select
                  multiple
                  key={productInfo.categories
                    .filter((x) => x.categoryType === "growType")
                    .map((x) => x.id)}
                  defaultValue={productInfo.categories
                    .filter((x) => x.categoryType === "growType")
                    .map((x) => x.id)}
                  onChange={seedGrowTypeChange}
                  labelId="demo-simple-select-autowidth-label"
                  id="growType"
                  label="СпособВыращивания"
                  required="required"
                >
                  {growType.length > 0 &&
                    growType.map((x) => (
                      <MenuItem key={x.id} value={x.id}>
                        {x.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  id="desc"
                  label="Описание"
                  multiline
                  rows={4}
                  key={productInfo.info}
                  defaultValue={productInfo.info}
                />
              </FormControl>
            </div>
          </div>
          <div className="admin-pannel-child">
            {oldImages.length > 0 &&
            <Box
              p={2}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              
              <form onSubmit={deleteImage} className="delete-pics-form">
                <div className="old-images">
                  {
                    oldImages.map((x) => (
                      <div>
                        <img src={x[1]} className="del-image" />
                        <input type="checkbox" key={x[0]} value={x[0]} />
                      </div>
                    ))}
                </div>
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                  Удалить
                </Button>
              </form>
              
            </Box>
}
            <p className="chars">
              <b>Характеристики</b>
            </p>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName1"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[0].title}
                    defaultValue={productInfo.additionaiInfo[0].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal1"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[0].content}
                    defaultValue={productInfo.additionaiInfo[0].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName2"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[1].title}
                    defaultValue={productInfo.additionaiInfo[1].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal2"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[1].content}
                    defaultValue={productInfo.additionaiInfo[1].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName3"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[2].title}
                    defaultValue={productInfo.additionaiInfo[2].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal3"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[2].title}
                    defaultValue={productInfo.additionaiInfo[2].title}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName4"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[3].title}
                    defaultValue={productInfo.additionaiInfo[3].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal4"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[3].content}
                    defaultValue={productInfo.additionaiInfo[3].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName5"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[4].title}
                    defaultValue={productInfo.additionaiInfo[4].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal5"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[4].content}
                    defaultValue={productInfo.additionaiInfo[4].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName6"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[5].title}
                    defaultValue={productInfo.additionaiInfo[5].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal6"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[5].content}
                    defaultValue={productInfo.additionaiInfo[5].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName7"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[6].title}
                    defaultValue={productInfo.additionaiInfo[6].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal7"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[6].content}
                    defaultValue={productInfo.additionaiInfo[6].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Box
              p={1}
              m={1}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <div className="admin-pannel-inputs">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charName8"
                    label="Название характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[7].title}
                    defaultValue={productInfo.additionaiInfo[7].title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="charVal8"
                    label="Значение характеристики"
                    variant="outlined"
                    key={productInfo.additionaiInfo[7].content}
                    defaultValue={productInfo.additionaiInfo[7].content}
                  />
                </FormControl>
              </div>
            </Box>
            <Button variant="contained" onClick={save}>
              Cохранить
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AddForm;
