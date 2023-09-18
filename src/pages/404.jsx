import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, Button, Stack } from '@mui/material'

import MainLayout from '@/components/MainLayout'
import CustomMetadata from '@/components/CustomMetadata'
import NavBar from '@/components/NavBar'

import styles from './styled-components/404-styles.module.css'

const NotFoundPage = () => {

  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== '/not-found') {
      window.history.pushState({}, '', '/not-found')
    }
  })

  return (
    <MainLayout>
      <CustomMetadata
        title='Página no encontrada'
      />
      <NavBar />
      <Box
        className={styles.container}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            variant='h1'
          >
            404
          </Typography>
          <Typography
            variant='h3'
          >
            Página no encontrada
          </Typography>
        </Stack>

        <Stack
          my={2}
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            variant='body1'
            component='p'
          >
            No encontramos la página que deseas visualizar.
          </Typography>
          <Typography
            variant='body1'
            component='p'
          >
            Por favor, intenta nuevamente volviendo al inicio.
          </Typography>
        </Stack>

        <Button
          mt={2}
          href='/'
          variant='contained'
        >
          Regresar
        </Button>
      </Box>
    </MainLayout>
  )
}

export default NotFoundPage