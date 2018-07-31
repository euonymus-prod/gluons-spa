// general
import axios from 'axios';
// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// component
import Quarks from '../components/quarks';
// action
import { fetchQuarks } from '../actions/quark';


class QuarkList extends Component {
    componentWillMount() {
	// const { qtype_properties, privacy } = this.props;
	// this.props.fetchQuarks(qtype_properties, privacy);
    }

    componentWillReceiveProps(nextProps) {
	// if ( next page ) {
	//     this.props.fetchQuarks(nextProps.qtype_properties, nextProps.privacy);
	// }
    }

    quarkFetcher = (page) => {
	const { qtype_properties, privacy } = this.props;
	this.props.fetchQuarks(qtype_properties, privacy, 100, page);
    }

    render () {
	const { current_quarks } = this.props;
	return (
           <Quarks
              quark_property_caption="Quarks"
              current_quarks={current_quarks}
              quarkFetcher={this.quarkFetcher} />
	)
    }
}

export default connect(state => state, { fetchQuarks })(QuarkList);

