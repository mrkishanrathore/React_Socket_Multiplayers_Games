import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Login from './Components/Login'
import Friends from './Components/Friends'
import JoinCreateRoom from './Components/JoinCreateRoom'
import TTT from './Components/Games/TicTacToe/TTT'
import Snake from './Components/Games/Snake/Snake'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='Friends' element={<Friends/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='JoinCreateRoom' element={<JoinCreateRoom/>}/>
      <Route path='TTT' element={<TTT/>}/>
      <Route path='Snake' element={<Snake/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>,
)
