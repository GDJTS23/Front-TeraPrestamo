import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store';
import axios from 'axios';
import Swal from 'sweetalert2';

const OperationList = () => {

  const [datos, setDatos] = useState([]);
  const [info, setInfo] = useState([]);

  const {user,isAuth} = useUserStore()
  const router = useRouter();

  useEffect(() => {  
     if(!isAuth()){
     router.push('/')
     }
   },[])
   useEffect(() => {  
    ListaPrestamo()
  },[])


  const ListaPrestamo = async () =>{
    try {
      const headers = { key: user.token }
      const solicitud = await axios.get('http://localhost:8080/prestamo/'+ user.idUsuario,{headers}); 
      setDatos(solicitud.data.prestamo.map(prestamo => prestamo));
    } catch (error) {
      Swal.fire(
        {icon: 'error',
        title: 'Oops...',
        text: error.response.data.msg,}
      )
    }
 }


 const CreaSolicitud = async (idPrestamo) => {
  try {
    const headers = { key: user.token }
    const body = {idPrestamo}
    await axios.post('http://localhost:8080/solicitud/'+ user.idUsuario,body,{headers});
    
    Swal.fire(
        {icon: 'success',
        title: 'Solicitud Realizada Correctamente',}
      )

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
        text: error.response.data.msg}
      )
    }  
  }
 }


return (
    <Container>
       <Card variant="outlined" sx={{ marginBottom: '20px', borderRadius: 2, p: 3, mt: 5 }}>
      <CardContent>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{ marginTop: 2 }}
      >
        Volver
      </Button>
      <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
        Péstamo Disponibles
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Préstamo ID</TableCell>
              <TableCell>Cuotas del Préstamo</TableCell>
              <TableCell>Tasa de Interés</TableCell>
              <TableCell>Monto del Préstamo</TableCell>
              <TableCell>Monto Total a Pagar</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map(data => 
              <TableRow key={data.idPrestamo}>
                <TableCell>{data.idPrestamo}</TableCell>
                <TableCell>{data.cuotas}</TableCell>
                <TableCell>{data.tasaInteres}%</TableCell>
                <TableCell>{data.montoTotal}$</TableCell>
                <TableCell>{data.deuda}$</TableCell>
                <TableCell>{data.fechaInicio}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" sx={{ml: 3,marginBottom:1}} onClick={()=>CreaSolicitud(data.idPrestamo)}>
                  Solicitar
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
      </Card>
    </Container>
  );
};

export default OperationList;
