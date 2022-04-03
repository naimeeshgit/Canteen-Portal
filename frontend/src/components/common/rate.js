import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from 'react';
import TextField from '@mui/material/TextField';


const BuyItemInMenu = () => {

  const [stars, setStars] = useState([]);
  
  const onChangeRate = (event) => {
    setStars({
      stars: event.target.value,
    })
  }


  const onOrderItem = (event) => {
    event.preventDefault();
    console.log("rated: ")
      const item = {
      VendorEmail: localStorage.getItem("VendorEmail"),
      FoodName: localStorage.getItem("FoodName"),
      rating: stars.stars,
    }

    console.log("rating details [rate.js] : ")
    console.log(item);

    axios
      .post("http://localhost:4000/BuyerMenu/rate", item)
      .then((response) => {

        alert("rated\t" + response.data.FoodName);
        setBool(!bool);
        console.log(response.data);
        }
        );
      // window.location.reload();
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
            label="Rate: "
            variant="outlined"
            onChange={onChangeRate}
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