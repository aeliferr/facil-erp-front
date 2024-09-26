import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Login } from '@/pages/Login'
import { Protected } from '@/components/layout/Protected'
import { AppLayout } from '@/components/layout/AppLayout'
import Budgets from '@/pages/Budgets'
import CreateBudget from '@/pages/Budgets/CreateBudget'



export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <Login />,
      }
    ],
  },
  {
    element: <Protected />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <h1>Pagina Inicial</h1>,
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: '/budgets',
            element: <Budgets />,
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: '/create-budget',
            element: <CreateBudget />,
          },
        ],
      }
    ],
  },
])