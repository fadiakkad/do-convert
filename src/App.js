import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';
import Home from "./Components/AR/HomePage/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import React,{lazy,Suspense} from 'react';


const routes=[
  {
    path:"/ar/length/",
    component:lazy(()=>
      import("./Components/AR/UnitConverter/Length/LengthConverter.js")
    ),
  },
]
function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
    
  );
  
}
function AppContent(){
  return(
    <Suspense fallback={<div>loading.....</div>}>
      <div className='container'>
        <Routes>
          {
            routes.map((route,index)=>(
              <Route 
              key={index}
              path={route.path}
              element={<route.component/>}
              />
            ))
          }
          <Route path='*' element={<Home/>}/>
        </Routes>
      </div>
    </Suspense>
  )
}
export default App;
