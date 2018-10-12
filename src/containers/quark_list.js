// react
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
// redux
import { connect } from 'react-redux';
// component
import Quarks from '../components/quarks';
// action
import { initQuarks, fetchQuarks } from '../actions/quark';


class QuarkList extends Component {
    static propTypes = {
	intl: intlShape.isRequired
    }

    componentDidMount() {
	// const { qtype_properties, privacy } = this.props;
	// this.props.fetchQuarks(qtype_properties, privacy);
	this.props.initQuarks()
	document.title = "Quarks -\n" +  this.props.intl.formatMessage(
	    {
		id: 'noun_gluons',
		defaultMessage: "gluons"
	    }
	)
    }

    quarkFetcher = (page) => {
	const { qtype_properties, privacy } = this.props;
	this.props.fetchQuarks(qtype_properties, privacy, 100, page);
	return false
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

export default connect(state => state, { initQuarks, fetchQuarks })(injectIntl(QuarkList));

