import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import {TempNav} from "./components/tempNav";
import {Hr} from "./components/hr";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<TempNav/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='/hr' element={<Hr/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
