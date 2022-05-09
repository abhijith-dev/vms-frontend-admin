import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { fetchTotalAmount } from '../functions/general';

export default function Deposits() {
  const [balance,setBalance] = React.useState({})
  React.useState(()=>{
     async function fetch(){
      let value = await fetchTotalAmount()
      setBalance(value)
     }
     fetch()
  },[])
  return (
    <React.Fragment>
      <Title>Total Amount</Title>
      <Typography component="p" variant="h4">
        {parseFloat(balance.total).toFixed(4)} ETH
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </React.Fragment>
  );
}