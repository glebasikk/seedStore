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

const Footer = (props) => {
  return (
    <div className="footer">
      <Box
        component="footer"
        sx={{
          backgroundColor: "#16642C",
          color: "white",
          p: 6,
          
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                <div className="logo">
                  <Logo fill="white" width="50px" height="50px" />
                  <p>Title</p>
                </div>
              </Typography>
              <Typography variant="body2">
                Компание по оптовой продаже семян растений.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Наши данные
              </Typography>
              <Typography variant="body2">г.Москва, ул. Ленина 15</Typography>
              <Typography variant="body2">Email: info@example.com</Typography>
              <Typography variant="body2">Phone: +1 234 567 8901</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Социальные сети
              </Typography>
              <Link href="https://www.facebook.com/" color="inherit">
                <Facebook />
              </Link>
              <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
              >
                <Instagram />
              </Link>
              <Link href="https://www.twitter.com/" color="inherit">
                <Twitter />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://your-website.com/">
                Your Website
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
