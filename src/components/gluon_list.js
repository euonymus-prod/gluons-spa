// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
// component
import Gluon from '../containers/gluon';
// constants
import * as LOCALSTORAGE from '../constants/localstorage'

class GluonList extends Component {
  renderGluons() {
    const first = this.props.gluons_by_property.gluons_related[0]
 	  // var first = this.props.quark_property.gluons[0];

    // return _.map(this.props.quark_property.gluons, gluon => {
  	return _.map(this.props.gluons_by_property.gluons_related, gluon => {
      if (!gluon) {
  		  return '';
  	  }
      return (
        <div key={gluon.relation.values.id}>
          {(() => {
             if (gluon.relation.values.id !== first.relation.values.id)
               return <hr />;
          })()}
          <Gluon gluon={gluon} subject={this.props.subject} />
        </div>
      )
    });
  }
  
  render () {

    let paragraph_title = this.props.gluons_by_property.quark_property.caption
 	  let locale = JSON.parse(localStorage.getItem(LOCALSTORAGE.LOCALE));
  	if (locale && locale === 'ja') {
      paragraph_title = this.props.gluons_by_property.quark_property.caption_ja
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
