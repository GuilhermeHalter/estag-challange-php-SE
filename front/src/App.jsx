import './App.css'
import Header from './layout/Header';
import { Outlet } from 'react-router-dom';


function App() {


  return (
    <>
    <Header />
    <div className="container">
        <Outlet/>
    </div>
    </>
  )
}

export default App
