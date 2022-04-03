import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Route } from 'react-router-dom';
import SignUp from './SignUp';
import axios from "axios";


const theme = createTheme();

export default function SignInSide() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleemail = (e) => {
    setEmail(e.target.value);
  }
  const handlepassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = (event) => {

    event.preventDefault();
    // console.log(email, password);
    // const data = new FormData(event.CurrentTarget);
    const UserLogin = {
      id: "",
      name: "",
      email: email,
      contactnumber: "",
      age: "",
      batchName: "",
      password: password,
      type: 0,
      managerName: "",
      shopName: "",
    };

    //localStorage.setItem("user", JSON.stringify(UserLogin));

    

    
        
    // localStorage.setItem("password", password);
    localStorage.setItem('type', 0);
    console.log(UserLogin);

    // console.log(email);
    // console.log(password);

    // localStorage.setItem("email", email);
    // localStorage.setItem("password", password);

    axios
      .post("http://localhost:4000/buyer/login", UserLogin)
      .then((response) => {
       

        if(response.data.type === 1){
        // localStorage.setItem('email', email);
        localStorage.setItem('type', response.data.type);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('batchName', response.data.batchName);
        localStorage.setItem('contactnumber', response.data.contactnumber);
        localStorage.setItem('age', response.data.age);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('password', response.data.password);
        window.location.href = "/profile";
        }
        else if(response.data.type === 2){
          localStorage.setItem('type', response.data.type);
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('managerName', response.data.managerName);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('contactnumber', response.data.contactnumber);
          localStorage.setItem('shopName', response.data.shopName);
          localStorage.setItem('password', response.data.password);
          window.location.href = "/profileV";
        }
       

      });
      
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleemail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlepassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/SignUp" variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}