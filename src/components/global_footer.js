import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GlobalFooter extends Component {
    render () {
	return (
           <footer className="footer">
              <div className="container">
                 <p className="text-muted">&copy; 2016 gluons&nbsp;&nbsp;&nbsp;
                    <Link to="/contacts">Contact us</Link>&nbsp;&nbsp;&nbsp;
                    <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;
                    <Link to="/privacy">Privacy</Link>
                 </p>
              </div>
           </footer>
	)
    }
}
export default GlobalFooter;
