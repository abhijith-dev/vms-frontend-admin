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
import { bookingDetails } from '../functions/general';

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
const rows=[]
export default function Bookings() {
  const [rows,setRows] = React.useState([])
  React.useEffect(()=>{
     async function fetch(){
       let bookings = await bookingDetails()
       setRows(bookings)
     }
     fetch()
  },[])
  return (
    <Grid item xs={12}>
    <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">From</StyledTableCell>
          <StyledTableCell align="center">To</StyledTableCell>
          <StyledTableCell align="center">Amount</StyledTableCell>
          <StyledTableCell align="center">Customer</StyledTableCell>
          <StyledTableCell align="center">Date</StyledTableCell>
          <StyledTableCell align="center">Status</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell align="center">{row.from}</StyledTableCell>
            <StyledTableCell align="center">{row.to}</StyledTableCell>
            <StyledTableCell align="center">{row.amount} ETH</StyledTableCell>
            <StyledTableCell align="center">{row.user}</StyledTableCell>
            <StyledTableCell align="center">{(row.date).split("GMT")[0]}</StyledTableCell>
            <StyledTableCell align="center">{row.transaction === null?'On Raid':'Completed'}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Paper>
  </Grid>
  )
}
