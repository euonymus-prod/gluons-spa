// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// actions
import { fetchQuarkTypes } from '../actions/quark_types';
// common
import Util from '../utils/common';

// react-structured-data
// import { JSONLD, Generic, AggregateRating, GenericCollection, Review, Author, Location, Rating } from 'react-structured-data';
import { JSONLD, Generic } from 'react-structured-data';

class StructuredData extends Component {
    componentWillMount() {
	const { quark_types } = this.props;
        if (!quark_types) {
            this.props.fetchQuarkTypes();
        }
    }

    componentWillReceiveProps(nextProps) {
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
	}

	return {item, date}
    }

    render () {
	const { current_quark, quark_types } = this.props;
	if (!quark_types || !current_quark || !current_quark.quark_type_id || current_quark.quark_type_id === 1) {
            return ''
	}

	let schema = {name:current_quark.name,
		      description:current_quark.description,
		      image:current_quark.image_path,
		      url:current_quark.url}
	let startItem = this.convertStartItem(current_quark)
	let endItem = this.convertEndItem(current_quark)
	schema[startItem.item] = startItem.date
	schema[endItem.item] = endItem.date

	// if Article
	if (current_quark.quark_type_id === 7) {
	    schema['headline'] = current_quark.name
	}

	return (
<JSONLD>
    <Generic
        type={quark_types[current_quark.quark_type_id]}
        jsonldtype={quark_types[current_quark.quark_type_id]}
        schema={schema} >
{/*
      <AggregateRating ratingValue={4.3} reviewCount={197}/>
      <GenericCollection type="review">
        <Review name="It's awesome" reviewBody="This is Great! My family loves it" datePublished="11/22/1963">
          <Author name="Jerry"/>
          <Location name="Chicago, IL"/>
          <Rating ratingValue={5} />
        </Review>
        <Review name="Very cool" reviewBody="I like this a lot. Very cool product" datePublished="11/22/1963">
          <Author name="Cool Carl"/>
          <Location name="Chicago, IL"/>
          <Rating ratingValue={4} />
        </Review>
      </GenericCollection>
*/}
    </Generic>
  </JSONLD>
  )
 }
}
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps, { fetchQuarkTypes })(StructuredData);
