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
export default function Bookings() {
  return (
    <Grid item xs={12}>
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
  </Grid>
  )
}
