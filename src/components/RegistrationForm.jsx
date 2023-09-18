import React, { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store'
import { useRouter } from 'next/router';


import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Link,
  Checkbox,
  MenuItem,
  Select
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importa el ícono de flecha hacia atrás
import Swal from 'sweetalert2';

const RegistrationForm = () => {

  const {setUser} = useUserStore()
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    nomUsuario: '',
    email: '',
    contraseña: '',
    preguntaSeguridad:'',
    respuestaSeguridad:'',
    confirmPassword: '',
    subscribeNewsletter: false,
    tipoUsuario: '',
    fechaNac:''
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };


  const SING_UP = async (e) => {

    try {

    e.preventDefault()

    if((formData.contraseña===formData.confirmPassword)==true){

      const { data } = await axios.post('http://localhost:8080/user',formData)

      const user = {
        ...data.usuario,
        token: data.token
      }
      setUser(user)
      Swal.fire(
        {icon: 'success',
        title: 'Usuario Creado Correctamente',}
      )
      console.log('Formulario enviado:', formData);
      router.push('/documentCarga')

    } else{
      Swal.fire(
        {icon: 'error',
        title: 'Oops...',
        text: 'La contraseña y confirmar contraseña, deben ser iguales!!!',}
      )
    }

    } catch (error) {

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
    <div>
       <Container>
        <Card variant="outlined" sx={{ borderRadius: 2, p: 3, mt: 5}}>
          <CardContent>
          <Button
              variant="text"
              startIcon={<ArrowBackIcon />} // Ícono de flecha hacia atrás
              onClick={() => window.history.back()} // Función para regresar
              sx={{ position: 'realative', top: 0, left: 0, margin: 2 }}
            >
              Volver
            </Button>
          <Typography variant="h6" align="center" gutterBottom mb={3}>
        ¡Registrate para disfrutar de la mejor plataforma de prestamos!
      </Typography>
      
              <Grid item xs={12} md={8} ml={5}>
                <form onSubmit={SING_UP}>
                  <TextField
                  type='text'
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                  type='text'
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                    type='date'
                    label=""
                    name="fechaNac"
                    value={formData.fechaNac}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                  type='number'
                    label="Cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                  type='number'
                    label="Telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                  type='text'
                    label="Nombre de usuario"
                    name="nomUsuario"
                    value={formData.nomUsuario}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />

                  <Select
                    name="preguntaSeguridad"
                    margin="normal"
                    value={formData.preguntaSeguridad}
                    onChange={handleFormChange}
                    required
                    sx={{ margin: 2 }}
                  >
                    <MenuItem value="¿Cuándo es tu cumpleaños?">¿Cuándo es tu cumpleaños?</MenuItem>
                    <MenuItem value="¿Cómo se llamaba tu mamá?">¿Cómo se llamaba tu mamá?</MenuItem>
                    
                  </Select>

                  <TextField
                  type='text'
                    label="Respuesta de seguridad"
                    name="respuestaSeguridad"
                    value={formData.respuestaSeguridad}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 0 }}
                  />
                  <TextField
                    label="Contraseña"
                    name="contraseña"
                    type="password"
                    value={formData.contraseña}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <TextField
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                  />
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend"  sx={{ marginLeft: 2 }}>Tipo de usuario</FormLabel>
                    <RadioGroup
                      row
                      aria-label="userType"
                      name="tipoUsuario"
                      value={formData.tipoUsuario}
                      onChange={handleFormChange}
                      sx={{ marginLeft: 2 }}
                    >
                      <FormControlLabel
                        value="Prestatario"
                        control={<Radio />}
                        label="Prestatario"
                      />
                      <FormControlLabel
                        value="Prestamista"
                        control={<Radio />}
                        label="Prestamista"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleFormChange}
                        required
                        sx={{ marginLeft: 2 }}
                      />
                    }
                    label={
                      <Link href="/terminos-y-condiciones" target="_blank" rel="noopener">
                        Aceptar términos y condiciones
                      </Link>
                    }
                  />
             

                  <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  >
                    Registrate
                  </Button>
                </form>
              </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default RegistrationForm;
