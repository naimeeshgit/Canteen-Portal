import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Register = (props) => {
  
  const onChangemanagerName = (event) => {
    // setName(event.target.value);
    setUser({
      ...user,
        managerName: event.target.value,
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

   const onshopName = (event) => {
    
    setUser({
        ...user,
        shopName: event.target.value,
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
      managerName: user.managerName,
      email: user.email,
      contactnumber: user.contactnumber,
      shopName: user.shopName,
      password: user.password,
      type: 2

    };

    console.log(newUser);

    axios
      .put("http://localhost:4000/vendor/edit", newUser)
      .then((response) => {
        alert("Created\t" + response.data.managerName);
        localStorage.setItem("managerName", response.data.managerName);
        // localStorage.setItem("email", response.data.email);
        localStorage.setItem("contactnumber", response.data.contactnumber);
        localStorage.setItem("shopName", response.data.shopName);
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
    managerName: localStorage.getItem("managerName"),
    email: localStorage.getItem('email'),
    contactnumber: localStorage.getItem('contactnumber'),
    shopName: localStorage.getItem('shopName'),
    password: localStorage.getItem('password'),
  });

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField label="Manager Name"
          variant="outlined"
          value={user.managerName}
          onChange={onChangemanagerName}
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
            label="Shop Name"
            variant="outlined"
            value={user.shopName}
            onChange={onshopName}
            disabled={bool}
            />
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



