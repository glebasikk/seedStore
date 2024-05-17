import React, { useEffect, useState } from "react";
import "./Cart.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ReactComponent as Delete } from "./delete.svg";
import { useAlert } from 'react-alert'

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

const Cart = (props) => {
  const alert = useAlert()
  const [cartTotal, setCartTotal] = useState(0);
  const [prices, setPrices] = useState(
    props.cart
      .map((x) => x.price * x.amount)
      .reduce((partialSum, a) => partialSum + a, 0)
  );

  useEffect(() => {
    setPrices(
      props.cart
        .map((x) => x.price * x.amount)
        .reduce((partialSum, a) => partialSum + a, 0)
    );
  }, [props.cart]);

  const sentCart = async(e) => {
    e.preventDefault();
    let paymentMethod = document.getElementById("paymentMethod").innerHTML;
    let deliveryMethod = document.getElementById("deliveryMethod").innerHTML;
    let userName = document.getElementById("userName").value;
    let userPhone = document.getElementById("userPhone").value;
    let id=props.cart.map(x=>x.id)
    let amount= props.cart.map(x=>x.amount)
    let req=await fetch("http://31.128.38.67:5000/mail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        username: userName,
        phone: userPhone,
        amount: props.cart.map(x=>x.amount),
        seedId: props.cart.map(x=>x.id),
      }),
    }).catch((error) => {
      console.log(error);
    });
    let status=await req
    if(status.status!==200){
      alert.error("Ваша корзина пустая, добавьте в неё товары, чтобы оформить заказ")
    }else{
      alert.success("Заказ успешно оформлен. Мы с вами скоро свяжемся")
      
    }    
  };

  const [nameError, setNameError] = useState(false);

  const handlePhoneChange = (e) => {
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  let customStyles={}
  if(window.innerWidth > 1220){
    customStyles = {
      maxHeight: 250,
    }
  }else{
    customStyles = {
      maxHeight: 500,
  }
}
  return (
    <nav className="cart">
      <p className="cart-title">
        <b>Корзина</b>
      </p>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={customStyles}>
          <Table
            size='small'
            sx={{ minWidth: 700, maxHeight: 100, }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Название</StyledTableCell>
                <StyledTableCell align="right">Цена за упаковку</StyledTableCell>
                <StyledTableCell align="center">Количество</StyledTableCell>
                <StyledTableCell align="right">Итоговая цена</StyledTableCell>
                <StyledTableCell align="center">Удалить</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.cart.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ThemeProvider theme={theme}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                      >
                        <Button
                          onClick={function () {
                            props.decrementAmount(row.id, row.amount);
                          }}
                        >
                          -
                        </Button>
                        <Button
                          disableRipple="true"
                          sx={{
                            "&.MuiButtonBase-root:hover": {
                              bgcolor: "#16642C",
                            },
                          }}
                        >
                          {row.amount}
                        </Button>
                        <Button
                          onClick={function () {
                            props.incrementAmount(row.id);
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.price * row.amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={function () {
                        props.deleteCart(row.id);
                      }}
                    >
                      <Delete />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <p className="cart-title">
        <b>Итого:</b>
        {prices} р
      </p>
      <p className="cart-caption">
        Заполните поля снизу и мы с вами свяжемся для подтверждения заказа
      </p>
      <form /*className="form"*/ onSubmit={sentCart}>
        <div className="select-block">
          <div className="select-block-child">
            <ThemeProvider theme={theme}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Способ оплаты
                </InputLabel>
                <Select
                  defaultValue = ""
                  labelId="demo-simple-select-autowidth-label"
                  id="paymentMethod"
                  label="Способ оплаты"
                  required="required"
                >
                  <MenuItem key={1} value="Картой">Картой</MenuItem>
                  <MenuItem key={2} value="Наличными">Наличными</MenuItem>
                  <MenuItem key={3} value="Платеж ЕРИП">Платеж ЕРИП</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Способ доставки
                </InputLabel>
                <Select
                  defaultValue = ""
                  labelId="demo-simple-select-autowidth-label"
                  id="deliveryMethod"
                  label="Способ доставки"
                  required="required"
                >
                  <MenuItem key={4} value="Самовывоз">Самовывоз</MenuItem>
                  <MenuItem key={5} value="Курьер">Курьер</MenuItem>
                  <MenuItem key={6} value="Почта">Почта</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </div>
          <div className="select-block-child">
            <ThemeProvider theme={theme}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  id="userName"
                  label="Имя"
                  variant="outlined"
                  required="required"
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  id="userPhone"
                  label="Номер телефона"
                  error={nameError}
                  helperText={
                    nameError
                      ? "Введите корректный номер телефона"
                      : ""
                  }
                  inputProps={{
                    pattern: '\\+?[0-9]+',
                  }}
                  onChange={handlePhoneChange}
                  variant="outlined"
                  required="required"
                />
              </FormControl>
            </ThemeProvider>
          </div>
        </div>
        <div className="order-section">
          <ThemeProvider theme={theme}>
            <Button variant="contained" type="submit">
              Заказать
            </Button>
            <Button
              variant="outlined"
              onClick={function () {
                props.closeModal();
              }}
            >
              Закрыть
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </nav>
  );
};

export default Cart;
