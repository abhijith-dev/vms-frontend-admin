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
import {Edit,Delete} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import Title from './Title';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Person,PersonAdd,PersonAddDisabled} from '@mui/icons-material'
import { TextField } from '@mui/material';
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
import {addDrivers,fetchDriversDetails,deleteDrivers,editDrivers} from '../functions/driver'
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


export default function Drivers({side}) {
  // add driver
  const [aopen, setAOpen] = React.useState(false);
  const handleAClickOpen = () => {
    setAOpen(true);
  };
  const handleAClose = () => {
    setAOpen(false);
  };
  // edit driver
  const [info,setInfo]=React.useState([])
  const [eopen, setEOpen] = React.useState(false);
  const [id,setId] =React.useState('')
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
  const handleDClickOpen = (id) => {
    setId(id)
    setDOpen(true);
  };
  const handleDClose = () => {
    setDOpen(false);
  };
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [success,setSuccess] = React.useState(false)
 const [d_total,setDtotal] = React.useState(0)
 const [dm_total,setDMtotal] = React.useState(0)
 const [ndm_total,setNDMtotal] = React.useState(0)
 const [rows,setRows] = React.useState([])

 React.useEffect(()=>{
     async function fetchTotals(){
       let data = await fetchDriversDetails()
       setDtotal(data.d_total)
       setDMtotal(data.dm_total)
       setNDMtotal(data.ndm_total)
       setRows(data.all_drivers)
     }
     fetchTotals()
 },[])

const [files,setFiles] = React.useState('')
const addDriver =async(e)=>{
  e.preventDefault()
  setLoading(true)
  const data = new FormData(e.currentTarget);
    let body = {
      name: data.get('d_name'),
      phone : data.get('d_phone'),
      age : data.get('d_age'),
      license:data.get('d_license'),
      location:data.get('d_loc'),
      experience:data.get('d_exp'),
    }
    let response = await addDrivers(body,files)
    if(response.error){
      setFiles('')
      setLoading(false)
      setError(true)
      setErrorMessage(response.message)
    }
    else{
    setFiles('')
     setLoading(false)
     setError(false)
     setErrorMessage('')
     setSuccess(true)
    }
}
const deleteDriver = async()=>{
   await deleteDrivers(id)
   setId('')
   setDOpen(false);
}

const editDriver = async(e)=>{
  e.preventDefault()
  const data = new FormData(e.currentTarget);
    let body = {
      name: data.get('d_name'),
      phone : data.get('d_phone'),
      age : data.get('d_age'),
      license:data.get('d_license'),
      location:data.get('d_loc'),
      experience:data.get('d_exp'),
    }
    let response = await editDrivers(body,files,info[0]._id)
    if(response.error){
      setFiles('')
      setLoading(false)
      setError(true)
      setErrorMessage(response.message)
    }
    else{
    setFiles('')
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
        <Title>Total Drivers</Title>
        <Person sx={{fontSize:60}} />
        <Typography variant='h6'>{d_total}</Typography>
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
        <Title>Total Mapped Drivers</Title>
        <PersonAdd sx={{fontSize:60}} />
        <Typography variant='h6'>{dm_total}</Typography>
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
      <Title>Total Unmapped Drivers</Title>
      <PersonAddDisabled sx={{fontSize:65}} />
      <Typography variant='h6'>{ndm_total}</Typography>
      </div>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleAClickOpen} style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222",marginLeft:"60rem"}}>Add Driver</Button>
      <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center" >Image</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">edit</StyledTableCell>
            <StyledTableCell align="center">delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="center"><img src={row.picture} alt="pp" style={{borderRadius:"50%"}} width={50} height={50} /></StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.age}</StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{handleEClickOpen(row._id)}} style={{color:"#222"}}><Edit /></Button></StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{handleDClickOpen(row._id)}} style={{color:"#222"}} ><Delete /></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Paper>
    </Grid>

  {/* Dialoge for add driver */}
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
              Add Drivers
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
          driver added successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
    }
          </Toolbar>
        </AppBar>
      <Box component="form" validate={true} onSubmit={addDriver} sx={{ mt: 1 }} >  
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
            name="d_name"
            label="driver name"
            fullWidth
            color="dark"
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="age"
            name="d_age"
            label="driver age"
            fullWidth
            color="dark"
            autoComplete="age"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="phone"
            name="d_phone"
            label="driver phone number"
            color="dark"
            fullWidth
            autoComplete="phone"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="exp"
            name="d_exp"
            label="driver experince (in years)"
            fullWidth
            color="dark"
            autoComplete="experince"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="license"
            name="d_license"
            label="driver license number"
            fullWidth
            color="dark"
            autoComplete="license"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="location"
            name="d_loc"
            label="driver location"
            fullWidth
            color="dark"
            autoComplete="location"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={(e)=>{setFiles(e.target.files[0])}}
            label="driver phtoto"
            fullWidth
            color="dark"
            autoComplete="file"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
        <Button type={"submit"} variant="contained" style={side?{backgroundColor:"#222",marginLeft:"35rem"}:{backgroundColor:"#222"}}>Add Driver</Button>
        </Grid>
        </Grid>
        </Box>
      </div>   
      </Dialog>










  {/* dialog for edit driver     */}
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
              Edit Drivers
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
          driver updated successfully
        </Alert>
      </Collapse>
    </Box>
          </>):null
    }
          </Toolbar>
        </AppBar>
        <Box component="form" validate={true} onSubmit={editDriver} sx={{ mt: 1 }} >   
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
            name="d_name"
            label="driver name"
            fullWidth
            defaultValue={info[0].name}
            color="dark"
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="age"
            name="d_age"
            defaultValue={info[0].age}
            label="driver age"
            fullWidth
            color="dark"
            autoComplete="age"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="phone"
            name="d_phone"
            defaultValue={info[0].phone}
            label="driver phone number"
            color="dark"
            fullWidth
            autoComplete="phone"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="exp"
            name="d_exp"
            defaultValue={info[0].experience}
            label="driver experince (in years)"
            fullWidth
            color="dark"
            autoComplete="experince"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="license"
            name="d_license"
            defaultValue={info[0].license}
            label="driver license number"
            fullWidth
            color="dark"
            autoComplete="license"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="location"
            name="d_loc"
            defaultValue={info[0].location}
            label="driver location"
            fullWidth
            color="dark"
            autoComplete="location"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={(e)=>{setFiles(e.target.files[0])}}
            label="driver phtoto"
            fullWidth
            color="dark"
            autoComplete="file"
            variant="standard"
            required={false}
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
          <Button style={{color:'#222'}} onClick={deleteDriver}>yes</Button>
        </DialogActions>
      </Dialog>
  </Grid>
  </ThemeProvider>
  )
}
