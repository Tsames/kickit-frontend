//Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Import Form Components
import CreateForm from './components/form_components/CreateForm';
import AttendForm from './components/form_components/AttendForm';

//Import Page Components
import Navbar from './components/page_components/Navbar';
import Home from './components/page_components/Home';
import ViewEvent from './components/page_components/ViewEvent';
import Footer from './components/page_components/Footer';

class App extends Component {

  setRoot = (newClass) => {
    const root = document.getElementById("root");
    root.className = "";
    root.className = newClass;
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route
              exact path='/'
              render={props => (
                <Home {...props} setRoot={this.setRoot}/>
              )}
            />
            <Route
              exact path='/create'
              render={props => (
                <CreateForm {...props} setRoot={this.setRoot}/>
              )}
            />
            <Route
              exact path='/share/:id'
              render={props => (
                <ViewEvent {...props} setRoot={this.setRoot}/>
              )}
            />
            <Route
              exact path='/attend/:id'
              render={props => (
                <AttendForm {...props} setRoot={this.setRoot}/>
              )}
            />
          </Switch>
          <Footer/>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
