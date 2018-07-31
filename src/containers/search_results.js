// general
import axios from 'axios';
// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// component
import Quarks from '../components/quarks';
// action
import { searchQuarks } from '../actions/quark';


class SearchResults extends Component {
    componentWillMount() {
	// const { qtype_properties, privacy } = this.props;
	// this.props.searchQuarks(qtype_properties, this.props.match.params.keywords, privacy);
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.match.params.keywords !== this.props.match.params.keywords) {
	    this.props.searchQuarks(nextProps.qtype_properties, nextProps.match.params.keywords, nextProps.privacy);
	}
    }

    quarkFetcher = (page) => {
	const { qtype_properties, privacy } = this.props;
	this.props.searchQuarks(qtype_properties, this.props.match.params.keywords, privacy, 100, page);
    }

    render () {
	const { current_quarks } = this.props;
	return (
           <Quarks
              quark_property_caption={this.props.match.params.keywords + "の検索結果"}
              current_quarks={current_quarks}
              quarkFetcher={this.quarkFetcher} />
	)
    }
}

export default connect(state => state, { searchQuarks })(SearchResults);
