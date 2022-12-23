import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Post from './components/Post';
import Users from './components/Users';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';
import Home from './components/Home';
import Landing from './components/Landing';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      islog:''
    }
  }
  componentDidMount(){
    axios.get('/check')
      .then(res => this.setState({islog:res.data}))
  }

  componentDidUpdate(prevProps,prevState){
    if(true){
      axios.get('/check')
        .then(res => this.setState({islog:res.data}))
    }
  }
  render(){
    if(this.state.islog!='No'){
      return (
        <Router>
          <Navbar />
          <Route path='/' exact component={Landing} />
          <Route path='/requirements' exact component={Post} />
          <Route path='/view' exact component={Home} />
        </Router>
      );
    
    }
    else{
      return(
        <Router>
          <Navbar1 />
          <Route path='/' exact component={Landing} />
          <Route path='/view' exact component={Home} />
        </Router>
      )
    }
  }
}

export default App;
