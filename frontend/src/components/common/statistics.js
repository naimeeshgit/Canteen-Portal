import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CssBaseline from '@mui/material/CssBaseline';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";

const theme = createTheme();


const VendorStats = (props) => {
    const [items, Setitems] = useState([]);
    const [stats, Setstats] = useState({
        total: "",
        accepted: "",
        rejected: ""
    });

    useEffect(() => {
        const data = {
            email: localStorage.getItem("email")
        }
       
        axios
            .post("/api/BuyerMenu/top", data)
            .then((response) => {
                Setitems(response.data.slice(0, 5));
            });
        axios
            .post("/api/BuyerMenu/stat", data)
            .then((response) => {
                Setstats(response.data);
            });
    }, []);




    return (
        <ThemeProvider theme={theme}>
                <Container maxWidth="xs" >
                    <CssBaseline />
                    <Typography component="h1" variant="h5" align="center" margin-bottom="10px">
                        Top 5 Items
                    </Typography>
                    <TableContainer component={Paper} maxWidth="10px" >
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Item</TableCell>
                                    <TableCell align="center">Orders</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (

                                    <TableRow
                                        key={item[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{item[0]}</TableCell>
                                        <TableCell align="center">{item[1]}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <TableContainer component={Paper} maxWidth="10px" >
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Orders</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">PLACED</TableCell>
                                    <TableCell align="center">{stats.total}</TableCell>

                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">PENDING</TableCell>
                                    <TableCell align="center">{stats.total - stats.completed - stats.rejected}</TableCell>

                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">COMPLETED</TableCell>
                                    <TableCell align="center">{stats.completed}</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
        </ThemeProvider>
    );
};

export default VendorStats;