import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Admin } from "./components/Admin";

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
        </Routes>
    </Router>
    
    </>
  );
}

export default App;