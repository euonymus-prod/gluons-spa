// Thanks to:  react-autosuggest
//   https://github.com/moroshko/react-autosuggest
//
//Thanks to redux-form
//   https://redux-form.com/6.0.5/docs/gettingstarted.md/
// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
// redux
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// component
import Navbar from './navbar';
// action
import { execLogout } from '../actions/login';
import { fetchGluonTypes } from '../actions/gluon_types';
import { fetchEditingQuark, readEditingQuark, searchQuarks } from '../actions/quark';
import { addGluon } from '../actions/gluon';
// common util
import LoginUtil from '../utils/login';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
   <div className="autocomplete-item">
      <img src={suggestion.image_path} />
      {suggestion.name}
   </div>
);

const validate = values => {
  const errors = {}
  if (!values.gluon_type_id) {
    errors.gluon_type_id = 'Must choose Gluon Type'
  }
  // Autosuggested value cannot be validated here
  // if (!values.passive) {
  //   errors.passive = 'Required'
  // } else if (values.passive.length > 255) {
  //   errors.name = 'Must be less than 255'
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

class AddGluon extends Component {
    constructor(props) {
	super(props);

	// Autosuggest is a controlled component.
	// This means that you need to provide an input value
	// and an onChange handler that updates this value (see below).
	// Suggestions also need to be provided to the Autosuggest,
	// and they are initially empty because the Autosuggest is closed.
	this.state = {
	    value: '',
	    suggestions: []
	};
	// this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event, { newValue }) => {
	this.setState({
	    value: newValue
	}, () => {
	    if (this.state.value && this.state.value.length > 1) {
		if (this.state.value.length % 2 === 0) {
		    this.debouncedGetInfo();
		}
	    } else if (!this.state.value) {
	    }
	});
    };

    debouncedGetInfo = _.debounce(() => {
	this.props.searchQuarks(this.props.qtype_properties, this.state.value, this.props.privacy);
    }, 300);

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
	// Usually, this method fetch the suggestions data. But this case, class fetches right after api call.
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
	this.setState({
	    suggestions: []
	});
    };

    componentWillMount() {
	const { qtype_properties, quarks, gluon_types } = this.props;
        if (!gluon_types) {
            this.props.fetchGluonTypes();
        }
        // initialize
        if (qtype_properties && (Object.keys(quarks.list).length == 0)) {
            this.props.fetchEditingQuark(this.props.match.params.quark_id, qtype_properties);
	}
    }

    componentWillReceiveProps(nextProps) {
        // initialize
	const login_util = new LoginUtil();
	if (!nextProps.editing_quark ||
	    (nextProps.match.params.quark_id != nextProps.editing_quark.id)) {
	    this.props.readEditingQuark(nextProps.match.params.quark_id, nextProps.quarks);
	} else if (!login_util.isLoggedIn(nextProps.logged_in_user)) {
	    // !Important: Authorization check. This has to be after initialization of editing_quark
	    this.props.history.push('/');
	}

	if (nextProps.current_quarks) {
	    this.setState({
		suggestions: nextProps.current_quarks.results
	    })
	}

	// after editing post
	if (nextProps.submit_count > this.props.submit_count) {

	    if (nextProps.added_gluon) {
		if (!nextProps.added_gluon.message) {
		    alert('Please login again');
		    this.props.execLogout();
		} else {
		    alert(nextProps.added_gluon.message);
		}

		if (nextProps.added_gluon.status == 1) {
		    this.props.history.push('/subjects/relations/' + nextProps.editing_quark.name);
		}
	    }
	}
    }

    onSubmit = (values) => {
	if (!this.state.value) {
	    alert('Quark to glue is required');
	    return false;
	} else if (this.state.value.length > 255) {
	    alert('Quark to glue must be less than 255');
	    return false;
	}

	values.passive = this.state.value;
	if (!values.is_momentary) {
	    values.is_momentary = 0;
	}
	if (!values.is_exclusive) {
	    values.is_exclusive = 0;
	}
	this.props.addGluon(this.props.editing_quark.id, values);
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
	return Object.keys(gluon_types).map((value, index) => {
	    return (
               <option value={value} key={value}>{gluon_types[value]}</option>
	    );
	});
    }



 render () {
     const { value, suggestions } = this.state;
     const { editing_quark, gluon_types } = this.props;
     if (!editing_quark || !gluon_types) {
	 return ''
     }

	// Autosuggest will pass through all these props to the input.
	const inputProps = {
	    placeholder: 'Search a Quark to glue',
            className: "form-control",
	    name:'passive',
	    value,
	    onChange: this.handleInputChange
	};


  const { handleSubmit } = this.props;
  return (
      <div>
         <Navbar />
      <div className="container">
        <div className="">
           <h2>Adding new gluon on {editing_quark.name}</h2>
        </div>

        <div>
           <form onSubmit={handleSubmit(this.onSubmit)} acceptCharset="utf-8">
              <fieldset>
                 <legend>Add New Gluon</legend>
                 <div className="form-group">

                    <Field name="gluon_type_id" component={this.renderSelect}
                           type="select" id="gluon-type-id" label="Gluon Type" />
                    <br />


                    <div className="input text">
                       <label htmlFor="passive">Quark you glue</label>
                       <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                       />
                    </div>
{/*
                    <Field name="passive" component={renderField} type="text" id="passive" label="Passive" />
*/}
                    <Field name="relation" component={renderField} type="text" id="relation" label="Relation" />
                    <Field name="suffix" component={renderField} type="text" id="suffix" label="Suffix" />

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
export default  reduxForm({
  form: 'add_gluon', // a unique name for this form
　initialValues: {'gluon_type_id':'1', 'is_exclusive': true},
  validate,
})(withRouter(connect(state => state, { fetchGluonTypes, addGluon, execLogout, fetchEditingQuark, readEditingQuark, searchQuarks })(AddGluon)));
