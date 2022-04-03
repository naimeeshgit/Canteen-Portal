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
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";




const ItemList = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  // list of items
  useEffect(() => {

    const VendorEmail = {
      email: localStorage.getItem("email")
    }


    axios
      .post("http://localhost:4000/item/getItem", VendorEmail)
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  



  // FORM PARTS
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


  const handleClose = () => {
    setPopupOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: item._id,
      FoodName: item.FoodName,
      price: item.price,
      rating: item.rating,
      type: item.type,
      tags: item.tags,
      addon: item.addon,
      addonPrice: item.addonPrice
    };


    console.log(newItem);

    axios
      .put("http://localhost:4000/item/edit", newItem)
      .then((response) => {
        alert("Edited\t" + response.data.FoodName);
        setBool(!bool);

        // console.log("neeche dekh:");
        console.log(response.data);
        window.location.reload();
      });
    handleClose();
  };

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

  // SETPOPUPOPEN
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    // localStorage.setItem("currentitem",user);
    console.log(event.target.id);
    var asd = {}
    users.map(usera => {
      if (usera._id == event.target.id) {
        // user = usera;
        asd = usera
      }
    })
    console.log(asd);
    // localStorage.setItem("currentitem", user.FoodName);
    setItem(asd)
    setPopupOpen(true);

  }
  // SETPOPUPOPEN

  const deleteItem = (event) => {
    event.preventDefault();
    var del = {}
    users.map(usera => {
      if (usera._id == event.target.id) {
        // user = usera;
        del = usera
      }
    })
    console.log(del)
    const newItem = {
      id: del._id,
    }
    // console.log(item)
    console.log("abee");
    console.log(newItem);

    axios
      .post("http://localhost:4000/item/delete", newItem)
      .then((response) => {
        alert("Deleted\t");
        console.log("neeche dekh:");
        console.log(response.data);
        window.location.reload();

      });

  }

  const AddItem = (event) => {
    navigate("/Additem");
  }

  

  return (

    <div>

      <Grid m={2} pt={3}>
        <Button variant="outlined" onClick={AddItem}>
          Add Item
        </Button>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>rating</TableCell>
                  <TableCell>tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.FoodName}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.tags}</TableCell>
                    <Button id={user._id} onClick={handleClickOpen}>Full</Button>
                    <Button id={user._id} onClick={deleteItem}>Delete</Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={popupOpen} onClose={handleClose}>
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField label="Food Item"
              variant="outlined"
              value={item.FoodName}
              onChange={onChangeFoodName}
              disabled={bool}
            >

            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="price"
              variant="outlined"
              value={item.price}
              onChange={onChangePrice}
              disabled={bool}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="type"
              variant="outlined"
              value={item.type}
              onChange={onChangetype}
              disabled={bool}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="tags"
              variant="outlined"
              value={item.tags}
              onChange={onChangetags}
              disabled={bool}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="addon"
              variant="outlined"
              value={item.addon}
              onChange={onChangeaddon}
              disabled={bool}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="addon price"
              variant="outlined"
              value={item.addonPrice}
              onChange={onChangeaddonPrice}
              disabled={bool}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Submit
            </Button>
            <Button onClick={changeBool}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Dialog>


      
    </div>

  );
};

export default ItemList;
