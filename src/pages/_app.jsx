import '@/styles/globals.css'
import { ThemeProvider } from '@mui/material'

import { theme } from '@/themes/theme'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App