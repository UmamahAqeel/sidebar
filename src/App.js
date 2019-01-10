import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

class App extends Component {

  render() {
    console.log('App');
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Sidebar} />
          <Route exact path="/side" component={Sidebar} />

          <Footer title="Footer" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;