import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Admin } from "./components/Admin";
import { Spinner } from "./components/Spinner";
import './static/index.css'
import MediaPayload from "./components/MediaPayload";

function App() {
  return (
    <>    
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/spinner" element={<Spinner/>}/>
          <Route exact path="/media/:id" element={<MediaPayload/>}/> 
        </Routes>
    </Router>
    
    </>
  );
}

export default App;