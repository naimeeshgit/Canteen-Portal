import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import ls from "local-storage";
const ls = localStorage

  function refreshPage() {
    window.location.reload(false);
    localStorage.clear()
    window.location = "/"
  }


const Navbar = () => {
  const navigate = useNavigate();

  // console.log(localStorage.length)

  if (localStorage.getItem('type') == 1) {


    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Button color="inherit" onClick={() => navigate("/users")}>
              Users
            </Button> */}
            {/* <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button> */}

            {/* if localstorage.type == 1 => diff navbar*/}
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>
              DashBoard
            </Button>
            <Button color="inherit" onClick={() => navigate("/favorites")}>
              Favorites
            </Button>
            <Button color="inherit" onClick={() => navigate("/wallet")}>
              Wallet
            </Button>
            <Button color="inherit" onClick={() => navigate("/BMyorder")}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/BuyerMenu")}>
              Menu
            </Button>
            <Button color="inherit" onClick = {refreshPage}>
              Sign Out
            </Button>

            

            {/* <Button color="inherit" onClick={() => navigate("/SignUp")}>
              SignUp
            </Button>
            <Button color="inherit" onClick={() => navigate("/SignIn")}>
              SignIn
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    );



  }

  if (localStorage.getItem('type') == 2) {


    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
      
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/FoodItemV")}>
            Food Menu DashBoard
          </Button>
          <Button color="inherit" onClick={() => navigate("/VenviewOrder")}>
            View orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/statistics")}>
            Statistics
          </Button>
          <Button color="inherit" onClick = {refreshPage}>
            Sign Out
          </Button>

          

          {/* <Button color="inherit" onClick={() => navigate("/SignUp")}>
            SignUp
          </Button>
          <Button color="inherit" onClick={() => navigate("/SignIn")}>
            SignIn
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
    );

  }

  else {


    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}
            {/* <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button> */}

            {/* if localstorage.type == 1 => diff navbar*/}




            {/* <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button> */}
            <Button color="inherit" onClick={() => navigate("/SignUp")}>
              SignUp
            </Button>
            <Button color="inherit" onClick={() => navigate("/SignIn")}>
              SignIn
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

  }

}
export default Navbar;
