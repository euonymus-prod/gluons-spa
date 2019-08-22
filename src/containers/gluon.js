// react
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// component
// import SubGluonList from './sub_gluon_list';
// action
import { deleteGluon } from '../actions/gluon';
import { execLogout } from '../actions/login';
// common util
import Util from '../utils/common';
import GluonUtil from '../utils/gluon';
// constants
import * as LOCALSTORAGE from '../constants/localstorage'

let gluon_util = new GluonUtil();

class Gluon extends Component {
  constructor(props) {
	  super(props);

	  let locale = JSON.parse(localStorage.getItem(LOCALSTORAGE.LOCALE));
	  if (!locale) {
	    locale = 'en'
	  }

	  this.state = {
	    locale,
      state: false,
      deleted: false
	  };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.deleted_gluon && !prevState.deleted) {
      if (nextProps.deleted_gluon.gluon_id === nextProps.gluon.relation.values.id) {
		    if (nextProps.deleted_gluon.message) {
			    alert(nextProps.deleted_gluon.message);
		    } else {
			    nextProps.execLogout();
			    alert('Please login again');
		    }
		    if (nextProps.deleted_gluon.status === 1) {
	        return { deleted: true }
			    // nextProps.history.push('/subjects/relations/' + nextProps.subject.values.name);
		    }
      }
		}
	  return null
  }

  gluedQuark() {
    const { gluon } = this.props
	  let res = gluon_util.gluedQuark(this.props.subject, gluon);
    if (!res) {
 	    return '';
 	  }
    return res
  }

  onDeleteClick = (event) => {
	  if (window.confirm('Are you sure you want to delete?')) {
	    // let doc_name = 'post_delete_gluon_' + gluon_id;
	    // document.doc_name.submit();
	    this.props.deleteGluon(this.props.gluon.relation.values.id)
	  }
	  return false;
  }

  renderGluonEdits(gluon) {
	  return (
	    <span>
        <Link to={`/relations/edit/${gluon.relation.values.id}`} className="glyphicon glyphicon glyphicon-pencil"></Link>
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
    const { gluon } = this.props
    let glue_sentence_before_link = ''
	  let glue_sentence_after_link = ' '
	  // if (this.props.current_quark.id === gluon.active_id) {
	  if (this.props.subject.identity === gluon.relation.start_node) {
      glue_sentence_before_link = gluon.active.values.name
	    if (this.state.locale === 'ja') {
		    glue_sentence_before_link += 'は'
		    glue_sentence_after_link += gluon.relation.values.relation
	    } else {
		    glue_sentence_before_link += ' ' + gluon.relation.values.relation
	    }
	    glue_sentence_before_link += ' '
      if (gluon.relation.values.suffix) {
	      glue_sentence_after_link += gluon.relation.values.suffix
      }
	  } else if (this.props.subject.identity === gluon.relation.end_node) {
      glue_sentence_before_link = ''
	    if (this.state.locale === 'ja') {
		    glue_sentence_after_link += 'は' + gluon.passive.values.name + gluon.relation.values.relation
	    } else {
		    glue_sentence_after_link += gluon.relation.values.relation + ' ' + gluon.passive.values.name + ' '
	    }
	    glue_sentence_before_link += ' '
      if (gluon.relation.values.suffix) {
	      glue_sentence_after_link += gluon.relation.values.suffix
      }
	  } else {
	    return '';
	  }
	  return (
      <h4 className="media-heading">
        {glue_sentence_before_link}
        <Link to={`/subjects/relations/${this.gluedQuark().values.name}`}>{this.gluedQuark().values.name}</Link>
        {glue_sentence_after_link}&nbsp;
		    {this.renderGluonEdits(gluon)}
      </h4>
	  )
  }

  render () {
    const { deleted } = this.state
    if (deleted) {
      return null
    }

    const { gluon } = this.props
    if (!gluon) {
      return null
    }
	  let util = new Util();
	  return (
      <div className="subject-relation white">
        <div className="subject-relation-main">
          <div className="media">
            <div className="media-left subject-image">
              <Link to={`/subjects/relations/${this.gluedQuark().values.name}`}><img src={this.gluedQuark().values.image_path} width="100px" height="100px" alt=""/></Link>
            </div>
            <div className="media-body">
		          {this.relationText()}
              <p>{util.period2str(gluon.relation.values)}</p>
            </div>
          </div>
        </div>
        {/*
        <SubGluonList sub_quark={this.gluedQuark()} />
        */}
      </div>
	  )
  }
}
// export default connect(state => state)(Gluon);
export default withRouter(connect(state => state, { deleteGluon, execLogout })(Gluon));

