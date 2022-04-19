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
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


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
export default function Fuel({side}) {
  const [aopen, setAOpen] = React.useState(false);
  const handleAClickOpen = () => {
    setAOpen(true);
  };
  const handleAClose = () => {
    setAOpen(false);
  };
  return (
    <Grid item xs={12}>
    <Button variant="contained" onClick={handleAClickOpen} style={side?{backgroundColor:"#222",marginLeft:"50rem"}:{backgroundColor:"#222",marginLeft:"60rem"}}>Add Fuel</Button>  
    <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="right">Name</StyledTableCell>
          <StyledTableCell align="right">Model</StyledTableCell>
          <StyledTableCell align="right">Type</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell align="right">{row.name}</StyledTableCell>
            <StyledTableCell align="right">{row.model}</StyledTableCell>
            <StyledTableCell align="right">{row.type}</StyledTableCell>
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
              Add Fuel
            </Typography>
            <Button autoFocus color="inherit" onClick={handleAClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

      </Dialog>
  </Grid>
  )
}