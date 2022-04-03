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
  
  const onChangeUsername = (event) => {
    // setName(event.target.value);
    setUser({
      ...user,
      name: event.target.value,
    })
  };

  // const onChangeEmail = (event) => {
  //   setEmail(event.target.value);
  // };

  const onChangeContactNumber = (event) => {
    
    setUser({
      ...user,
      contactnumber: event.target.value,
    })
  };

  const onChangeAge = (event) => {
    setUser({
      ...user,
      age: event.target.value,
    })
  };

  const onChangeBatchName = (event) => {
    setUser({
      ...user,
      batchName: event.target.value,
    })
  };

  const onChangePassword = (event) => {
    setUser({
      ...user,
      password: event.target.value,
    })
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: user.name,
      email: user.email,
      contactnumber: user.contactnumber,
      age: user.age,
      batchName: user.batchName,
      password: user.password,
      type: 1

    };

    console.log(newUser);

    axios
      .put("http://localhost:4000/buyer/edit", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        localStorage.setItem("name", response.data.name);
        // localStorage.setItem("email", response.data.email);
        localStorage.setItem("contactnumber", response.data.contactnumber);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("batchName", response.data.batchName);
        localStorage.setItem("password", response.data.password);
        // localStorage.setItem("type", response.data.type);
        setBool(!bool); 


        console.log(response.data);
      });
  };

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool); 
    console.log(bool);
  };

  const [user,setUser] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    contactnumber: localStorage.getItem('contactnumber'),
    age: localStorage.getItem('age'),
    batchName: localStorage.getItem('batchName'),
    password: localStorage.getItem('password'),

  });

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField label="Name"
          variant="outlined"
          value={user.name}
          onChange={onChangeUsername}
          disabled={bool}
        >

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email"
          variant="outlined"
          value={localStorage.getItem("email")}
          disabled
        >
        </TextField>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={user.contactnumber}
          onChange={onChangeContactNumber}
          disabled={bool}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={user.age}
          onChange={onChangeAge}
          disabled={bool}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 235 }}>
          <InputLabel id="demo-simple-select-label">Batch Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.batchName}
            label="Batch Name"
            onChange={onChangeBatchName}
            disabled={bool}
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
          onChange={onChangePassword}
          disabled
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
  );
};

export default Register;



