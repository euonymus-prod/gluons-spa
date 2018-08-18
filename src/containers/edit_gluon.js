/*
Thanks to redux-form
   https://redux-form.com/6.0.5/docs/gettingstarted.md/
*/
// react
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
// redux
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// component
import Navbar from './navbar';
// action
import { execLogout } from '../actions/login';
import { fetchGluonTypes } from '../actions/gluon_types';
import { fetchEditingGluon, editGluon } from '../actions/gluon';
// common util
import LoginUtil from '../utils/login';


const validate = values => {
  const errors = {}
  // if (!values.gluon_type_id) {
  //   errors.gluon_type_id = 'Must choose Gluon Type'
  // }
  if (!values.relation) {
    errors.relation = 'Required'
  } else if (values.relation.length > 255) {
    errors.name = 'Must be less than 255'
  }
  if (values.suffix && values.suffix.length > 255) {
    errors.suffix = 'Must be less than 255'
  }
  if (values.start_accuracy && !['year', 'month'].includes(values.start_accuracy)) {
    errors.start_accuracy = 'Must be either of "year" or "month"'
  }
  if (values.end_accuracy && !['year', 'month'].includes(values.end_accuracy)) {
    errors.end_accuracy = 'Must be either of "year" or "month"'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="input text">
     <label htmlFor={input.id}>{label}</label>
     {/*  required="required" maxLength="255" id="name" */ }
     <input {...input} placeholder={label} type={type} className="form-control" />
     {touched && (error && <span className="validation-error">{error}</span>)}
  </div>
)

class EditGluon extends Component {
    componentWillMount() {
	const { gluon_types } = this.props;
        if (!gluon_types) {
            this.props.fetchGluonTypes();
        }
        // initialize
        // MEMO: fetchEditingGluon might need to be called in componentWillReceiveProps as well.
        this.props.fetchEditingGluon(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        // initialize
	const login_util = new LoginUtil();
	if (!login_util.isLoggedIn(nextProps.logged_in_user)) {
	    this.props.history.push('/');
	}

	// after editing post
	if (nextProps.submit_count > this.props.submit_count) {

	    if (nextProps.editing_gluon) {
		if (!nextProps.editing_gluon.message) {
		    alert('Please login again');
		    this.props.execLogout();
		} else {
		    alert(nextProps.editing_gluon.message);
		}

		if (nextProps.editing_gluon.status === 1) {
	    	    this.props.history.push('/subjects/relations/' + nextProps.editing_gluon.result.active.name);
		}
	    }
	}
    }

    onSubmit = (values) => {
	if (!values.is_momentary) {
	    values.is_momentary = 0;
	}
	if (!values.is_exclusive) {
	    values.is_exclusive = 0;
	}
	this.props.editGluon(values);
    }

    renderSelect = ({ input, label, type, meta: { touched, error } }) => (
  <div className="input select">
     <label htmlFor="gluon-type-id">Gluon Type</label>
     <Field name="gluon_type_id" id="gluon-type-id" component="select">
        {this.renderGluonTypes()}
     </Field>
     {touched && (error && <span className="validation-error"><br />{error}</span>)}
  </div>
    )

    renderGluonTypes() {
	const { gluon_types } = this.props;
	if (!gluon_types) {
	    return '';
	}

	let select_options = {0: '-- Select one --', ...gluon_types}
	return Object.keys(select_options).map((value, index) => {
	    return (
               <option value={value} key={value}>{select_options[value]}</option>
	    );
	});
    }



 render () {
     const { editing_gluon, gluon_types } = this.props;
     if (!editing_gluon || (editing_gluon.status !== -1) || !gluon_types) {
	 return ''
     }

  const { handleSubmit } = this.props;
  return (
      <div>
         <Navbar />
      <div className="container">
        <div className="">
           <h2>
              <FormattedMessage
                 id="title_edit_gluon"
                 defaultMessage={`Relation between { active_quark } and { passive_quark }`}
                 values={{ active_quark: <span>{editing_gluon.active.name}</span>,
			   passive_quark: <span>{editing_gluon.passive.name}</span>
		 }} />
           </h2>
        </div>

        <div>
           <form onSubmit={handleSubmit(this.onSubmit)} acceptCharset="utf-8">
              <fieldset>
                 <legend>Edit Gluon</legend>
                 <div className="form-group">

                    <Field name="gluon_type_id" component={this.renderSelect}
                           type="select" id="gluon-type-id" label="Gluon Type" />
                    <br />
                    <FormattedMessage
                       id="message_edit_gluon_part1"
                       defaultMessage={`{ active_quark }`}
                       values={{ active_quark: <span>{editing_gluon.active.name}</span>,
		                 passive_quark: <span>{editing_gluon.passive.name}</span>
                    }} />


                    <Field name="relation" component={renderField} type="text" id="relation" label="Relation" />

                    <FormattedMessage
                       id="message_edit_gluon_part2"
                       defaultMessage={`{ passive_quark }`}
                       values={{passive_quark: <span>{editing_gluon.passive.name}</span>}} />

                    <Field name="suffix" component={renderField} type="text" id="suffix" label="Suffix" />
                    <hr />

                    <div className="input text">
                       <label htmlFor="url">Start</label>
                       <Field type='date' component="input" className="form-control date" name="start" />
                       <label htmlFor="url">End</label>
                       <Field type='date' component="input" className="form-control date" name="end" />
                    </div>

                    <Field name="start_accuracy" component={renderField} type="text" id="start-accuracy" label="Start Accuracy" />
                    <Field name="end_accuracy" component={renderField} type="text" id="end-accuracy" label="End Accuracy" />

                    <div className="input checkbox">
                       <label htmlFor="is-momentary">
                          <Field name="is_momentary" id="is-momentary" component="input" type="checkbox" />
                          Is Momentary
                       </label>
                    </div>
                    <div className="input checkbox">
                       <label htmlFor="is-exclusive">
                          <Field name="is_exclusive" id="is-exclusive" component="input" type="checkbox" />
                          Is Exclusive
                       </label>
                    </div>

                 </div>
              </fieldset>
              <button className="btn btn-primary" type="submit">Submit</button>
           </form>
        </div>
      </div>
      </div>
  )
 }
}
const EditGluonForm = reduxForm({
  form: 'edit_gluon',
  enableReinitialize: true
})(EditGluon)

export default connect(
  ({ logged_in_user, gluon_types, editing_gluon, submit_count }, ownProps) => {
    let ret = { 
	initialValues: editing_gluon,
	validate,
	logged_in_user, gluon_types, editing_gluon, submit_count
    };
    return ret
  },
    { fetchGluonTypes, fetchEditingGluon, editGluon, execLogout }
)(withRouter(EditGluonForm))
