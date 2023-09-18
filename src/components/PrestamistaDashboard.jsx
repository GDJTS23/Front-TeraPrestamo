import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Card, 
  CardContent,
  Button, Link,
  Box
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importa el ícono de flecha hacia atrás
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useUserStore } from '../store'
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';




const PrestamistaDashboard = () => {
  const router = useRouter();
  const {user,clear,isAuth} = useUserStore()
  const [info, setInfo] = useState([]);

  useEffect(() => {  
    if(!isAuth()){
    router.push('/')
    }
  },[])


  // Estado para gestionar el menú de usuario
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Función para abrir el menú de usuario
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú de usuario
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const finalizarSesion =() =>{
    setAnchorEl(null);
    router.push('/')
    clear() 
  }

  const Infrome = async () => {
    try {
      const headers = { key: user.token }
      
       const prestamo = await axios.get('https://teraprestamo-api.onrender.com/prestamo/inofrme/'+ user.idUsuario,{headers});
       setInfo(prestamo.data.prestamo)

       var doc= new jsPDF() 


       const margin = 10; // Margen superior
       const lineHeight = 10; // Altura de línea
       const pageHeight = doc.internal.pageSize.height; // Altura de página
       
       let y = margin; // Inicializar la posición vertical
       
       // Función para agregar contenido a la página actual
       function addContentToPage(content) {
         doc.text(margin, y,content);
         y += lineHeight;
       }
       
       // Loop para agregar contenido en cada página
       info.forEach((element) => {
         const lines = doc.splitTextToSize(JSON.stringify(element,null,'\t'), doc.internal.pageSize.width - 2 * margin);
       console.log(lines)
         if (y + lines.length * lineHeight > pageHeight) {
           // Si el contenido no cabe en la página actual, agregar una nueva página
           doc.addPage();
           y = margin;
         }
         // Agregar el contenido a la página actual
         for (let i = 0; i < lines.length; i++) {
          addContentToPage(lines[i]);
         }
       });

  doc.save('info.pdf')
  doc.output('dataurlnewwindow')

    } catch (error) {
  
   console.log(error)
   Swal.fire(
    {icon: 'error',
    title: 'Oops...',
    text: error.response.data.msg,}
  )

    }
   }

  return (
    <div>
      {/* Parte superior */}
      <AppBar position="static" color="primary"  sx={{ borderRadius: '10px', boxShadow: 'none' }}>
      <Container maxWidth='xl'>
     <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src='/Tera.ico'
              width={100}
              height={100}
              alt='Logo de la plataforma Tera-Prestamos'
              style={{ borderRadius: '15%' }}
            />
            <Typography
              variant="h6"
              fontWeight='bold'
              sx={{
                fontSize: '1.5rem',
                marginLeft: '10px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              TERA-PRÉSTAMOS
            </Typography>
          </Box>
         
       </Typography>
          <IconButton
            color="inherit"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>{user?.nomUsuario}</MenuItem>
            <MenuItem onClick={finalizarSesion}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
        </Container>
      </AppBar>

      {/* Contenido principal */}
      <Container >
      <Card variant="outlined" sx={{ marginBottom: '20px', borderRadius: 2, p: 3, mt: 5 }}>
      <CardContent>
        <Grid container spacing={2} mr={30}>
          {/* Panel de notificaciones */}
          <Grid item xs={12} sm={4} md={3}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notificaciones" />
              </ListItem>
              <Divider />
              {/* Ejemplo de notificación 1 */}
              <ListItemButton>
                <ListItemText primary="Nueva notificación" secondary="Hace 5 minutos" />
              </ListItemButton>
              {/* Ejemplo de notificación 2 */}
              <ListItemButton>
                <ListItemText primary="Otra notificación" secondary="Hace 30 minutos" />
              </ListItemButton>
            </List>
          </Grid>

          {/* Enlaces a páginas */}
          <Grid item xs={12} sm={8} md={9} >
            <List sx={{ml: 30}}>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/documentCarga')}>
                    CARGAR DOCUMENTOS BANCARIOS
                  </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/prestaOferta')}>
                    CREAR OFERTAS DE PRESTAMOS
                  </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/listaSolicitudes')}>
                    VER LISTADO DE SOLICITUDES
                  </Link>
                
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/listaPrestamo')}>
                    VER LISTADO DE PRESTAMO
                  </Link>
                
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link sx={{ cursor: 'pointer' }} color="primary" onClick={() => router.push('/perfilEdit')}>
                    VER Y EDITAR PERFIL
                  </Link>
                
              </ListItemButton>
              <Button variant="contained" color="primary" sx={{ml: 3,marginBottom:1}} onClick={()=>Infrome()}>
                  Historial de Préstamos
                </Button>
            </List>
          </Grid>
        </Grid>
        </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PrestamistaDashboard;