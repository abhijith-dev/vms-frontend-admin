import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Title from './Title';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField,Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {fuelDetails,fetchVehicleAllDetails,addFuels} from '../functions/general';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const theme = createTheme({
  palette:{
      dark:'#222'
  }  
});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Fuel({side}) {
  const [aopen, setAOpen] = React.useState(false);
  const [rows,setRows] = React.useState([]);
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [success,setSuccess] = React.useState(false)
  const [vehicleList,setVehicleList] = React.useState([])
  React.useEffect(()=>{
    async function fetch(){
      let fuel = await fuelDetails()
       setRows(fuel)
      let vehicles = await fetchVehicleAllDetails()
      setVehicleList(vehicles) 
    }
    fetch()
  },[])
   const handleAClickOpen = () => {
    setAOpen(true);
  };
  const handleAClose = () => {
    setAOpen(false);
  };
  const addFuel =async(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    let body = {
      v_id: data.get('vehicle'),
      cat : data.get('f_type'),
      fuel : parseInt(data.get('fuel'))
    }
    let response = await addFuels(body)
    if(response.error){
      setLoading(true)
      setError(true)
      setErrorMessage(response.message)
    }
    else{
     setLoading(false)
     setError(false)
     setErrorMessage('')
     setSuccess(true)
    }
  }
  return (
    <ThemeProvider theme={theme}>
    <Grid item xs={12}>
    <Button variant="contained" onClick={handleAClickOpen} style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222",marginLeft:"60rem"}}>Add Fuel</Button>  
    <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Vehicle</StyledTableCell>
          <StyledTableCell align="center">Fuel Type</StyledTableCell>
          <StyledTableCell align="center">Fuel Used</StyledTableCell>
          <StyledTableCell align="center">Amount Used</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell align="center">{(row._id)}</StyledTableCell>
            <StyledTableCell align="center">{row.f_type}</StyledTableCell>
            <StyledTableCell align="center">{row.used} ltr</StyledTableCell>
            <StyledTableCell align="center">{parseFloat(row.amount).toFixed(5)} ETH</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Paper>
    
    <Dialog
        fullScreen
        open={aopen}
        onClose={handleAClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleAClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Fuel
            </Typography>
        {
            success?(<>
            <Box sx={{ width: '60%',marginLeft:'6rem' }}>
      <Collapse in={success}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         fuel added successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
    }
          </Toolbar>
        </AppBar>
        <Box component="form" validate={true} onSubmit={addFuel} sx={{ mt: 1 }} >  
      <Grid container style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"6rem"}}  spacing={5}>
      {
          loading?(
            <>
              <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
             < CircularProgress color="inherit" />
             </Backdrop>
            </>
          ):null
        } 
        {
                error?
                (
                    <><Alert severity="error">{errormessage}</Alert></>
                ):null
        }
       <Grid item xs={12} sm={8}>
        <FormControl color='dark' variant="standard" fullWidth >
        <InputLabel  color='dark'  id="demo-simple-select-standard-label">vehcile</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="vehicle"
          label="vehicle type"
          fullWidth
          color='dark'
        >
          {
            vehicleList.map(vehicle=>(
              <MenuItem value={vehicle._id}>{`${vehicle.name}-${vehicle.company}-${vehicle.model}`}</MenuItem>
            ))
          }
        </Select>
         </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="f_type"
            name="f_type"
            label="fuel type"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            color='dark'
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="fuel"
            name="fuel"
            label="fuel(in liter)"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            color='dark'
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <Button type={"submit"} variant="contained" style={side?{backgroundColor:"#222",marginLeft:"35rem"}:{backgroundColor:"#222"}}>Add Fuel</Button>
        </Grid>
        </Grid>
        </Box>
      </Dialog>
  </Grid>
  </ThemeProvider>
  )
}