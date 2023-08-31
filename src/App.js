import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Addidea from './components/Addidea';
import Signin from './components/Signin';
import Signup from './components/Signup';
import QuillEditor from './components/QuillEditor';
import NavbarMenu from './components/Navbar';

function App() {
  return (
    <div className="App">
     <NavbarMenu/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addidea" element={<Addidea/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
