import Loginpage from "../pages/Loginpage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
function App() {




  return (
    <div className="App">
      <BrowserRouter>
    <ul>
      <li>
        <Link to="/" >Home</Link>
      </li>
      <li>
        <Link to="/login" >Login</Link>
      </li>
      <li>
        <Link to="/signup" >Signup</Link>
      </li>
      <li>
        <Link to="/logout" >Logout</Link>
      </li>
    </ul>



      <Routes>
        <Route index element={<RequireAuth>
        <NotesPage />
        </RequireAuth>
        }/>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />

      </Routes>
      </BrowserRouter>

   </div>
  );
}

export default App;
