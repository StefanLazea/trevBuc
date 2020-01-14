import React from "react";
import { toast } from 'react-toastify';
//import NavigationBar from './components/Navbar/NavigationBar'
import Routes from './Routes';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App(props) {
  return (
    <div className="App container">
      {/* <NavigationBar /> */}
      <Routes />
    </div>
  );
}

export default App;