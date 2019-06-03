import _ from 'lodash'
// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// redux
import { connect } from 'react-redux';
// provider
import { withAnonymous } from '../providers/session';
// action
import { sessionStarted } from '../actions/session';
// constants
import * as LOCALSTORAGE from '../constants/localstorage'


class MainQuark extends Component {
  // User behavior test ==================================
  state = {
    quark: null,
    logSent: true
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps.quark, prevState.quark) && (nextProps.quark.status !== 0)) {
      return { quark: nextProps.quark, logSent: false }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.logSent) {
      this.logUser(this.state.quark)
    }
  }

  logUser = quark => {
    this.setState({ logSent: true })

    const now = new Date()
    const timestamp = this.props.firebase.generateTimestampType(now)

    let locale = JSON.parse(localStorage.getItem(LOCALSTORAGE.LOCALE));
    if (!locale || locale !== 'ja') {
      locale = 'en'
    }


    const log = {
      uuid: this.props.authUser.uid,
      is_session_start: this.props.is_session_start,
      quark_name: this.props.quark.name,
      quark_id: this.props.quark.id,
      locale,
      timestamp
    }

    // this.props.firebase.user_log('hoge').set(log)
    this.props.firebase.user_logs().add(log)
    this.props.sessionStarted()
  }
  // =====================================================

  render () {
    const { quark } = this.props;
    if (!quark) {
	    return <div>Loading...</div>;
    }

	  return (
      <div className="col-md-3 card subject-main">
        <div className="subject-image">
          <img src={quark.image_path} className="card-img-top" alt={quark.name} />
        </div>

        <div className="card-block">
          <h1 className="card-title">{quark.name}
            {(() => { if (quark.url) return (
               <sub>
                 <a href={quark.url} target="_blank" rel="noopener noreferrer" className="glyphicon glyphicon-globe"> </a>
               </sub>
	          );})()}
          </h1>
          <p>{quark.period_str}</p>
          <p>{quark.description}</p>

          {(() => { if (quark.affiliate) return (
		         <p><a href={quark.affiliate} target="_blank" rel="noopener noreferrer" >
               <FormattedMessage id="button_buy" defaultMessage={`Buy Now`} />
   		       </a></p>
	        );})()}

          <p><Link to={`/relations/add/${quark.id}`} className="btn btn-primary">Add relation</Link></p>
        </div>
      </div>
	  );
  }
}

export default connect(state => state, { sessionStarted })(withAnonymous(MainQuark))
