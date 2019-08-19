// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// component
import GluonList from '../components/gluon_list';
// action
import { fetchGluons } from '../actions/gluon';

class QuarkPropertyList extends Component {
  componentDidMount() {
	  // const { qtype_properties, current_quark, privacy } = this.props;
    // if (!current_quark.is_gluon_fetched) {
    //   this.props.fetchGluons(current_quark, qtype_properties, privacy);
    // }
  }

  componentWillReceiveProps(nextProps) {
    // if ((nextProps.privacy !== this.props.privacy) || !nextProps.current_quark.is_gluon_fetched) {
    //   this.props.fetchGluons(nextProps.current_quark, nextProps.qtype_properties, nextProps.privacy);
    // }
  }

  renderQuarkProperties() {
	  // const { current_quark } = this.props;
    // 	  if (!current_quark.quark_properties) {
    // 	    return '';
    // 	  }

    // return _.map(current_quark.quark_properties, quark_property => {
    return _.map(this.props.gluons_by_properties, gluons_by_property => {
	    // if (!quark_property) {
      if (gluons_by_property.gluons_related.length === 0) {
		    return '';
      }
      return (
        <div key={gluons_by_property.quark_property.name}>
          <GluonList
            gluons_by_property={gluons_by_property}
            subject={this.props.subject}
 		      />
        </div>
      );
    });
  }

  render () {
	  // const { current_quark } = this.props;
    // 	  if (!current_quark.is_gluon_fetched) {
    // 	    return <div></div>;
    // 	  }

    return (
      <div>
 		    {this.renderQuarkProperties()}
 	    </div>
 	  )
  }
}

function mapStateToProps({ privacy }, ownProps) {
  return { privacy };
}
export default connect(mapStateToProps, { fetchGluons })(QuarkPropertyList);
