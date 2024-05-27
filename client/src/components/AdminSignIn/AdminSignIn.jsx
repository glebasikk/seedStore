import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
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

export default function AdminSignIn() {
  const alert = useAlert()
  const auth=async(username,password) => {
    const request= await fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).catch((error) => {
      console.log(error);
    });
    
    let status=await request
    if(status.status===200){
      let token=await request.json()
      sessionStorage.setItem("token",token.token)
      window.location.href = '/'
    }
    else{
      alert.error("Неверный логин или пароль")
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth(username,password)
  };

  return (
    <div className="app-container">
        <nav className="app-header" style={{ position: "relative" }}>
        <div className="header-wrapper">
          <div className="admin-header">
          <NavLink to="/">
            <div className="logo">
              <Logo fill="white" width="60px" height="60px" />
              <p className="title">Title</p>
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
          Администратор
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid app-container>
            <Grid item xs>
              <Link href="/changePassword" variant="body2">
                Изменить пароль
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
    <Footer />
    </div>
  );
}