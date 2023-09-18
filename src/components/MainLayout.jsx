import { Box } from '@mui/material'

import styles from './styled-components/mainLayout-styles.module.css'

const MainLayout = ({ children }) => {
  return (
    <Box
      className={styles.layout}
    >
      {children}
    </Box>
  )
}

export default MainLayout