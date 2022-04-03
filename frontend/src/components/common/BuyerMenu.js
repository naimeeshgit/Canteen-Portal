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
import { useNavigate } from "react-router-dom";

const ItemList = (event) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);


    // list of items
    useEffect(async () => {
        var tempUser = []
        var tempVendor = []

        var respUser = await axios.get("http://localhost:4000/BuyerMenu/menu")
        // console.log(respUser)
        tempUser = await respUser.data

        var respVendor = await axios.get("http://localhost:4000/BuyerMenu/getshopName")
        tempVendor = await respVendor.data

        tempUser.map((us, ind) => {
            tempVendor.map((ven, inde) => {
                if (ven.email == us.VendorEmail) {
                    us["shopName"] = ven.shopName
                }
            })
        })

        console.log("Now with shopName: ")
        console.log(tempUser)
        console.log(tempVendor)
        setUsers(tempUser)

    }, []);



    const handleClick = (user) => {

        console.log("clicked")
        console.log(user)
        localStorage.setItem("VendorEmail", user.VendorEmail);
        localStorage.setItem("BuyerEmail", user.BuyerEmail);
        localStorage.setItem("shopName", user.shopName);
        localStorage.setItem("FoodName", user.FoodName);
        // localStorage.setItem("Quantity", user.Quantity);
        localStorage.setItem("price", user.price);
        localStorage.setItem("rating", user.rating);
        localStorage.setItem("tags", user.tags);
        localStorage.setItem("addon", user.addon);
        localStorage.setItem("addonPrice", user.addonPrice);
        navigate("/placeOrder")
    }

    const ratethis = (user) => {
        console.log("rate:")
        console.log(user)
        localStorage.setItem("VendorEmail", user.VendorEmail);
        localStorage.setItem("BuyerEmail", user.BuyerEmail);
        localStorage.setItem("shopName", user.shopName);
        localStorage.setItem("FoodName", user.FoodName);
        // localStorage.setItem("Quantity", user.Quantity);
        localStorage.setItem("price", user.price);
        localStorage.setItem("rating", user.rating);
        localStorage.setItem("tags", user.tags);
        localStorage.setItem("addon", user.addon);
        localStorage.setItem("addonPrice", user.addonPrice);
        navigate("/rate")

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
                                    <TableCell>Shop Name</TableCell>
                                    <TableCell>Item</TableCell>
                                    <TableCell>price</TableCell>
                                    <TableCell>type</TableCell>
                                    <TableCell>rating</TableCell>
                                    <TableCell>tags</TableCell>
                                    {/* <TableCell>addons</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{user.shopName}</TableCell>
                                        <TableCell>{user.FoodName}</TableCell>
                                        <TableCell>{user.price}</TableCell>
                                        <TableCell>{user.type}</TableCell>
                                        <TableCell>{user.rating}</TableCell>
                                        <TableCell>{user.tags}</TableCell>
                                        <TableCell> <Button onClick={() => handleClick(user)}>Buy</Button></TableCell>
                                        <TableCell><Button onClick={() => ratethis(user)}>Rate This</Button></TableCell>

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
