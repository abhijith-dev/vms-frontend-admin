import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Amount</Title>
      <Typography component="p" variant="h4">
        100 ETH
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </React.Fragment>
  );
}