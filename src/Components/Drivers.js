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

function createData(status,name, type, model,m_id, e_id,d_id) {
  return { status,name,type, model,m_id, e_id,d_id };
}
const rows = [
  createData('yellow','Maruthi 800', 1, '2017-DM','id', 'id','id'),
  createData('red','Maruthi 800', 1, '2017-DM','id', 'id','id'),
  createData('green','Maruthi 800', 1, '2017-DM','id', 'id','id'),
  createData('yellow','Maruthi 800', 1, '2017-DM','id', 'id','id'),
  createData('yellow','Maruthi 800', 1, '2017-DM','id', 'id','id'),
  createData('green','Maruthi 800', 1, '2017-DM','id', 'id','id'),
];
export default function Drivers({side}) {
  // add vehicle
  const [aopen, setAOpen] = React.useState(false);
  const handleAClickOpen = () => {
    setAOpen(true);
  };
  const handleAClose = () => {
    setAOpen(false);
  };
  // edit vehicle
  const [eopen, setEOpen] = React.useState(false);
  const handleEClickOpen = () => {
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
  const handleMClickOpen = () => {
    setMOpen(true);
  };
  const handleMClose = () => {
    setMOpen(false);
  };
  return (
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
        <div style={{display:"flex",flexDirection:"column",gap:"0.2rem",alignItems:"center",justifyContent:"center"}} >
        <Title>Total Vehicles</Title>
        <DirectionsCarIcon sx={{fontSize:60}} />
        <Typography variant='h6'>25</Typography>
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
        <div style={{display:"flex",flexDirection:"column",gap:"0.2rem",alignItems:"center",justifyContent:"center"}}>
        <Title>Total Mapped Vehicles</Title>
        <ElectricCarIcon sx={{fontSize:60}} />
        <Typography variant='h6'>19</Typography>
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
      <div style={{display:"flex",flexDirection:"column",gap:"0.2rem",alignItems:"center",justifyContent:"center"}}>
      <Title>Total Unmapped Vehicles</Title>
      <CarRentalIcon sx={{fontSize:60}} />
      <Typography variant='h6'>6</Typography>
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
              <StyledTableCell align="right"><Circle style={row.status==="red"?{color:"red"}:row.status ==="yellow"?{color:"yellow"}:{color:"green"}} /></StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.model}</StyledTableCell>
              <StyledTableCell align="right">{row.type}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={handleMClickOpen} style={{color:"#222"}}><CallMerge/></Button></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={handleEClickOpen} style={{color:"#222"}}><Edit /></Button></StyledTableCell>
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
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'relative' }}>
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
            <Button autoFocus color="inherit" onClick={handleAClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

      </Dialog>

  {/* dialog for edit Vehicle     */}
  <Dialog
        fullScreen
        open={eopen}
        onClose={handleEClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'relative' }}>
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
            <Button autoFocus color="inherit" onClick={handleEClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

      </Dialog>

  {/* dialog for delete vehcile     */}
  <Dialog
        fullScreen
        open={dopen}
        onClose={handleDClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"red"}} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Delete Vehicle
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

      </Dialog>

  {/* dialog for Mapping */}
  <Dialog
        fullScreen
        open={mopen}
        onClose={handleMClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'relative' }}>
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
            <Button autoFocus color="inherit" onClick={handleMClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
  </Grid>
  )
}
