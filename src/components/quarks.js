// Thanks to react-infinite-scroller
//    github: https://github.com/CassetteRocks/react-infinite-scroller
// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
// component
import Navbar from '../containers/navbar';
import QuarkInList from './quark_in_list';

class Quarks extends Component {
  state = {
    quarks: [],
    api_result: null
  }

  componentDidMount() {
	  this.loadMore(1)
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.quark_property_caption !== this.props.quark_property_caption) {
	    this.loadMore(1)
    }
  }

  renderQuarks() {
	  const { quarks } = this.state;
	  if (quarks.length === 0) {
	    if (quarks.pagination.has_next) {
		    return '';
	    } else {
		    return 'No results';
	    }
	  }

	  var first = quarks[0];
	  if (!first.values.id) {
	    return 'failed to fetch';
	  }

	  return _.map(quarks, quark => {
	    return (
		    <div key={quark.values.id}>
          {(() => {
             if (quark.values.id !== first.values.id)
               return <hr />;
          })()}
          <QuarkInList quark_in_list={quark.values} />
		    </div>
	    );
	  });
  }

  loadMore = async (page) => {
	  const api_result = await this.props.quarkFetcher(page);
    if (api_result.results.length === 100) {
      // TODO: I can't figure out how to set has_next:true on CakePHP paginator without Model.
      // so briefly I just set always true here.
      api_result.pagination.has_next = true
    }

    let { quarks } = this.state
    if (page === 1) {
      quarks = api_result.results
    } else {
      quarks.push(...api_result.results)
    }
    this.setState({quarks, api_result})
  }

  render () {
	  const { quark_property_caption } = this.props
	  const { quarks, api_result } = this.state
	  return (
      <div>
        <Navbar />
        <div className="container">
          <div>
            <h2>{quark_property_caption}</h2>
            <div className="related" >
              <div className="well subject-relation white">
                {(quarks.length === 0) ? (
                  !api_result || api_result.pagination.has_next ? (
                    'Loading ...'
                  ) : (
                    'No results'
                  )
                ) : (
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.loadMore}
                    hasMore={api_result.pagination.has_next}
                    initialLoad={true}
                    threshold={250}
                    loader={<div className="loader" key={0}>Loading ...</div>} >
                    {this.renderQuarks()}
                  </InfiniteScroll>
                )}
              </div>
            </div>
	        </div>
        </div>
      </div>
	  )
  }
}
export default Quarks

