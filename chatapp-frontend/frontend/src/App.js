import './App.css';
import { ChatArea } from './Components/ChatArea';
import { Login } from './Components/Login';
import { Navigate } from './Components/Navigate';
import { Register } from './Components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Sidebar } from './Components/Sidebar';

function App() {
  return (
    <>
    <div className='chat-container'>
    <Sidebar />
      <ChatArea />
    </div>    

    </>

    // <Router>
    //   <Navigate />
    //   <Routes>
    //     <Route path='/register' element={<Register />}></Route>
    //     <Route path='/login' element={<Login />}></Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
