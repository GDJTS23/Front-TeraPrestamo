import React from 'react';
import { Box, Container, Grid, IconButton, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <footer>
      <Box bgcolor="primary.main" color="white" py={4}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Tera-Prestamos</Typography>
              <Typography variant="body2" mt={2}>
                ¡Síguenos en nuestras redes sociales!
              </Typography>
              <Box mt={2}>
                <IconButton color="inherit" component={Link} href="https://www.facebook.com/">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" component={Link} href="https://twitter.com/">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" component={Link} href="https://www.instagram.com/">
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Enlaces</Typography>
              <Box mt={2}>
                <Typography variant="body2" component={Link} href="/contactanos"  color="inherit">
                  Contactanos
                </Typography>
                <Typography variant="body2" component={Link} href="/sobre-nosotros"  ml={2}color="inherit">
                  Sobre nosotros
                </Typography>
                <Typography variant="body2" component={Link} href="/decisiones-crediticias" ml={2} color="inherit">
                  Decisiones Crediticias
                </Typography>
                <Typography variant="body2" component={Link} href="/novedades"  ml={2}color="inherit">
                  Novedades
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
