//Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';


//Import Page Components
import Navbar from './components/page_components/Navbar';
import Home from './components/page_components/Home';
import CreateForm from './components/form_components/CreateForm';
import ViewEvent from './components/page_components/ViewEvent';
import Footer from './components/page_components/Footer';

class App extends Component {

  setRoot = (newClassRoot=null, newClassNav=null) => {
    //Set the class of root
    if (newClassRoot !== null) {
      const root = document.getElementById("root");
      root.className = "";
      root.className = newClassRoot;
    }

    //Set the class of Nav
    if (newClassNav !== null) {
      const navbar = document.getElementById("navbar");
      navbar.className = "";
      navbar.className = newClassNav;
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home setRoot={this.setRoot}/>} />
            <Route path='/create' element={<CreateForm setRoot={this.setRoot}/>} />
            <Route exact path='/share/:id' match={this.props.match} element={<ViewEvent setRoot={this.setRoot} />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
