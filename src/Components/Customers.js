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
import {customerDetails} from '../functions/general';

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


export default function Customers() {
  const [rows,setRows] = React.useState([])
  React.useEffect(()=>{
     async function loadCustomer(){
      let data = await customerDetails()
      setRows(data)
     }
     loadCustomer()
  },[])
  return (
    <Grid item xs={12}>
    <Paper style={{marginTop:"1rem"}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 600 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell align="center">Id</StyledTableCell>
          <StyledTableCell align="center">Name</StyledTableCell>
          <StyledTableCell align="center">Email</StyledTableCell>
          <StyledTableCell align="center">City</StyledTableCell>
          <StyledTableCell align="center">phone number</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell align="center">{row._id}</StyledTableCell>
            <StyledTableCell align="center">{row.name}</StyledTableCell>
            <StyledTableCell align="center">{row.email}</StyledTableCell>
            <StyledTableCell align="center">{row.city}</StyledTableCell>
            <StyledTableCell align="center">{row.phone}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Paper>
  </Grid>
  )
}
