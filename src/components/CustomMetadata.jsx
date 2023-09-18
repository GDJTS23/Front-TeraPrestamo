import Head from 'next/head'
import Icon from '@/assets/Tera.ico'

/**
 * @param title {string} - Título de la página, por defecto lleva el título 'Principal'.
 * @param description {string} - Descripción de la página.
 * @param keywords {Array} - Palabras claves que describen el proyecto. Todo en un array de strings.
 * @param author {string} - Autor de la página, por defecto el nombre del equipo 'Bink'.
 */
const CustomMetadata = ({
  title = 'Tera-Prestamos',
  description = 'Página principal de Tera-Prestamos',
  keywords = ['web', 'prestamos', 'creditos', 'teraprestamos'],
  author = 'Equipo 5'
}) => {

  const keys = keywords?.join(', ') ?? ['web']

  return (
    <Head>
      <title>{title} - Inicia sesión o regístrate</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keys} />
      <meta name='author' content={author} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/Tera.ico'/>
    </Head>
  )
}

export default CustomMetadata