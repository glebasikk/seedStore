import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as Whatsapp } from "./whatsapp.svg";
import { ReactComponent as Gmail } from "./gmail.svg";
import { ReactComponent as Vk } from "./vk.svg";

const Footer = (props) => {
  return (
    <div className="app-footer">
      <Box
        component="footer"
        sx={{
          backgroundColor: "#16642C",
          color: "white",
          p: 6,
          
        }}
      >
        <Container maxWidth="lg">
          <Grid app-container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                <div className="logo">
                  <Logo fill="white" width="50px" height="50px" />
                  <p>Твои семена</p>
                </div>
              </Typography>
              <Typography variant="body2">
                Компания по оптовой продаже семян растений.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Социальные сети
              </Typography>
              <Link href="https://vk.com/club226074497" color="inherit">
                <Vk fill="white" width="22px" height="22px" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61560463943694&mibextid=LQQJ4d" color="inherit">
                <Facebook />
              </Link>
              <Link
                href="https://chat.whatsapp.com/Gm9fWMK4uWZGjNIsOxlmHv"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
              >
                <Whatsapp fill="white" width="20px" height="20px" />
              </Link>
              <Link href="tvoisemenaa@gmail.com" color="inherit">
                <Gmail fill="white" width="22px" height="22px" />
              </Link>
              
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
