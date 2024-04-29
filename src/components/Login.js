import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link, Grid, CssBaseline, Avatar, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 const nav = useNavigate();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [snackbarOpen, setSnackbarOpen] = useState(false);

 const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/v1/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      nav("/home");
     } else {
      console.error('Login failed');
      setSnackbarOpen(true); 
     }
     
     
 };

 const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); 
 };

 return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
            <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '100%',
          "& .MuiSnackbarContent-root": {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
      >
        <Alert onClose={handleSnackbarClose} variant='filled' severity="error" sx={{ width: '80%' }}>
          Login failed
        </Alert>
      </Snackbar>
    </Container>
 );
};

export default Login;
