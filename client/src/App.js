import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from  './Components/Store';
import MainRoutes from "./Routes/MainRoutes";

function App() {
  return (
    <div>
     <Provider store={store}> 
        <MainRoutes />
     </Provider>     
    </div>
  );
}

export default App;
