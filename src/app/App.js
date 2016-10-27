import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Head from './components/Head'
import Carousel from './components/Carousel'
import Events from './components/Events'

class App extends Component {
  componentDidMount () {
    // We need to require css here in order for it to be isomorphic
    require('bootstrap/dist/css/bootstrap.css')
    require('./css/App.css')
    require('./css/Header.css')
    require('./css/react-boostrap-carousel.css')
    // logo = require('./images/logo.svg')
  }
  render () {
    return (
      <div className='App'>
        <Head />
        <Header />
        <Carousel />
        <Events />
        <Link to='/test'> BATATA POWER</Link>
        <Footer />
      </div>
    )
  }
}

export default App
