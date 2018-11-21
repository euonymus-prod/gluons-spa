import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import FollowButton from './follow_button'

import '../assets/styles/sticky-footer.css'

class GlobalFooter extends Component {
  render () {
	  return (
      <footer className="footer">
        <div className="container">
          <div className="text-muted">&copy; 2016 gluons&nbsp;&nbsp;&nbsp;
             <Link to="/contacts">Contact us</Link>&nbsp;&nbsp;&nbsp;
             <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;
             <Link to="/privacy">Privacy</Link>&nbsp;&nbsp;&nbsp;
             <FollowButton />
          </div>
        </div>
      </footer>
	  )
  }
}
export default GlobalFooter
