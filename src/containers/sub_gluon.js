// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// common util
import Util from '../utils/common';


class SubGluon extends Component {
    constructor(props) {
	super(props);

	let locale = JSON.parse(localStorage.getItem('locale'));
	if (!locale) {
	    locale = 'en'
	}

	this.state = {
	    locale
	};
    }

    gluedQuark() {
	if (this.props.sub_quark_id === this.props.gluon.active_id) {
	    return this.props.gluon.passive
	} else if (this.props.sub_quark_id === this.props.gluon.passive_id) {
	    return this.props.gluon.active
	}
	return '';
    }

    relationText() {
	this.gluedQuark();

	let glue_sentence_before_link = ''
	let glue_sentence_after_link = ' '
	if (this.props.sub_quark_id === this.props.gluon.active_id) {
	    if (this.state.locale === 'ja') {
		glue_sentence_after_link += this.props.gluon.relation
	    } else {
		glue_sentence_before_link = this.props.gluon.active.name + ' ' + this.props.gluon.relation + ' '
	    }
	    glue_sentence_after_link += this.props.gluon.suffix

	} else if (this.props.sub_quark_id === this.props.gluon.passive_id) {
	    if (this.state.locale === 'ja') {
		glue_sentence_after_link += 'は' + this.props.gluon.passive.name + this.props.gluon.relation
	    } else {
		glue_sentence_after_link += this.props.gluon.relation + ' ' + this.props.gluon.passive.name + ' '
	    }
	    glue_sentence_after_link += this.props.gluon.suffix

	} else {
	    return '';
	}
	return (
              <span>
                  {glue_sentence_before_link}
                  <Link to={`/subjects/relations/${this.gluedQuark().name}`}>{this.gluedQuark().name}</Link>
                  {glue_sentence_after_link}
              </span>
	)
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
