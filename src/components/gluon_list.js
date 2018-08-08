// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
// component
import Gluon from '../containers/gluon';


class GluonList extends Component {
    renderGluons() {
	var first = this.props.quark_property.gluons[0];
	return _.map(this.props.quark_property.gluons, gluon => {
	    if (!gluon) {
		return '';
	    }
	    return (
		<div key={gluon.id}>
                    {(() => {
                        if (gluon.id !== first.id)
                        return <hr />;
                    })()}
                    <Gluon gluon={gluon} />
		</div>
	    );
	});
    }

    render () {
	if (!this.props.quark_property.gluons || this.props.quark_property.gluons.length === 0) {
	    return '';
	}

	let paragraph_title = this.props.quark_property.caption
	let locale = JSON.parse(localStorage.getItem('locale'));
	if (locale && locale === 'ja') {
	    paragraph_title = this.props.quark_property.caption_ja
	}

	return (
           <div>
               <h2>{paragraph_title}</h2>
               <div className="related" >
                   <div className="well subject-relation white">
                       {this.renderGluons()}
                   </div>
               </div>
	   </div>
	)
    }
}
export default GluonList;
