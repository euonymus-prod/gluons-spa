// general
import _ from 'lodash';
import axios from 'axios';
// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// component
import TopPickupDetail from '../components/top_pickup_detail';
// action
import { fetchPickups } from '../actions/quark';



class TopPickups extends Component {
    componentWillMount() {
	const { pickups, qtype_properties } = this.props;
	if (pickups.length == 0) {
	    this.props.fetchPickups(qtype_properties);
	}
    }

    renderPickups() {
	const { pickups } = this.props;
	return _.map(pickups, pickup => {
	    return (
               <div key={pickup.id} className="col-md-3">
                  <TopPickupDetail pickup={pickup}/>
               </div>
	    );
	});
    }

    render () {
	const { pickups } = this.props;
	if (pickups.length == 0) {
	    return '';
	}

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
