import React, { Component } from 'react';
import './App.css';
import { Navbar } from './News/Navbar';
import  News  from './News/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Search from './News/Search';

export default class App extends Component {
 
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar color='#f11946' progress={this.state.progress} />
          
          <Routes>
          
            <Route exact path='/' element={<News setProgress={this.setProgress} country='us' category='general' key="general" />} />
            <Route path="/search" element={<Search />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} country='us' category='science' key="science" />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} country='us' category='sports' key="sports" />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} country='us' category='entertainment' key="entertainment" />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} country='us' category='health' key="health" />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} country='us' category='technology' key="technology" />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} country='us' category='business' key="business" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
