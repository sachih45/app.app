import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Profile from "./Components/Profile";
import Protect from "./Components/Protect";
import Bookbus from "./Components/Bookbus";
import Busdetail from "./Components/Busdetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={ <Protect Child = {Home}/> } />
          <Route path="/profile" element={<Protect Child = {Profile}/> } />
          <Route path="/bus" element={<Protect Child = {Bookbus}/> } />
          <Route path='/Busdetail/:busid' element={<Protect Child={Busdetail} /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
