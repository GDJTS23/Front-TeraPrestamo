import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { useUserStore } from '../store'
import Swal from 'sweetalert2';
import axios from 'axios';



const EditProfileForm = () => {

  
  const {user,isAuth} = useUserStore()

  useEffect(() => {  
    if(!isAuth()){
    router.push('/')
    }
  })

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    nomUsuario: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ActualizarPerfil = async (e) => { 

    const headers = { key: user.token }

    try {

      e.preventDefault()
      console.log(user)
      await axios.put('http://localhost:8080/user/'+ user.idUsuario ,formData,{headers});

      Swal.fire(
        {icon: 'success',
        title: 'Usuario Actualizado Correctamente',}
      )
      console.log('Formulario enviado:', formData);

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
        <Card variant="outlined" sx={{ borderRadius: 2, p: 3, mt: 5 }}>
          <CardContent>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => window.history.back()}
              sx={{ position: 'relative', top: 0, left: 0, margin: 2 }}
            >
              Volver
            </Button>
            
            <Typography variant="h6" align="center" gutterBottom mb={3}>
                <PersonIcon/> Editar Perfil
            </Typography>

            <Grid item xs={12} md={8} ml={5}>
              <form onSubmit={ActualizarPerfil}>

                <TextField
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleFormChange}
                  required
                  margin="normal"
                  sx={{ marginLeft: 2 }}
                />
                <TextField
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleFormChange}
                  required
                  margin="normal"
                  sx={{ marginLeft: 2 }}
                />
                <TextField
                    label="Nombre de Usuario"
                    name="nomUsuario"
                    value={formData.nomUsuario}
                    onChange={handleFormChange}
                    required
                    margin="normal"
                    sx={{ marginLeft: 2 }}
                />
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleFormChange}
                  required
                  margin="normal"
                  sx={{ marginLeft: 2 }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Guardar
                </Button>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default EditProfileForm;
