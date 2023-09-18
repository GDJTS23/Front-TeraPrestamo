import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store';
import axios from 'axios';
import Swal from 'sweetalert2';

const OperationList = () => {

  const [datos, setDatos] = useState([]);
  const [monto, setMonto] = useState(0);

  const {user,isAuth} = useUserStore()
  const router = useRouter();

  useEffect(() => {  
     if(!isAuth()){
     router.push('/')
     }
   },[])
   useEffect(() => {  
    PrestamoAct()
  },[])


  const PrestamoAct = async () =>{
    try {
      const headers = { key: user.token }
      const solicitud = await axios.get('https://teraprestamo-api.onrender.com/prestamo/activo/'+ user.idUsuario,{headers}); 
      setDatos(solicitud.data.prestamo);
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


 const Abonar = async (monto,idPrestamo) => {
  try {
    const headers = { key: user.token }
    const body = {abonado:Number(monto),idPrestamo}
    await axios.put('https://teraprestamo-api.onrender.com/prestamo/'+ user.idUsuario,body,{headers}).then(function (response) {
        if (response.status === 201) {
            Swal.fire(
                {icon: 'success',
                title: 'Excelente!',
                text: response.data.msg}
              );
              console.log(response.data.msg)
              PrestamoAct()
        }       
        
        if (response.status === 200) {
            Swal.fire(
                {icon: 'success',
                title: 'Excelente!',
                text: response.data.msg}
              ).then((result) => {
                if (result.isConfirmed) {

                    window.history.back()
                }
              });
        }
    })

      
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
        Préstamo Disponible
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Préstamo ID</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Descrip del Prestamista</TableCell>
              <TableCell>Monto del Prétamo</TableCell>
              <TableCell>Tasa de Interés</TableCell>
              <TableCell>Deuda Total</TableCell>
              <TableCell>Por Cancelar</TableCell>
              <TableCell>Abonado</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             
              <TableRow key={datos.idPrestamo}>
                <TableCell>{datos.idPrestamo}</TableCell>
                <TableCell>{datos.estadoPrestamo}</TableCell>
                <TableCell>{datos.descrip1}</TableCell>
                <TableCell>{datos.montoTotal}$</TableCell>
                <TableCell>{datos.tasaInteres}%</TableCell>
                <TableCell>{(datos.montoTotal*(datos.tasaInteres/100))+datos.montoTotal}$</TableCell>
                <TableCell>{datos.deuda}$</TableCell>
                <TableCell>{datos.abonado}$</TableCell>
                <TableCell>{datos.fechaInicio}</TableCell>
                <TableCell>
                <TextField
                    type='number'
                    label="Monto Abonar"
                    name="monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" sx={{ml: 3,marginBottom:1}} onClick={()=>Abonar(monto,datos.idPrestamo)}>
                  Abonar
                  </Button>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
      </Card>
    </Container>
  );
};

export default OperationList;
