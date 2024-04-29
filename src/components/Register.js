import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link, Grid, CssBaseline, Avatar, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [snackbarOpen, setSnackbarOpen] = useState(false);
 console.log("AZA");
 const handleRegister = async () => {
    const response = await fetch('http://localhost:8000/v1/auth/signup', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         username: username,
         password: password,
      })
    });
    console.log(username);
    console.log(password);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
     } else {
      console.error('Registration failed');
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
          Registration
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
            Register
          </Button>
          <Grid container>
            <Grid item>
            <Link href="/login" variant="body2">
                {"Back to Login"}
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
          Registration failed
        </Alert>
      </Snackbar>
    </Container>
 );
};

export default Register;
