import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { loadOrder } from '../functions/general';
import { Typography } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows,setRows] = React.useState([])

  React.useEffect(()=>{
    async function fetchOrder(){
      let response = await loadOrder()
      if(response.error){
         alert(response.data)
      }
      else{
        setRows(response.data)
      }
    }
    fetchOrder()   
  },[])

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Opertion</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.length?(<>
               {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{(row.time).split(" ")[0]}</TableCell>
              <TableCell>{row.operation}</TableCell>
              <TableCell>{parseFloat((row.amount)).toFixed(6)}</TableCell>
              <TableCell align="right">{`${row.status}`}</TableCell>
            </TableRow>
          ))}
          </>):(<>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell style={{textAlign:"center"}}>No orders yet..</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          </>)
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}