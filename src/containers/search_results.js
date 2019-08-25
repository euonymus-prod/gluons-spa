// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// component
import Quarks from '../components/quarks';
// action
// import { initQuarks, searchQuarks } from '../actions/quark';

import Api from '../utils/api'

class SearchResults extends Component {
  componentDidMount() {
	  // this.props.initQuarks()

	  // const { qtype_properties, privacy } = this.props;
	  // this.props.searchQuarks(qtype_properties, this.props.match.params.keywords, privacy);
	  document.title = this.props.match.params.keywords +  "の検索結果 -\nグルーオンズ"
  }

  quarkFetcher = async (page) => {
	  // const { qtype_properties, privacy } = this.props;
    // 	  this.props.searchQuarks(qtype_properties, this.props.match.params.keywords, privacy, 100, page);

	  const { privacy } = this.props;
    const api = new Api(true)
    const params = {
      limit: 100,
      page
    }
    const result = await api.call(`quarks/${privacy}?keywords=${this.props.match.params.keywords}`, 'get', params)
    return result.data
  }

  render () {
	  return (
      <Quarks
        ref='quarksComponent'
        quark_property_caption={this.props.match.params.keywords + "の検索結果"}
        quarkFetcher={this.quarkFetcher} />
	  )
  }
}

// export default connect(state => state, { initQuarks, searchQuarks })(SearchResults);
export default connect(state => state, { })(SearchResults);
