// react
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
// redux
import { connect } from 'react-redux';
// component
import Quarks from '../components/quarks';
// action
// import { initQuarks, fetchQuarks } from '../actions/quark';

import Api from '../utils/api'


class QuarkList extends Component {
  static propTypes = {
	  intl: intlShape.isRequired
  }

  componentDidMount() {
	  // const { qtype_properties, privacy } = this.props;
	  // this.props.fetchQuarks(qtype_properties, privacy);
	  // this.props.initQuarks()
	  document.title = "Quarks -\n" +  this.props.intl.formatMessage(
	    {
		    id: 'noun_gluons',
		    defaultMessage: "gluons"
	    }
	  )
  }

  quarkFetcher = async (page) => {
	  // const { qtype_properties, privacy } = this.props;
    // 	  this.props.fetchQuarks(qtype_properties, privacy, 100, page);
    // 	  return false

	  const { privacy } = this.props;
    const api = new Api(true)
    const params = {
      limit: 100,
      page
    }
    const result = await api.call(`quarks/${privacy}`, 'get', params)
    return result.data
  }

  render () {
	  return (
      <Quarks
        quark_property_caption="Quarks"
        quarkFetcher={this.quarkFetcher} />
	  )
  }
}

// export default connect(state => state, { initQuarks, fetchQuarks })(injectIntl(QuarkList));
export default connect(state => state, { })(injectIntl(QuarkList));

