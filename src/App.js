import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import React from 'react'
import Login from './Components/Login';

function App() {
  const [admin,setAdmin] = React.useState(false)
  React.useEffect(()=>{
      let token  = localStorage.getItem('token')
      if(token ==='' || token === undefined || token === null){
        setAdmin(false)
      }
      else{
        setAdmin(true)
      }
  },[])
  return (
    <BrowserRouter >
     <Routes>
       <Route path='/' element={admin?<Dashboard />:<Login />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
