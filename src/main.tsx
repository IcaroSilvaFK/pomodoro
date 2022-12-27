import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { routes } from './routes'

import { GlobalCSS } from './styles/global'
import { theme } from './styles/theme'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>,
)
