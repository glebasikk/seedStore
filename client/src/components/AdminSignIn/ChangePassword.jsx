import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactComponent as Logo } from "../MainPage/Header/logo.svg";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useAlert } from 'react-alert'
const theme = createTheme({
    palette: {
      primary: {
        main: "#16642C",
      },
    },
  });

export default function ChangePassword() {
  const alert = useAlert()
  const auth=async(username,password,newPassword) => {
    const request= await fetch('http://31.128.38.52:5000/changepassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        newPassword: newPassword,
      })
    })
    const status=await request
    if(status.status!==200){
      alert.error("Проверьте корректность введенных данных")
    }
    else{
      alert.success("Пароль успешно обновлен")
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let newPassword = document.getElementById("new-password").value;
    auth(username,password,newPassword)
  };

  return (
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
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Логин"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="new-password"
            label="Новый пароль"
            type="password"
            id="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Изменить
          </Button>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
    <Footer />
    </div>
  );
}