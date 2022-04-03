import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from 'react';
import TextField from '@mui/material/TextField';

const NextStage = () => {

  
  const Instruction = (event) => {
    event.preventDefault();
    console.log("in the Instruction: ")
      const it = {
      id_food: localStorage.getItem("id_food"),
      instruction: localStorage.getItem("instruction"),

    }
    console.log(it);
    axios
      .post("/api/BuyerMenu/nextStage", it)
      .then((response) => {

        alert("Done , now redirecting");
        
         
      });
      window.location.href = "/VenviewOrder";
  }

  
  
  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" onClick={Instruction}>
            Yes, Do it!
          </Button>
        </Grid>
      </Grid>
    </div>
  );


}

export default NextStage;