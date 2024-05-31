import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import { ReactComponent as Logo } from "../MainPage/Header/logo.svg";
import { Typography, Box } from "@mui/material";
import { FileCopy } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ReactComponent as Delete } from "./delete.svg";
import { useAlert } from "react-alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./FilesPage.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16642C",
    },
  },
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#16642C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function FilesPage() {
  const alert = useAlert();
  let isAdmin = sessionStorage.getItem("token");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  let addFiles = async (data, x) => {
    let request = await fetch("http://31.128.38.52:5000/addfile", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: data,
    });
    let status = await request;

    if (status.status === 200) {
      alert.success("Файл загружен");
    } else {
      alert.error("Файл не загружен");
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file`, file);
      });
      formData.forEach((x) => {
        const data = new FormData();
        data.append("file", x);
        addFiles(data);
      });
    } else {
      alert.error("Не выбран ни один файл");
    }
  };

  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const request = await fetch("http://31.128.38.52:5000/allfiles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });
  };
  let deleteFile = (id) => {
    fetch("http://31.128.38.52:5000/delfile", {
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
  };
  let downloadFile = async (id) => {
    let req = await fetch("http://31.128.38.52:5000/downloadcatalog", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(res=>res.blob()).then(data=>URL.createObjectURL(data))
    let request =  req    
    var link = document.createElement('a');
    link.setAttribute('href', request);
    link.setAttribute('download',"file"+id);
	  link.click();
    
  };
  useEffect(() => {
    getFiles();
  }, [files]);

  let customStyles={}
  if(window.innerWidth > 1220){
    customStyles = {
      width: "100%", 
      mt: "12",
    }
  }else{
    customStyles = {
      mt: 2,
      
  }
}

  return (
    <div className="app-container">
      <nav className="app-header" style={{ position: "relative" }}>
        <div className="header-wrapper">
          <div className="admin-header">
            <NavLink to="/">
              <div className="logo">
                <Logo fill="white" width="60px" height="60px" className="svg-logo"/>
                <p className="title">Твои семена</p>
              </div>
            </NavLink>
            <div className="for-admin">Список файлов</div>
          </div>
        </div>
      </nav>
      <ThemeProvider theme={theme}>
        {isAdmin && (
          <div className="upload-files">
            <FileCopy sx={{ fontSize: 100, color: "#16642C" }} />
            <Box
              p={3}
              border="1px dashed #ccc"
              borderRadius={8}
              textAlign="center"
            >
              <input
                type="file"
                
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="multiple-file-input"
              />
              <label htmlFor="multiple-file-input">
                <Button variant="outlined" component="span">
                  Выберите файлы
                </Button>
              </label>
              {selectedFiles.length > 0 && (
                <div>
                  <Typography variant="subtitle1" mt={2}>
                    Выбранные файлы:
                  </Typography>
                  <ul>
                    {selectedFiles.map((file) => (
                      <li key={file.name}>{file.name}</li>
                    ))}
                  </ul>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    mt={2}
                  >
                    Загрузить
                  </Button>
                </div>
              )}
            </Box>
          </div>
        )}
      </ThemeProvider>
      <div className="files-container">
      <Box
                p={3}
                m={1}
                border="1px dashed #16642C"
                borderRadius={8}
                textAlign="center"
              >
        На этой странице вы можете скачать перечень наших товаров в файловом формате. Чтобы скачать файл, нажмите на его имя в таблице и дождитесь загрузки.
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table
            size="small"
            sx={customStyles}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Файлы</StyledTableCell>
                {isAdmin && (
                  <StyledTableCell align="center">Удалить</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
                    <button className="file-link"
                      onClick={function () {
                        downloadFile(row.id);
                      }}
                    >
                      {row.catalog}
                    </button>
                  </StyledTableCell>
                  {isAdmin && (
                    <StyledTableCell align="center">
                      <button
                        onClick={function () {
                          deleteFile(row.id);
                        }}
                      >
                        <Delete />
                      </button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </div>
      <Footer />
    </div>
  );
}
