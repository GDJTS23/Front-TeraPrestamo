import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useUserStore } from '../store';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


const DocumentCarga = () => {

  const { user, isAuth } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push('/');
    }
  }, []);

  const [formData, setFormData] = useState({
    archivoCed: null,
    archivoRef: null,
    archivoEst: null,
    banco: '',
    numCuenta: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = { key: user.token };
      const files = new FormData();

      files.append('numCuenta', formData.numCuenta);
      files.append('banco', formData.banco);
      files.append('archivoCed', formData.archivoCed);
      files.append('archivoEst', formData.archivoEst);
      files.append('archivoRef', formData.archivoRef);

      console.log(!formData.archivoCed)
      console.log(!formData.archivoEst)
      console.log(!formData.archivoRef)

      if(formData.archivoCed&&formData.archivoEst&&formData.archivoRef){

          await axios.post('https://teraprestamo-api.onrender.com/user/doc/' + user.idUsuario, files, { headers }).then(function (response) {
          if (response.status === 201) {
              Swal.fire(
                  {icon: 'success',
                  title: 'Excelente!',
                  text: response.data.msg}
                );
                if (user.tipoUsuario === 'Prestatario') router.push('/prestatarioDashboard');
                if (user.tipoUsuario === 'Prestamista') router.push('/prestamistaDashboard');
          }       
          
          if (response.status === 200) {
              Swal.fire(
                  {icon: 'success',
                  title: 'Excelente!',
                  text: response.data.msg}
                );
                if (user.tipoUsuario === 'Prestatario') router.push('/prestatarioDashboard');
                if (user.tipoUsuario === 'Prestamista') router.push('/prestamistaDashboard');
          }
        })

      }else{
        Swal.fire(
          {icon: 'error',
          title: 'Debe Ingresar todos los Documentos',
      });
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
  };

  return (
    <Container>
      <Card variant="outlined" sx={{ borderRadius: 1, p: 2, mt: 3 }}>
        <CardContent>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{ position: 'relative', top: 0, left: 0, margin: 2 }}
          >
            Volver
          </Button>
          <Typography variant="h4" align="center" gutterBottom mb={3}>
            <AssignmentIcon /> ¡Cargar documentos bancarios!
          </Typography>

          <Typography variant="h6" align="center" gutterBottom mb={3}>
            Para continuar con el proceso, por favor ingresa los datos solicitados.
          </Typography>

         
            <Grid item xs={12} md={6}>
              <form  onSubmit={handleSubmit}>
               <Grid item xs={3} md={3} ml= {20} >
                 
           
                <input
                  type="file"
                  accept=".pdf, .png"
                  id="archivoCed"
                  name="archivoCed"
                  onChange={(e) => handleFileChange(e, 'archivoCed')}
                  style={{ display: 'none' }}
                />
                <label htmlFor="archivoCed">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component="span"
                    sx={{ marginRight: 2, mt:2}}

                  >
                    Adjuntar Cédula PDF/PNG
                  </Button>
                </label>
                
                <input
                  type="file"
                  accept=".pdf, .png"
                  id="archivoEst"
                  name="archivoEst"
                  onChange={(e) => handleFileChange(e, 'archivoEst')}
                  style={{ display: 'none' }}
                />
                <label htmlFor="archivoEst">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component="span"
                   sx={{mr :2 , mt: 2 }}
                  >
                    Adjuntar Estado de Cuenta
                  </Button>
            
                </label>
                <input
                  type="file"
                  accept=".pdf, .png"
                  id="archivoRef"
                  name="archivoRef"
                  onChange={(e) => handleFileChange(e, 'archivoRef')}
                  style={{ display: 'none' }}
                />
                <label htmlFor="archivoRef">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component="span"
                    sx={{ marginRight: 2 , mt: 2 }}
                  >
                    Adjuntar Referencia Bancaria
                  </Button>
                </label>
                </Grid>
                <Typography variant="h6" align="center" gutterBottom mb={3} mt={4}>
                  Ingresa los Datos Bancarios
                </Typography>
                <TextField
                  label="Banco"
                  name="banco"
                  value={formData.banco}
                  onChange={handleFormChange}
                  required
                  margin="normal"
                  fullWidth
                />
                <TextField
                type='number'
                  label="Numero de Cuenta"
                  name="numCuenta"
                  value={formData.numCuenta}
                  onChange={handleFormChange}
                  required
                  margin="normal"
                  fullWidth
                />
                <Card variant="outlined" sx={{ borderRadius: 1, p: 2, backgroundColor: "#CCCCCC", marginTop: 2 }}>
                  <Typography variant="h6" align="center" gutterBottom color="black">
                    Debemos recordarte que todos los documentos deben corresponder a un único titular
                  </Typography>
                </Card>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                  Subir
                </Button>
              </form>
            </Grid>
          
        </CardContent>
      </Card>
    </Container>
  );
};

export default DocumentCarga;