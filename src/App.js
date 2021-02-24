import React from 'react';
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Home from "./page/Home";
import AddProduct from "./page/AddProduct";
import EditProduct from "./page/EditProduct";
import Menu from "./components/Menu";

const App = () => {
  return (

       <Router>
         <Menu />
         <Switch>
           <Route exact path="/" component={Home} />
           <Route path="/home" component={Home} />
           <Route path="/add" component={AddProduct} />
           <Route path="/edit/:id" component={EditProduct} />
         </Switch>
       </Router>
  );
};

export default App;
