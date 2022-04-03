import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = (props) => {
  const [managerName, setmanagerName] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactNumber] = useState(null);
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");

  const onChangemanagerName = (event) => {
    setmanagerName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };


  const resetInputs = () => {
    setmanagerName("");
    setEmail("");
    setContactNumber(null);
    setShopName("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      managerName: managerName,
      email: email,
      contactnumber: contactnumber,
      shopName: shopName,
      password: password,
      type: "2"
    };

    axios
      .post("http://localhost:4000/vendor/signup", newUser)
      .then((response) => {
        alert("Created\t" + response.data.managerName);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Manager Name"
          variant="outlined"
          value={managerName}
          onChange={onChangemanagerName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contactnumber}
          onChange={onChangeContactNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopName}
          onChange={onChangeShopName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
