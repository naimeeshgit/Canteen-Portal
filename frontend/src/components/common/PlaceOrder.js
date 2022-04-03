import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from 'react';
import TextField from '@mui/material/TextField';

const BuyItemInMenu = () => {

  const [quantity, setQuantity] = useState([]);
  
  const onChangeQuantity = (event) => {
    setQuantity({
      quantity: event.target.value,
    })
  }

  const onOrderItem = (event) => {
    event.preventDefault();
    console.log("clicked")
      const item = {
      VendorEmail: localStorage.getItem("VendorEmail"),
      BuyerEmail: localStorage.getItem("email"),
      VendorName: localStorage.getItem("shopName"),
      FoodName: localStorage.getItem("FoodName"),
      Quantity: quantity.quantity,
      price: localStorage.getItem("price"),
      rating: localStorage.getItem("rating"),
    }

    console.log("order details [PlaceOrder.js] : ")
    console.log(item);

    axios
      .post("/api/BuyerMenu/placeorder", item)
      .then((response) => {

        // if response == 400 then alert error
        if (response.status === 400) {
          alert("Insufficient balance");
        }
        else {
          console.log(response)
        alert("Added\t" + response.data.FoodName);
        setBool(!bool);

        // console.log("neeche dekh:");
        console.log(response.data);
        // window.location.reload();
        }
      });
      // window.location.href = "/BMyorder";
  }

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool);
    console.log(bool);
  };

  
  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            variant="outlined"
            onChange={onChangeQuantity}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onOrderItem}>
            Submit
          </Button>
          <Button onClick={changeBool}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </div>
  );


}

export default BuyItemInMenu;