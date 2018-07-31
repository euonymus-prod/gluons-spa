// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// component
import Navbar from '../containers/navbar';
import SearchBar from './search_bar';
import TopPickups from '../containers/top_pickups';


class Home extends Component {
    render () {
	return (
      <div>
         <Navbar />
      <div className="container">
         <div className="logo-top">
             <img src="/img/logo.gif" />
         </div>

         <div className="home">
            <p className="text-center">気になる人、物、会社の隠れた関係を見つけよう</p>
            <SearchBar type="home" />
            <TopPickups />
         </div>

      </div>
      </div>
	)
    }
}
export default Home;
