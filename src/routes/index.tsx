import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../layout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
])
