import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authService } from '../../services/authService';
import { useNavigate } from "react-router-dom";
import { validar } from '../../validations/Validaciones';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import background from '../../assets/Login_image.jpg'
import logo from '../../assets/Logo.png'
import { login } from '../../services/adminService';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.ispconsulting.pe/">
        ISP CONSULTING
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
    const navigate =  useNavigate();
    const [errorMail, setErrorEmail] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState("")
    let [usuario, setUsuario] = React.useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorEmail("")
        setErrorPassword("")

        let perfil =1

        if (validar.validarCorreo(data?.get('email')) || data?.get('email') === "admin"){
          console.log(data)
          const response = await login(data); 
          console.log(response);
          if(response?.data){
            setUsuario(response.data.Usuario[0]);
            usuario = response.data.Usuario[0];
            if (response?.data.Usuario[0].Perfil_idPerfil === 1){
              navigate('/admin-home', { state: { usuario: usuario } });
            } else {
              navigate('/eval-home', { state: { usuario: usuario } });
            }
          }  else {
            setErrorPassword("Fallo de autenticación: La contraseña ingresada es incorrecta o no existe el usuario.")
          }
        } else {
          if(data?.get('email').trim() === ""){
            setErrorEmail("Debe ingresar su correo electrónico.")  
          } else {
            setErrorEmail("La dirección de correo electrónico ingresada no es correcta.")
          }
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ width: "100vw", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{            
            height: "100vh",
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid sx={{alignItems:'center'}} item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Box sx={{mb:6}}>
                <img src={require("../../assets/Logo.png")} width={150} alt="logo" />
            </Box>
            <Typography  sx={{color: "#074F57", fontSize:"32px", mb:2}} component="h1" variant="h5">
              <strong>Bienvenido a SAM</strong>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="standard"
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{mb:2}}
                helperText= {errorMail}
                error = {errorMail !== "" ?true:false}
              />
              <FormControl error={errorPassword !== "" ?true:false} sx={{mt:2}} required fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                <Input
                  error={errorPassword !== "" ?true:false}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color= {errorPassword == "" ?"":"error"}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errorPassword}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#074F57"}}
                size="large"
              >
                INICIAR SESIÓN
              </Button>
              <Grid container>
                <Grid style={{textAlign: "end"}} item xs>
                  <Link href="recover-password" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
