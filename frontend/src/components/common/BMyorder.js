import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import * as React from 'react';


const ItemList = (props) => {
  const [users, setUsers] = useState([]);


  // list of items
  useEffect(() => {

    const BuyerEmail = {
      email: localStorage.getItem("email")
    }


    axios
      .post("/api/BuyerMenu/BgetOrder", BuyerEmail)
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


return (

    <div>

      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>VendorName</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>rating</TableCell>
                  <TableCell>orderStatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.VendorName}</TableCell>
                    <TableCell>{user.FoodName}</TableCell>
                    <TableCell>{user.Quantity}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.orderStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
};

export default ItemList;
