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
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const ItemList = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  // list of items
  useEffect(() => {

    const VendorEmail = {
      email: localStorage.getItem("email")
    }


    axios
      .post("/api/BuyerMenu/VgetOrder", VendorEmail)
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const nextStage = (user) => {

    localStorage.setItem("id_food",user._id); 
    localStorage.setItem("instruction","next")
    navigate("/nextstage");


  }

  const reject = (user) => {

    localStorage.setItem("id_food",user._id);
    localStorage.setItem("instruction","reject")
    
    navigate("/nextstage");


}


return (

    <div>

      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>orderStatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.FoodName}</TableCell>
                    <TableCell>{user.Quantity}</TableCell>
                    <TableCell>{user.orderStatus}</TableCell>
                    <TableCell>
                    <Button style={{margin:10}} variant="contained" color="success" onClick={() => nextStage(user)}>MOVE TO NEXT STAGE</Button>
                    
                    <Button variant="contained" color="error" onClick={() => reject(user)}>REJECT</Button>
                    </TableCell>
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
