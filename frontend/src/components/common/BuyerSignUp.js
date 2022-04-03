import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setcontactnumber] = useState(null);
  const [age, setAge] = useState(null);
  const [batchName, setBatchName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContactNumber = (event) => {
    setcontactnumber(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatchName = (event) => {
    setBatchName(event.target.value);
  };
  
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setcontactnumber(null);
    setAge(null);
    setBatchName("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      contactnumber: contactnumber,
      age: age,
      batchName: batchName,
      password: password,
      wallet: 0,
      type: 1

    };

    axios
      .post("http://localhost:4000/buyer/signup", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
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
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{m:1, minWidth:235}}>
          <InputLabel id="demo-simple-select-label">Batch Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={batchName}
            label="Batch Name"
            onChange={onChangeBatchName}
          >
            <MenuItem value={10}>UG-1</MenuItem>
            <MenuItem value={20}>UG-2</MenuItem>
            <MenuItem value={30}>UG-3</MenuItem>
            <MenuItem value={40}>UG-4</MenuItem>
            <MenuItem value={50}>PG-1</MenuItem>
            <MenuItem value={60}>PG-2</MenuItem>
            <MenuItem value={70}>PhD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          SignUp
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;



