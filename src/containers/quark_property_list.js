// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// component
import GluonList from '../components/gluon_list';
// action
import { fetchGluons } from '../actions/gluon';

class QuarkPropertyList extends Component {
    componentWillMount() {
	const { qtype_properties, current_quark, privacy } = this.props;
    	if (!current_quark.is_gluon_fetched) {
            this.props.fetchGluons(current_quark, qtype_properties, privacy);
        }
    }

    componentWillReceiveProps(nextProps) {
    	if ((nextProps.privacy !== this.props.privacy) || !nextProps.current_quark.is_gluon_fetched) {
            this.props.fetchGluons(nextProps.current_quark, nextProps.qtype_properties, nextProps.privacy);
    	}
    }

    renderQuarkProperties() {
	const { current_quark } = this.props;
	if (!current_quark.quark_properties) {
	    return '';
	}
        return _.map(current_quark.quark_properties, quark_property => {
	    if (!quark_property) {
		return '';
	    }
            return (
               <div key={quark_property.quark_property.id}>
                    <GluonList
                        quark_property={quark_property.quark_property}
		    />
               </div>
            );
        });
    }

    render () {
	const { current_quark } = this.props;
	if (!current_quark.is_gluon_fetched) {
	    return <div></div>;
	}

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
