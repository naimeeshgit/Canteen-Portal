import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = (props) => {


    const [getBalance, setGetBalance] = useState(0)

    useEffect(() => {

        const checkbal = {
            id: localStorage.getItem('id'),
            email: localStorage.getItem('email'),
        };


        axios
            .post("http://localhost:4000/buyer/checkbalance", checkbal)
            .then((response) => {
                console.log(response.data);
                // return response.data.wallet;
                setGetBalance(response.data.wallet)
            });

    }, []);

    const [wallet, setMoney] = useState(0);
    const onAddmoney = (event) => {
        setMoney(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const Money = {
            id: localStorage.getItem("id"),
            email: localStorage.getItem('email'),
            wallet: wallet,
        };

        axios
            .post("http://localhost:4000/buyer/addmoney", Money)
            .then((response) => {
                alert("Added \t" + wallet + "\t Rupees into your account");
                console.log(response.data);
                setGetBalance(Number(getBalance) + Number(wallet));
                

            });
        changeBool();
    };

    const Reset = (event) => {
        setMoney(0);
        changeBool();
    }

    const [bool, setBool] = useState(true);
    const changeBool = () => {
        setBool(!bool);
        console.log(bool);
    };


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Balance"
                    variant="outlined"
                    value={getBalance}
                    disabled
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Wallet"
                    variant="outlined"
                    value={wallet}
                    disabled={bool}
                    onChange={onAddmoney}

                />
            </Grid>



            <Grid item xs={12}>
                <Button style={{ marginRight: "16px" }} variant="contained" onClick={Reset}>
                    Add Money
                </Button>
                <Button variant="contained" onClick={onSubmit}>
                    Done
                </Button>
            </Grid>
        </Grid>
    );
};

export default Register;



