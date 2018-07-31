// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// common util
import Util from '../utils/common';


class SubGluon extends Component {
    gluedQuark() {
	if (this.props.sub_quark_id == this.props.gluon.active_id) {
	    return this.props.gluon.passive
	} else if (this.props.sub_quark_id == this.props.gluon.passive_id) {
	    return this.props.gluon.active
	}
	return '';
    }

    relationText() {
	this.props.gluon
	this.gluedQuark();

	if (this.props.sub_quark_id == this.props.gluon.active_id) {
            return (
              <span>
                  <Link to={`/subjects/relations/${this.gluedQuark().name}`}>{this.gluedQuark().name}</Link> {this.props.gluon.relation} {this.props.gluon.suffix}
              </span>
	    );
	} else if (this.props.sub_quark_id == this.props.gluon.passive_id) {
            return (
              <span>
                   <Link to={`/subjects/relations/${this.gluedQuark().name}`}>{this.gluedQuark().name}</Link> は
                   {this.props.gluon.passive.name} {this.props.gluon.relation} {this.props.gluon.suffix}
              </span>
	    );
	}
	return '';
    }

    render () {
	let util = new Util();
	return (
           <li>
              <Link to={`/subjects/relations/${this.gluedQuark().name}`} style={{marginRight:'15px'}}>
                 <img src={this.gluedQuark().image_path} width="40px" height="40px" alt=""/>
              </Link>
              {this.relationText()}
              <br /> {util.period2str(this.props.gluon)}
           </li>
	)
    }
}
export default connect(state => state)(SubGluon);
