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
    componentWillMount() {
	this.loadMore(1)
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.quark_property_caption !== this.props.quark_property_caption) {
	    this.loadMore(1)
	}
    }

    renderQuarks() {
	const { current_quarks } = this.props;
	if (current_quarks.results.length === 0) {
	    if (current_quarks.pagination.has_next) {
		return '';
	    } else {
		return 'No results';
	    }
	}

	var first = current_quarks.results[0];
	if (!first.id) {
	    return 'failed to fetch';
	}

	return _.map(current_quarks.results, quark => {
	    return (
		<div key={quark.id}>
                    {(() => {
                        if (quark.id !== first.id)
                        return <hr />;
                    })()}
                    <QuarkInList quark_in_list={quark} />
		</div>
	    );
	});
    }

    loadMore = (page) => {
	this.props.quarkFetcher(page);
    }

    render () {
	const { quark_property_caption, current_quarks } = this.props;
	return (
      <div>
         <Navbar />
      <div className="container">
           <div>
               <h2>{quark_property_caption}</h2>
               <div className="related" >
                   <div className="well subject-relation white">
      {(() => { if (current_quarks.results.length === 0) {
	    // NOTE: It's very impotant to unmount InfiniteScroll once here to reset its page.
	    if (current_quarks.pagination.has_next) {
		return 'Loading ...';
	    } else {
		return 'No results';
	    }
      } else { return (
                      <InfiniteScroll
                          pageStart={1}
                          loadMore={this.loadMore}
                          hasMore={current_quarks.pagination.has_next}
                          initialLoad={true}
                          threshold={250}
                          loader={<div className="loader" key={0}>Loading ...</div>} >
                          {this.renderQuarks()}
                      </InfiniteScroll>
      ) } })()}
                   </div>
               </div>
	   </div>
      </div>
      </div>
	)
    }
}

export default Quarks;

