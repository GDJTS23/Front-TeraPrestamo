import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  FormLabel,div, Select, MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importa el ícono de flecha hacia atrás

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useUserStore } from '@/store';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


const PrestaOferta = () => {


   const {user,isAuth} = useUserStore()
   const router = useRouter();

   useEffect(() => {  
      if(!isAuth()){
      router.push('/')
      }
    },[])

  const [formData, setFormData] = useState({
   montoTotal: '',
   metodoPago: '',
   tasaInteres: '',
   cuotas: '',
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const CrearPrestamo = async (e) =>{

   try {
 
     e.preventDefault()
     
     const headers = { key: user.token }
 
    await axios.post('https://teraprestamo-api.onrender.com/prestamo/'+ user.idUsuario ,formData,{headers});
     
     Swal.fire(
       {icon: 'success',
       title: 'Se Creo Correctamente el Prestamo',}
     )
 
     router.push('/prestamistaDashboard')
     console.log('Formulario enviado:', formData);
 
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
    <div>
       <Container>
            <Card variant="outlined" sx={{ borderRadius: 4, p: 5, mt: 6, borderColor:"#173F5F"}}>
                <CardContent>
                    <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />} // Ícono de flecha hacia atrás
                    onClick={() => window.history.back()} // Función para regresar
                    sx={{ position: 'realative', top: 0, left: 0, margin: 2 }}
                    >
                        Volver
                    </Button>
                        <Typography variant="h4" align="center" gutterBottom mb={3} color="#3CAEA3">
                        <MonetizationOnIcon /> ¡Crear Oferta De Prestamos!
                        </Typography>
                
                        <Grid item xs={12} md={8} ml={5}>
                            <form onSubmit={CrearPrestamo}>
                                 <Typography variant="h6" align="center" gutterBottom mb={3} color="#173F5F">
                                    ¡Se deben llenar los siguientes campos para realizar una nueva Oferta De Prestamos!
                                 </Typography>
                                 <TextField
                                    label="Monto de la Operacion"
                                    name="montoTotal"
                                    value={formData.montoTotal}
                                    onChange={handleFormChange}
                                    required
                                    margin="normal"
                                    sx={{ marginLeft: 2 }}
                                 />
                                 <TextField
                                    label="Tasa de Interes"
                                    name="tasaInteres"
                                    value={formData.tasaInteres}
                                    onChange={handleFormChange}
                                    required
                                    margin="normal"
                                    sx={{ marginLeft: 2 }}
                                 />
                                  <Select
                                  label="Metodo de Pago"
                                  name="metodoPago"
                                  margin="normal"
                                  value={formData.metodoPago}
                                  onChange={handleFormChange}
                                  required
                                  sx={{ margin: 2 }}
                                >
                                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                                  <MenuItem value="Pago Movil">Pago Movil</MenuItem>
                                  
                                </Select>
                                 <TextField
                                    label="Cuota de Pago"
                                    name="cuotas"
                                    value={formData.cuotas}
                                    onChange={handleFormChange}
                                    required
                                    margin="normal"
                                    sx={{ marginLeft: 2 }}
                                 />
                                
                                 <Card variant="outlined" sx={{ borderRadius: 1, p: 2, mt: 3, backgroundColor:"#CCCCCC",borderColor:"#173F5F"} }>
                                    <FormLabel component="legend"  sx={{ marginLeft: 2 , backgroundColor: "#CCCCC" }}>CONDICIONES:</FormLabel>
                                    <Typography variant="h6" align="left" gutterBottom mb={3} color= "black">
                                       Ser mayor de edad , la existencia de otros prestamos anteriores y tener solvencia e ingresos estables.
                                    </Typography>
                                 </Card>       
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Crear
                                </Button>
                            </form>
                        </Grid>
                </CardContent>
            </Card>
       </Container>
    </div>
  );
};

export default PrestaOferta;