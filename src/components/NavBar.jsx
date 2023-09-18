import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';

const NavBar = () => {

  return (
    <AppBar position='static' sx={{ borderRadius: '10px', boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
