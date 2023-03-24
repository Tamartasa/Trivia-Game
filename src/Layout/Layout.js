import { Outlet, NavLink, useLocation } from "react-router-dom"
import { MenuItem, Toolbar } from "@mui/material";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';



export default function Layout() {

  const currLocation = useLocation()
  console.log('Layout:', currLocation)

  const backgroundImage = "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg"

  let activeStyle = {
      textDecoration: "underline",
      color: 'white',
    };
    
  return (

  <Box>
            <AppBar position="static" sx={{ bgcolor: '#5F9EA0', color: 'white' }}>
                <Toolbar variant="dense">
                <MenuItem>
                    <NavLink to='/' className='nav-link' 
                        style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                      }
                                      >GAME
                    </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink to='settings/'
                            className='nav-link'
                            style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                      }>SETTINGS
                    </NavLink>
                </MenuItem>
                
                </Toolbar>
            </AppBar>
                <Outlet />
            </Box>
    
    )
}
