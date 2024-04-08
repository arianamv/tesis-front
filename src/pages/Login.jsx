import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authService } from "../services/authService"
import { useNavigate } from "react-router-dom";
import { validar } from '../helpers/Validaciones';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

    React.useEffect(() => {
      console.log("PRUEBA")
    },[])
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorEmail("")
        setErrorPassword("")

        if (validar.validarCorreo(data?.get('email')) || data?.get('email') === "admin"){
          const response = await authService.login(data); 
          if(response?.data?.token){
            authService.setToken(JSON.stringify(response?.data));
            if (authService.getUserRole() === "ADMINISTRADOR"){
              navigate('/admin-page');
            } else {
              navigate('/colab-page');
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
            backgroundImage: 'url(http://www.ispconsulting.pe/imagenes/4.jpg)',
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
                <img src="http://www.ispconsulting.pe/imagenes/logo.png" width={150} alt="logo" />
            </Box>
            <Typography  sx={{color: "#9C9C9C", fontSize:"32px", mb:2}} component="h1" variant="h5">
              <strong>Bienvenido a ISP Consulting</strong>
            </Typography>
            <Typography  sx={{color: "green", fontSize:"32px", mb:2}} component="h1" variant="h5">
              <strong>ENTORNO DE PRUEBAS Y DESARROLLO: 13/07/2023 - 10:28 PM</strong>
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
                sx={{ mt: 3, mb: 2, backgroundColor: "#154360"}}
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
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
