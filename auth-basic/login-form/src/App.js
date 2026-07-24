import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm/Login";
import RegisterForm from "./Components/RegisterForm/Register";
import SignUp from "./Components/RegisterForm/SignUp";
import HomePage from "./Components/HomePage/Home";
import logo from "./Components/Assets/terrAI.svg";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="container">
          <div className="container-logo">
            <a href="/">
              <img src={logo} alt="Logo Terrai" className="app-logo" />
            </a>
          </div>

          <navbar className="links">
            <div className="body">
              <Link to="/">Inicio</Link>
              <a href="/about">Acerca de</a>
              <a href="/contact">Contacto</a>
            </div>

            <div className="monitor">
              <a href="/href-monitor">Monitorear</a>
            </div>
          </navbar>
          <div className="buttons">
            <Link to="/login">Iniciar sesión</Link>
            <RegisterButton />
          </div>
        </header>

        <main className="app-main-body">
          <Routes>
            <Route exact path="/" Component={HomePage} />
            <Route exact path="/login" Component={LoginForm} />
            <Route exact path="/signup" Component={RegisterForm} />
            <Route exact path="/register" Component={SignUp} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function RegisterButton() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <button type="button" onClick={handleRegisterClick}>
      Registrarse
    </button>
  );
}

export default App;
