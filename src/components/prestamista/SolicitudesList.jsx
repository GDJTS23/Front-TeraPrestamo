import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store';
import axios from 'axios';
import Swal from 'sweetalert2';

const OperationList = () => {

  const [datos, setDatos] = useState([]);

  const {user,isAuth} = useUserStore()
  const router = useRouter();

  useEffect(() => {  
     if(!isAuth()){
     router.push('/')
     }
   },[])
   useEffect(() => {  
    getSolicitudes_Prestamista()
  },[])


  const handleVer = (operationId) => {
    console.log(`Solicitud aceptada para la operación con ID ${operationId}`);
  };

  const handleReject = (operationId) => {
    console.log(`Solicitud rechazada para la operación con ID ${operationId}`);
  };

  const getSolicitudes_Prestamista = async () =>{

    try {
      
      const headers = { key: user.token }
      const solicitud = await axios.get('https://teraprestamo-api.onrender.com/solicitud/'+ user.idUsuario,{headers}); 
      const operations = solicitud.data.prestamo.map(prestamo => prestamo.Solicituds);
      const array = [];
      for (let i=0; i<operations.length;i++){  
        for (let j=0; j<operations[i].length;j++){
          array.push(operations[i][j])
        }
      }
      setDatos(array);
    } catch (error) {
      Swal.fire(
        {icon: 'error',
        title: 'Oops...',
        text: error.response.data.msg,}
      )
    }
 }

 const modificSolicitud = async (idPrestamo,idSolicitud,estado) => {
  try {
    const headers = { key: user.token }
    const body = { idPrestamo,idSolicitud,estado }
    await axios.put('https://teraprestamo-api.onrender.com/solicitud/'+ user.idUsuario,body,{headers});
    
    if(estado=='Aceptada'){
      Swal.fire(
        {icon: 'success',
        title: 'La solicitud fue aceptada Correctamente',}
      )
    }else{
      Swal.fire(
        {icon: 'success',
        title: 'La solicitud fue rechazada Correctamente',}
      ) 
    }
    getSolicitudes_Prestamista()
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
        Listado de operaciones
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prestamo ID</TableCell>
              <TableCell>Prestatario</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Porcentaje %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map(data => 
              <TableRow key={data.idSolicitud}>
                <TableCell>{data.idPrestamo}</TableCell>
                <TableCell>{data.PrestatarioNom}</TableCell>
                <TableCell>{data.fecha}</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={Math.floor((Math.random() * (100 - 60 + 1)) + 60)}
                    sx={{ width: '100%' }}
                  />
                  {Math.floor((Math.random() * (100 - 60 + 1)) + 60)}%
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" sx={{ml: 3}} onClick={()=>modificSolicitud(data.idPrestamo,data.idSolicitud,'Aceptada')}>
                    Aceptar
                  </Button>
                  <Button variant="contained" color="secondary" sx={{ml: 3}} onClick={()=>modificSolicitud(data.idPrestamo,data.idSolicitud,'Rechazada')}>
                    Rechazar
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
