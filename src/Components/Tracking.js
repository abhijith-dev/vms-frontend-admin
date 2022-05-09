import React from 'react'
import ReactMapGL, { Marker,Popup } from 'react-map-gl'
import {fetchVehicleAllDetailsToTrack,fetchCordsByBookingId} from '../functions/general'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

export default function Tracking() {
  const [bookedVehicles,setBookedVehiles] = React.useState([])
  const [from,setFrom] = React.useState({})
  const [to,setTo] = React.useState({})
  const [fp,setFp] = React.useState(false)
  const [tp,setTp] = React.useState(false)
  React.useEffect(()=>{
    async function fetch(){
       let data = await fetchVehicleAllDetailsToTrack()
       setBookedVehiles(data)
    }
    fetch()
  },[])
  const trackVehicle =async(event)=>{
     let b_id = event.target.value
     let trackingData = await fetchCordsByBookingId(b_id)
     setFrom(trackingData.fromData)
     setTo(trackingData.toData)
     setViewPort({
      latitude:trackingData.fromData.center[1],
      longitude:trackingData.fromData.center[0],
      width:'90vw',
      height:'60vh',
      zoom:8
  })
  }
  const [viewport,setViewPort]=React.useState({
    latitude:12.9141,
    longitude:74.8560,
    width:'90vw',
    height:'60vh',
    zoom:5
})
  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [74.8560, 12.9141],
        [74.7421, 13.3409]
      ]
    }
  };
  return (
    <>
    <Grid item xs={12} sm={8}>
        <FormControl  variant="standard" fullWidth >
        <InputLabel   id="demo-simple-select-standard-label">vehcile</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="vehicle"
          label="vehicle type"
          fullWidth
          onChange={trackVehicle}
        >
          {
            bookedVehicles.map(booking=>(
              <MenuItem value={booking._id}>{`${booking.vehicle.name}-${booking.vehicle.company}-${booking.vehicle.model}`}</MenuItem>
            ))
          }
        </Select>
         </FormControl>
      </Grid>

    <div style={{marginTop:"2rem"}}>
    <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={'pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNsMmYwcmIxMTA1OG8zY2tqb2JxcHo3ZW4ifQ.pl19WslBezjZrbCDHt7P4g'}
      onViewportChange={(viewport)=>{setViewPort(viewport)}}
      mapStyle={'mapbox://styles/mapbox/streets-v11'}
      >
        {
          Object.keys(from).length ? (
          <Marker
          latitude={from.geometry.coordinates[1]}
          longitude={from.geometry.coordinates[0]}
          >
          <img onClick={()=>{setFp(true)}} style={{ width: "40px", height: "40px" }} src=" https://img.icons8.com/color/48/000000/marker.png" />
        </Marker> 
        ):null
        }
        {
          Object.keys(to).length?(
          <Marker
          latitude={to.geometry.coordinates[1]}
          longitude={to.geometry.coordinates[0]}
          >
          <img onClick={()=>{setTp(true)}} style={{ width: "40px", height: "40px" }} src=" https://img.icons8.com/color/48/000000/marker.png" />
        </Marker> 
          ):null
        }
       {
         fp && (<> 
            <Popup
             latitude={from.geometry.coordinates[1]}
             longitude={from.geometry.coordinates[0]}
             onClose={()=>{setFp(false)}}         
            >
            <h4>From : {from.place_name}</h4>
            <p>Code: {(from.context[1].short_code)?from.context[1].short_code:'IN'}</p>
            </Popup>
         </>)
       }
              {
         tp && (<> 
            <Popup
            latitude={to.geometry.coordinates[1]}
            longitude={to.geometry.coordinates[0]}
            onClose={()=>{setTp(false)}}
            >
            <h4>From : {to.place_name}</h4>
            <p>Code: {(to.context[1].short_code)?to.context[1].short_code:'IN'}</p>
            </Popup>
         </>)
       }
    </ReactMapGL>
    </div>
    </>
  )
}
