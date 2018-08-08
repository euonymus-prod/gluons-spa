// react
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// component
import SubGluonList from './sub_gluon_list';
// action
import { deleteGluon } from '../actions/gluon';
import { execLogout } from '../actions/login';
// common util
import Util from '../utils/common';
import GluonUtil from '../utils/gluon';

let gluon_util = new GluonUtil();

class Gluon extends Component {
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


    componentWillReceiveProps(nextProps) {
	// after editing post
	if (nextProps.submit_count > this.props.submit_count) {

	    if (nextProps.deleted_gluon) {
		if (nextProps.gluon.id === nextProps.deleted_gluon.gluon_id) {
		    if (!nextProps.deleted_gluon.message) {
			this.props.execLogout();
			alert('Please login again');
		    } else {
			alert(nextProps.deleted_gluon.message);
		    }

		    if (nextProps.deleted_gluon.status === 1) {
			this.props.history.push('/subjects/relations/' + nextProps.current_quark.name);
		    }
		}
	    }
	}
    }

    gluedQuark() {
	let res = gluon_util.gluedQuark(this.props.current_quark, this.props.gluon);
	if (!res) {
	    return '';
	}
	return res;
    }

    onDeleteClick = (event) => {
	if (window.confirm('Are you sure you want to delete?')) {
	    // let doc_name = 'post_delete_gluon_' + gluon_id;
	    // document.doc_name.submit();
	    this.props.deleteGluon(this.props.gluon.id)
	}
	return false;
    }

    renderGluonEdits(gluon) {
	return (
	   <span>
              <Link to={`/relations/edit/${gluon.id}`} className="glyphicon glyphicon glyphicon-pencil"></Link>
{/*
              <form name={`post_delete_gluon_${gluon.id}`} style={{display:"none"}} method="post" action={`/relations/delete/${gluon.id}`}>
                 <input type="hidden" name="_method" value="POST"/>
              </form>
*/}
              <button type="submit" className="plain" onClick={this.onDeleteClick}>
                 <i className="glyphicon glyphicon-remove-sign"></i>
              </button>
           </span>
	)
    }
    relationText() {
	let glue_sentence_before_link = ''
	let glue_sentence_after_link = ' '
	if (this.props.current_quark.id === this.props.gluon.active_id) {
            glue_sentence_before_link = this.props.gluon.active.name
	    if (this.state.locale === 'ja') {
		glue_sentence_before_link += 'は'
		glue_sentence_after_link += this.props.gluon.relation
	    } else {
		glue_sentence_before_link += ' ' + this.props.gluon.relation
	    }
	    glue_sentence_before_link += ' '
	    glue_sentence_after_link += this.props.gluon.suffix

	} else if (this.props.current_quark.id === this.props.gluon.passive_id) {
            glue_sentence_before_link = ''
	    if (this.state.locale === 'ja') {
		glue_sentence_after_link += 'は' + this.props.gluon.passive.name + this.props.gluon.relation
	    } else {
		glue_sentence_after_link += this.props.gluon.relation + ' ' + this.props.gluon.passive.name + ' '
	    }
	    glue_sentence_before_link += ' '
	    glue_sentence_after_link += this.props.gluon.suffix

	} else {
	    return '';
	}
	return (
               <h4 className="media-heading">
                  {glue_sentence_before_link}
                  <Link to={`/subjects/relations/${this.gluedQuark().name}`}>{this.gluedQuark().name}</Link>
                  {glue_sentence_after_link}&nbsp;
		  {this.renderGluonEdits(this.props.gluon)}
               </h4>
	)
    }

    render () {
	let util = new Util();
	return (
            <div className="subject-relation white">
                <div className="subject-relation-main">
                    <div className="media">
                        <div className="media-left subject-image">
                            <Link to={`/subjects/relations/${this.gluedQuark().name}`}><img src={this.gluedQuark().image_path} width="100px" height="100px" alt=""/></Link>
                        </div>
                        <div className="media-body">
		            {this.relationText()}
                            <p>{util.period2str(this.props.gluon)}</p>
                        </div>
                    </div>
                </div>
                <SubGluonList sub_quark={this.gluedQuark()} />
            </div>
	)
    }
}
// export default connect(state => state)(Gluon);
export default withRouter(connect(state => state, { deleteGluon, execLogout })(Gluon));

