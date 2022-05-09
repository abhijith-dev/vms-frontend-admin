import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import {verification} from '../functions/general'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette:{
        dark:'#222'
    }
});

export default function Login() {
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [loading,setLoading] = React.useState(false)

  const handleSubmit = async (event) => {
    setLoading(true)  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
      name: data.get('name'),
      passcode: data.get('password'),
    }
    let response = await verification(body)
    if(response.error){
        setLoading(false)
        setError(true)
        setErrorMessage(response.message)
    }
    else{
        setLoading(false)
        setError(false) 
        setErrorMessage('')
        localStorage.setItem('token',`Bearer ${response.token}`)
        window.location.href = "/"
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{
        height:'100vh',
        backgroundImage: 'url(https://scwcontent.affino.com/AcuCustom/Sitename/DAM/023/various_mobility_services_Adobe.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <CssBaseline />
        <Grid item xs={4} sm={4} md={3.5}></Grid>
        <Grid item xs={6} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" validate={true} onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {
                error?
                (
                    <><Alert severity="error">{errormessage}</Alert></>
                ):null
          }
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="name"
                color="dark"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passcode"
                type="password"
                color="dark"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                style={{backgroundColor:"#222"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                sign in
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

// xs={false}
// sm={4}
// md={7}
