// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// component
import TopPickupDetail from '../components/top_pickup_detail';
// action
import { fetchPickups } from '../actions/quark';

class TopPickups extends Component {
  state = {
	  pickups: []
  }

  componentDidMount() {
	  if (this.props.pickups.length === 0) {
	    this.props.fetchPickups(this.props.qtype_properties);
	  }
  }

  static getDerivedStateFromProps(props, state) {
	  if (_.isEqual(props.pickups, state.pickups) === false) {
	    return {
		    pickups: props.pickups
	    }
	  }
	  return null
  }

  renderPickups() {
	  const { pickups } = this.state;
	  return _.map(pickups, pickup => {
	    return (
        <div key={pickup.values.id} className="col-md-3">
          <TopPickupDetail pickup={pickup.values}/>
        </div>
	    );
	  });
  }

  render () {
	  return (
      <div className="top-pickup-links center-block">
        <div className="row">
          {this.renderPickups()}
		    </div>
      </div>
	  )
  }
}
export default connect(state => state, { fetchPickups })(TopPickups);
