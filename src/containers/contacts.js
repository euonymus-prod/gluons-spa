// general
// react
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// component
import Navbar from './navbar';
// action
import { sendContactForm } from '../actions/contact';


const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 255) {
    errors.name = 'Must be less than 255'
  }
  if (!values.organization) {
    errors.organization = 'Required'
  } else if (values.organization.length > 255) {
    errors.organization = 'Must be less than 255'
  }
  if (!values.department) {
    errors.department = 'Required'
  } else if (values.department.length > 255) {
    errors.department = 'Must be less than 255'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (values.email.length > 255) {
    errors.email = 'Must be less than 255'
  }
  if (!values.topic) {
    errors.topic = 'Required'
  }
  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length > 2000) {
    errors.body = 'Must be less than 255'
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
const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="input text">
     <label htmlFor={input.id}>{label}</label>
     {/*  required="required" maxLength="255" id="name" */ }
     <textarea {...input} placeholder={label} type={type} className="form-control" />
     {touched && (error && <span className="validation-error">{error}</span>)}
  </div>
)
const renderSelect = ({ input, label, type, meta: { touched, error } }) => (
  <div className="input select">
     <label htmlFor={input.id}>{label}</label>
     <Field name="topic" id="topic" component="select">
        <option value="">(Select one topic)</option>
        <option value="About Service">About Service</option>
        <option value="Business relationship">Business relationship</option>
        <option value="Media coverage">Media coverage</option>
        <option value="Other">Other</option>
     </Field>
     {touched && (error && <span className="validation-error"><br />{error}</span>)}
  </div>
    )

class Contacts extends Component {
    componentWillReceiveProps(nextProps) {
	// after editing post
	if (nextProps.submit_count > this.props.submit_count) {
	    if (nextProps.contact_form) {
		if (nextProps.contact_form.message) {
		    alert(nextProps.contact_form.message);
		}
	    }
	}
    }


    onSubmit = (values) => {
	this.props.sendContactForm(values);
    }

 render () {
  const { handleSubmit } = this.props;
  return (
      <div>
         <Navbar />
      <div className="container">
         <h1>contact us</h1>
         <div className="jumbotron contact-us">
            <img src="/img/logo.gif" />
            <p>Leverage your knowledge by seeking relations among things, people, ETC. If you’d like to know more about how we can help you, put down anything here.</p>

            <form onSubmit={handleSubmit(this.onSubmit)} acceptCharset="utf-8" className="search_top">
               <div className="form-group center-block input-container-top">
                  <Field name="name" component={renderField} type="text" id="name" label="Name" />

                  <Field name="organization" component={renderField} type="text" id="organization" label="Organization" />

                  <Field name="department" component={renderField} type="text" id="department" label="Department" />
      
                  <Field name="email" component={renderField} type="email" id="email" label="Email" />
      
                  <br />
                  <Field name="topic" component={renderSelect} type="select" id="topic" label="Topic" />

                  <Field name="body" component={renderTextarea} type="textarea" id="body" rows="5" label="Body" />
               </div>
               <button className="btn btn-primary" type="submit">Contact us</button>
            </form>
         </div>
         <p>'gluons' is a database of relations among anything in the universe.</p>
      </div>
      </div>
  )
 }
}
export default  reduxForm({
  form: 'contact_form',
  validate,
})(withRouter(connect(state => state, { sendContactForm })(Contacts)));
