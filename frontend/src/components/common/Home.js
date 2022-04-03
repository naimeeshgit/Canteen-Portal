import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';



const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Home page");
  }, []);

  return  ( <Box
  sx={{
    backgroundImage: 'url(https://loremflickr.com/800/600/food)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    height: 1300,
    backgroundPosition: 'center',
  }}
>
  <div style={{ textAlign: "center" }}>
    </div>

  </Box>
  );
};

// const Home = (props) => {

       // }

export default Home;



