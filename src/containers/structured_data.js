// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// actions
import { fetchQuarkTypes } from '../actions/quark_types';
// common
import Util from '../utils/common';
import GluonUtil from '../utils/gluon';

// react-structured-data
import { JSONLD, Generic, GenericCollection } from 'react-structured-data';

let gluon_util = new GluonUtil();

class StructuredData extends Component {
  componentDidMount() {
	  const { quark_types } = this.props;
    if (!quark_types) {
      this.props.fetchQuarkTypes();
    }
  }

  convertStartItem = (quark) => {
	  let util = new Util();
	  let date = util.date2str(quark.start, quark.start_accuracy);

	  let item = 'startDate'

	  switch(parseInt(quark.quark_type_id, 10)) {
	    case 2:
	      item = 'birthDate'
	      break
	    case 3:
	    case 4:
	      item = 'dateCreated'
	      break
	    case 5:
	    case 6:
	    case 7:
	    case 8:
	    case 9:
	    case 10:
	    case 11:
	    case 12:
	    case 13:
	    case 14:
	    case 15:
	      item = 'datePublished'
	      break
	    case 22:
	    case 23:
	    case 24:
	    case 25:
	    case 26:
	    case 27:
	    case 28:
	    case 29:
	    case 30:
	    case 31:
	    case 32:
	    case 33:
	    case 34:
	    case 35:
	    case 36:
	    case 37:
	    case 38:
	    case 39:
	    case 40:
	      item = 'foundingDate'
	      break
	    case 52:
	      item = 'releaseDate'
	      break
	    default:
	  }

	  return {item, date}
  }

  convertEndItem = (quark) => {
	  let util = new Util();
	  let date = util.date2str(quark.end, quark.end_accuracy);

	  let item = 'dissolutionDate'

	  switch(parseInt(quark.quark_type_id, 10)) {
	    case 1:
	    case 16:
	    case 17:
	      item = 'endDate'
	      break
	    case 2:
	      item = 'deathDate'
	      break
	    case 3:
	    case 4:
	    case 5:
	    case 6:
	    case 7:
	    case 8:
	    case 9:
	    case 10:
	      item = 'expires'
	      break
	    default:
	  }

	  return {item, date}
  }

  buildSchemaForJsonLd = (quark) => {
	  let schema = {name:quark.name,
		              description:quark.description,
		              image:quark.image_path,
		              url:quark.url}
	  let startItem = this.convertStartItem(quark)
	  let endItem = this.convertEndItem(quark)
	  schema[startItem.item] = startItem.date
	  schema[endItem.item] = endItem.date

	  // if Article
	  if (quark.quark_type_id === 7) {
	    schema['headline'] = quark.name
	  }
	  return schema
  }

  render () {
	  const { current_quark, quark_types } = this.props;
	  if (!quark_types || !current_quark || !current_quark.quark_type_id || (current_quark.quark_type_id === 1) ||
	      !current_quark.is_gluon_fetched ) {
      return ''
	  }

	  // Generate GenericCollection List
	  let generic_collections = _.without(current_quark.quark_properties.map(quark_property_condition => {
	    if (!quark_property_condition ||
		      (quark_property_condition.id === 'active') || (quark_property_condition.id === 'passive')) {
		    return null
	    }
	    
	    let generic = quark_property_condition.quark_property.gluons.map(gluon => {

		    let glued_quark = gluon_util.gluedQuark(current_quark, gluon);
		    let sub_schema = this.buildSchemaForJsonLd(glued_quark)
	      
		    return (
		      <Generic
            key={gluon.id}
            jsonldtype={quark_types[glued_quark.quark_type_id]}
            schema={sub_schema} >
          </Generic>
		    )
	    })
	    
	    return (
	      <GenericCollection key={quark_property_condition.quark_property.id}
                           type={quark_property_condition.quark_property.caption}>
          {generic}
        </GenericCollection>
	    )
	  }), null)

	  if (generic_collections.length === 0 ) {
	    generic_collections = ''
	  }

	  // Generate for Quark
	  let schema = this.buildSchemaForJsonLd(current_quark)

	  return (
      <JSONLD>
        <Generic
          type={quark_types[current_quark.quark_type_id]}
          jsonldtype={quark_types[current_quark.quark_type_id]}
          schema={schema} >
          {generic_collections}
        </Generic>
      </JSONLD>
    )
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, { fetchQuarkTypes })(StructuredData);
