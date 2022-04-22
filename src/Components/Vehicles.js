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
import { Button} from '@mui/material';
import {Edit,Delete,Circle, CallMerge} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import Title from './Title';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {addVehicles,fetchVehicleDetails,editVehicles,fecthDrivers,mapping} from '../functions/vehicle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box';

const theme = createTheme({
  palette:{
      dark:'#222'
  }  
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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


export default function Vehicles({side}) {
  // add vehicle
  const [aopen, setAOpen] = React.useState(false);
  const handleAClickOpen = () => {
    setAOpen(true);
  };
  const handleAClose = () => {
    setAOpen(false);
  };
  // edit vehicle
  const [info,setInfo]=React.useState([])
  const [eopen, setEOpen] = React.useState(false);
   const [drivers,setDrivers] = React.useState([])
   const [mapid,setMapId] = React.useState('')
  const handleEClickOpen = (id) => {
    let selected = rows.filter(ele=>ele._id === id)
    setInfo(selected)
    setEOpen(true);
  };
  const handleEClose = () => {
    setEOpen(false);
  };
  //delete vehicle
  const [dopen, setDOpen] = React.useState(false);
  const handleDClickOpen = () => {
    setDOpen(true);
  };
  const handleDClose = () => {
    setDOpen(false);
  };
  //mapping vehicle
  const [mopen, setMOpen] = React.useState(false);
  const handleMClickOpen = async(id) => {
    let result = await fecthDrivers()
    setDrivers(result)
    setMapId(id)
    setMOpen(true);
  };
  const handleMClose = () => {
    setMOpen(false);
  };

  //add info
  const [v_name,setVname] = React.useState('')
  const [v_company,setVcompany] = React.useState('')
  const [v_type,setVtype] = React.useState('')
  const [v_rno,setVrno] = React.useState('')
  const [v_model,setVmodel] = React.useState('')
  const [p_range,setPrange] = React.useState('')
  const [g_range,setGrange] = React.useState('')
  const [v_cost,setVcost] = React.useState('')
  const [v_cat,setVcat] = React.useState('')

  
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [success,setSuccess] = React.useState(false)
  
 const [v_total,setVtotal] = React.useState(0)
 const [vm_total,setVMtotal] = React.useState(0)
 const [nvm_total,setNVMtotal] = React.useState(0)
 const [rows,setRows] = React.useState([])


 //edit details

 const mapDriver =async(e)=>{
   setLoading(true)
  e.preventDefault()
  const data = new FormData(e.currentTarget);
  let body={
    d_id:data.get('d_id'),
    v_id:mapid
  }
  let response = await mapping(body)
  if(response.error){
    setLoading(false)
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

 React.useEffect(()=>{
     async function fetchTotals(){
       let data = await fetchVehicleDetails()
       setVtotal(data.v_total)
       setVMtotal(data.vm_total)
       setNVMtotal(data.nvm_total)
       setRows(data.all_vehicles)
     }
     fetchTotals()
 },[])

 const editVehicle = async(e)=>{
  e.preventDefault()
  const data = new FormData(e.currentTarget);
  setLoading(true)
  let body={
    name:data.get('v_name'),
    company:data.get('v_company'),
    model:data.get('v_model'),
    r_no:data.get('r_no'),
    v_type:parseInt(data.get('v_type')),
    p_range:parseInt(data.get('p_range')),
    g_range:parseInt(data.get('g_range')),
    v_cost:parseFloat(data.get('v_cost')),
    category:data.get('v_cat') 
  }             
  let response = await editVehicles(body,info[0]._id)
  if(response.error){
    setLoading(false)
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
 
 const addVehicle = async()=>{
   setLoading(true)
   let array =[]
   let body = {
      name:v_name,
      company:v_company,
      model:v_model,
      r_no:v_rno,
      v_type:parseInt(v_type),
      p_range:parseInt(p_range),
      g_range:parseInt(g_range),
      v_cost:parseFloat(v_cost),
      category:v_cat  
   }
   array.push(body) 
   let response = await addVehicles(array)
   if(response.error){
     setLoading(false)
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
    <Grid container spacing={3}>
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 152,
        }}
      >
        <div style={{display:"flex",flexDirection:"column",gap:"1px",alignItems:"center",justifyContent:"center"}} >
        <Title>Total Vehicles</Title>
        <DirectionsCarIcon sx={{fontSize:60}} />
        <Typography variant='h6'>{v_total}</Typography>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 152,
        }}
      >
        <div style={{display:"flex",flexDirection:"column",gap:"0.25rem",alignItems:"center",justifyContent:"center"}}>
        <Title>Total Mapped Vehicles</Title>
        <ElectricCarIcon sx={{fontSize:60}} />
        <Typography variant='h6'>{vm_total}</Typography>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 152,
        }}
      >
      <div style={{display:"flex",flexDirection:"column",gap:"0.15rem",alignItems:"center",justifyContent:"center"}}>
      <Title>Total Unmapped Vehicles</Title>
      <CarRentalIcon sx={{fontSize:65}} />
      <Typography variant='h6'>{nvm_total}</Typography>
      </div>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleAClickOpen} style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222",marginLeft:"60rem"}}>Add Vehicle</Button>
      <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="right" >Status</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Mapping</StyledTableCell>
            <StyledTableCell align="right">edit</StyledTableCell>
            <StyledTableCell align="right">delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right"><Circle style={row.status==="Idle" && row.drivers === undefined?{color:"red"}:row.status==="Idle" && row.drivers !== undefined?{color:"yellow"}:{color:"green"}} /></StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.model}</StyledTableCell>
              <StyledTableCell align="right">{row.v_type}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>{handleMClickOpen(row._id)}} style={{color:"#222"}}><CallMerge/></Button></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>{handleEClickOpen(row._id)}} style={{color:"#222"}}><Edit /></Button></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={handleDClickOpen} style={{color:"#222"}} ><Delete /></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Paper>
    </Grid>

  {/* Dialoge for add Vehicle */}
        <Dialog
        fullScreen
        open={aopen}
        onClose={handleAClose}
        TransitionComponent={Transition}
      >
      <div className='a-dialog'> 
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
              Add vehicle
            </Typography>
            {
          success?(<>
            <Box sx={{ width: '60%',marginLeft:"6rem" }}>
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
          vehicle added successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
        }
          </Toolbar>
        </AppBar>
      <Grid container style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3rem"}}  spacing={5}>
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
        
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="name"
            name="v_name"
            label="vehicle name"
            fullWidth
            color="dark"
            value={v_name}
            onChange={(e)=>setVname(e.target.value)}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="comapny"
            name="v_company"
            label="vehicle comapny"
            fullWidth
            color="dark"
            value={v_company}
            onChange={(e)=>setVcompany(e.target.value)}
            autoComplete="comany-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="model"
            name="v_model"
            label="vehicle model"
            color="dark"
            value={v_model}
            onChange={(e)=>setVmodel(e.target.value)}
            fullWidth
            autoComplete="model"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="r_no"
            name="r_no"
            label="vehicle registration number"
            fullWidth
            color="dark"
            value={v_rno}
            onChange={(e)=>setVrno(e.target.value)}
            autoComplete="registration number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="category"
            name="category"
            label="vehicle category"
            fullWidth
            color="dark"
            value={v_cat}
            onChange={(e)=>setVcat(e.target.value)}
            autoComplete="category"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <FormControl variant="standard" fullWidth >
        <InputLabel id="demo-simple-select-standard-label">vehcile type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={v_type}
          color="dark"
          onChange={(e)=>{setVtype(e.target.value)}}
          label="vehicle type"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
        </Select>
         </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="p_range"
            name="p_rnage"
            label="passanger range"
            fullWidth
            color="dark"
            value={p_range}
            onChange={(e)=>setPrange(e.target.value)}
            autoComplete="p_range"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="g_range"
            name="g_range"
            label="goods range"
            fullWidth
            color="dark"
            value={g_range}
            onChange={(e)=>setGrange(e.target.value)}
            autoComplete="goods range"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="v_cost"
            name="v_cost"
            label="vehicle cost"
            fullWidth
            color="dark"
            value={v_cost}
            onChange={(e)=>setVcost(e.target.value)}
            autoComplete="vehicle cost"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <Button variant="contained" onClick={addVehicle} style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222"}}>Add Vehicle</Button>
        </Grid>
        </Grid>
      </div>   
      </Dialog>

  {/* dialog for edit Vehicle     */}
  {
    info.length?(<>
     <Dialog
        fullScreen
        open={eopen}
        onClose={handleEClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Vehicle
            </Typography>
            {
            success?(<>
            <Box sx={{ width: '60%',marginLeft:"6rem" }}>
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
          vehicle updated successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
        }
          </Toolbar>
        </AppBar>
      <Box component="form" validate={true} onSubmit={editVehicle} sx={{ mt: 1 }} >   
      <Grid container style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3rem"}}  spacing={5}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="name"
            name="v_name"
            label="vehicle name"
            color="dark"
            fullWidth
            autoFocus={true}
            defaultValue={info[0].name}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="comapny"
            name="v_company"
            label="vehicle comapny"
            fullWidth
            color="dark"
            defaultValue={info[0].company}
            autoComplete="comany-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="model"
            name="v_model"
            label="vehicle model"
            defaultValue={info[0].model}
            color="dark"
            fullWidth
            autoComplete="model"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="r_no"
            name="r_no"
            label="vehicle registration number"
            fullWidth
            color="dark"
            defaultValue={info[0].r_no}
            autoComplete="registration number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="category"
            name="v_cat" 
            label="vehicle category"
            fullWidth
            color="dark"
            defaultValue={info[0].category}
            autoComplete="category"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <FormControl variant="standard" fullWidth >
        <InputLabel id="demo-simple-select-standard-label">vehcile type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          defaultValue={info[0].v_type}
          color="dark"
          label="vehicle type"
          name='v_type'
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
        </Select>
         </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="p_range"
            name="p_range"
            label="passanger range"
            fullWidth
            color="dark"
            defaultValue={info[0].p_range}
            autoComplete="p_range"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="g_range"
            name="g_range"
            label="goods range"
            color="dark"
            fullWidth
            defaultValue={info[0].g_range}
            autoComplete="goods range"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="v_cost"
            name="v_cost"
            label="vehicle cost"
            fullWidth
            color="dark"
            defaultValue={info[0].v_cost}
            autoComplete="vehicle cost"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <Button variant="contained" type="submit" style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222"}}>update</Button>
        </Grid>
      </Grid>
      </Box>
      </Dialog>
    </>):null
  }

  {/* delete vehicles */}
  <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to Delete this vehicle?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color:'#222'}} onClick={handleDClose}>no</Button>
          <Button style={{color:'#222'}}>yes</Button>
        </DialogActions>
      </Dialog>


  {/* dialog for Mapping */}
  {
    drivers.length?(<>
      <Dialog
        fullScreen
        open={mopen}
        onClose={handleMClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Mapping Driver
            </Typography>
            {
            success?(<>
            <Box sx={{ width: '60%',marginLeft:"6rem" }}>
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
          vehicle updated successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
        }
          </Toolbar>
        </AppBar>
        <Box component="form" validate={true} onSubmit={mapDriver} sx={{ mt: 1 }} > 
        <Grid container style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3rem"}}  spacing={5}>
          <Grid item xs={12} sm={8}>
        <FormControl variant="standard" fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Driver details</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          color="dark"
          label="Driver details"
          name="d_id"
        >
          {
            drivers.map(d=>(
              <MenuItem value={d._id}>{`${d.name} - ${d.location}`}</MenuItem>
            ))
          }
        </Select>
         </FormControl>
        </Grid>
        <Button variant="contained" type="submit" style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222"}}>Map</Button>
        </Grid> 
        </Box> 
      </Dialog>
    </>):(<alert>no driver for mapping</alert>)
  }
  </Grid>
  </ThemeProvider>
  )
}
