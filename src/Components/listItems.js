import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import {House,DriveEta,Person,Assignment,GasMeter,LocationOn} from '@mui/icons-material'

export default function MainListItems({page,setPage}){
   return (
    <React.Fragment>
    <ListItemButton style={page===1?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(1)}} >
      <ListItemIcon>
        <House />
      </ListItemIcon>
      <ListItemText primary="Home"/>
    </ListItemButton>
    <ListItemButton style={page===2?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(2)}}>
      <ListItemIcon>
        <DriveEta />
      </ListItemIcon>
      <ListItemText primary="Vehicles" />
    </ListItemButton>
    <ListItemButton style={page===3?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(3)}}>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Drivers" />
    </ListItemButton>
    <ListItemButton style={page===4?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(4)}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton style={page===5?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(5)}}>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Bookings" />
    </ListItemButton>
    <ListItemButton style={page===6?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(6)}}>
      <ListItemIcon>
        <GasMeter />
      </ListItemIcon>
      <ListItemText primary="Fuels" />
    </ListItemButton>
   <ListItemButton style={page===7?{backgroundColor:"#0002"}:null} onClick={()=>{setPage(7)}} >
      <ListItemIcon>
        <LocationOn />
      </ListItemIcon>
      <ListItemText primary="Tracking" />
    </ListItemButton>
  </React.Fragment>
   )
};