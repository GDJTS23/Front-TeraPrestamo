import React from 'react';
const { useState, createContext } = React;
import { Button, Card, CardContent, Container, Grid, TextField, Typography, Link, Select, MenuItem} from '@mui/material';
import { Box } from '@mui/system';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useUserStore } from '../store'
import Swal from 'sweetalert2';

import axios from 'axios';


function Login() {

  const {setUser,user} = useUserStore()
  const router = useRouter();

  const [contraseña, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [preguntaSeguridad, setPregunta] = useState('');
  const [respuestaSeguridad, setRespuesta] = useState('');

  const SING_IN = async (e) => {  
        const body = {contraseña,email,preguntaSeguridad,respuestaSeguridad}

        try {
          
          e.preventDefault()
          const { data } = await axios.post('http://localhost:8080/auth/login',body);

          const user = {
            ...data.usuario,
            token: data.token
          }
    
          setUser(user)
          
          if(user.tipoUsuario=='Prestatario')router.push('/prestatarioDashboard')
          if(user.tipoUsuario=='Prestamista')router.push('/prestamistaDashboard')

        } catch (error) {
          console.log(error)

          const msgerros = error.response.data.errors
          
          if(msgerros){

            const msg = msgerros.reduce((total, msgerro) => {
              return total + msgerro.msg + "<br></br>";
            },'');
      
            Swal.fire(
              {icon: 'error',
              title: 'Oops...',
              html: msg,}
            )
          }else{
            Swal.fire(
              {icon: 'error',
              title: 'Oops...',
              text: error.response.data.msg,}
            )
          }  
        }
  }
  

  return (
    <Container>
      <Card variant="outlined" sx={{ marginBottom: '20px', borderRadius: 2, p: 3, mt: 5 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={30}>
              <form onSubmit={SING_IN}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="90vh"
                  width="75%"
                  pt={4}
                  mx="auto"
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                    letterSpacing="1px"
                    color="primary"
                    mb={3}
                    pl={5}
                    pb={3}
                  >
                    ¡Tu camino hacia la libertad financiera comienza aquí!
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Dirección de correo electrónico"
                    fullWidth
                    margin="dense"
                    required
                    InputProps={{
                      startAdornment: <AccountCircle color="primary" />,
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    label="Contraseña"
                    fullWidth
                    required
                    margin="dense"
                    type="password"
                    InputProps={{
                      startAdornment: <Lock color="primary" />,
                    }}
                    value={contraseña}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Select
                    fullWidth
                    margin="dense"
                    value={preguntaSeguridad}
                    required
                    onChange={(_,e) => setPregunta(e.props.value)}
                  >
                    <MenuItem value="¿Cuándo es tu cumpleaños?">¿Cuándo es tu cumpleaños?</MenuItem>
                    <MenuItem value="¿Cómo se llamaba tu mamá?">¿Cómo se llamaba tu mamá?</MenuItem>
                  </Select>

                  <TextField
                    variant="outlined"
                    label="Respuesta"
                    fullWidth
                    required
                    margin="dense"
                    InputProps={{
                      startAdornment: <Lock color="primary" />,
                    }}
                    value={respuestaSeguridad}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                  <Button
                    type="submit" 
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Inicia sesión                
                  </Button>
                  <Typography variant="body2" color="textSecondary" mb={5} mt={3} pb={3} pl={5}>
                    <Link href="#!" className="text-muted">
                      ¿Has olvidado tu contraseña?
                    </Link>
                  </Typography>
                  <Typography pl={5}>
                    ¿No tienes una cuenta?{' '}
                    <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/newRegister')}>
                      Regístrate aquí
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;


