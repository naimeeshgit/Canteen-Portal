import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import * as React from 'react';
import TextField from '@mui/material/TextField';

const AddItemInMenu = () => {

const onChangeFoodName = (event) => {
    // setName(event.target.value);
    setItem({
      ...item,
      FoodName: event.target.value,
    })
  };


  const onChangePrice = (event) => {

    setItem({
      ...item,
      price: event.target.value,
    })
  };

  const onChangetype = (event) => {

    setItem({
      ...item,
      type: event.target.value,
    })
  };


  const onChangetags = (event) => {
    setItem({
      ...item,
      tags: event.target.value,
    })
  };

  const onChangeaddon = (event) => {
    setItem({
      ...item,
      addon: event.target.value,
    })
  };

  const onChangeaddonPrice = (event) => {
    setItem({
      ...item,
      addonPrice: event.target.value,
    })
  }


const onAddItem = async (event) => {
    event.preventDefault();
    const newItem = {
      VendorEmail: localStorage.getItem("email"),
      FoodName: item.FoodName,
      price: item.price,
      rating: item.rating,
      type: item.type,
      tags: item.tags,
      addon: item.addon,
      addonPrice: item.addonPrice
    };

    console.log(newItem);

    const resp = await axios.post("/api/item/add", newItem)
      
    alert("added")
    setBool(!bool);
    console.log(resp.data);

        // console.log("neeche dekh:");
        // console.log(response.data) ;
        // window.location.reload();
      // });
      window.location.href = "/foodItemV";
  }

 
  const [item, setItem] = useState({
    id: '',
    FoodName: '',
    price: '',
    rating: '',
    type: '',
    tags: [''],
    addon: [''],
    addonPrice: ['']

  });

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool);
    console.log(bool);
  };

  console.log(item)

 
  return (
    <div>
    <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField label="Food Item"
            variant="outlined"
            onChange={onChangeFoodName}
            disabled={bool}
          >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="price"
            variant="outlined"
            onChange={onChangePrice}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="type"
            variant="outlined"
            onChange={onChangetype}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="tags"
            variant="outlined"
            onChange={onChangetags}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="addon"
            variant="outlined"
            onChange={onChangeaddon}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="addon price"
            variant="outlined"
            onChange={onChangeaddonPrice}
            disabled={bool}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onAddItem}>
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

export default AddItemInMenu;