import './App.css';
import ChatArea from './Components/ChatArea';
import { Login } from './Components/Login';
import { MyNavigate } from './Components/MyNavigate';
import { Register } from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <Router>
      <MyNavigate />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/chat'
          element={
            <div className='chat-container'>
              <Sidebar />
              <ChatArea />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
