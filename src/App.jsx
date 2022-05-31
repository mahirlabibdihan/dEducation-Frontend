import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import { Background } from "./components";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Background>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Background>
    </Router>
  );
}

export default App;
