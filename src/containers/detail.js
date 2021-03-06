// general
import _ from 'lodash';
// react
import React, { Component } from 'react';
import ReactGa from 'react-ga';
import { injectIntl, intlShape } from 'react-intl';
// redux
import { connect } from 'react-redux';
// component
import Navbar from './navbar';
import MainQuark from '../components/main_quark';
import QuarkPropertyList from './quark_property_list';
import StructuredData from './structured_data';
// action
import { initDetail } from '../actions/detail';
import { fetchCurrentQuark } from '../actions/quark';
import { changeCurrentQuark } from '../actions/quark';

class Detail extends Component {
  state = {
    sub_gluon_side: 'active',
  };

  activenessPattern = {
	  active: { activeActiveness: 'active', noneActiveness: ''},
	  none:   { activeActiveness: '', noneActiveness: 'active'}
  }

  static propTypes = {
	  intl: intlShape.isRequired
  }

  trackPage = page => {
	  ReactGa.set({
	    page,
		  // ...options,
	  });
	  ReactGa.pageview(page);
  };

  static getDerivedStateFromProps(props, state) {
	  let ret = null
	  if (_.isEqual(props.sub_gluon_side, state.sub_gluon_side) === false) {
	    let sub_gluon_side = 'active'
	    if (props.sub_gluon_side === 'none') {
		    sub_gluon_side = 'none'
	    }
	    ret = {
		    sub_gluon_side: sub_gluon_side
	    }
	  }
	  return ret
  }

  componentDidMount() {
	  ReactGa.initialize('UA-15649807-18');
	  this.trackPage(this.props.location.pathname);

    let sub_gluon_side = 'active';
    if ('sub_gluon_side' in this.props.match.params) {
      sub_gluon_side = this.props.match.params.sub_gluon_side;
    }
    this.props.initDetail(sub_gluon_side);
  }

  componentDidUpdate(prevProps){
	  document.title = this.props.match.params.quark_name +  " -\n" +  this.props.intl.formatMessage(
	    {
		    id: 'noun_gluons',
		    defaultMessage: "gluons"
	    }
	  )

	  const currentPage = this.props.location.pathname;
	  const prevPage = prevProps.location.pathname;
	  if (currentPage !== prevPage) {
      this.trackPage(currentPage);
	  }


    const { current_quark, qtype_properties, quarks, privacy } = this.props;
    // initialize

	  if (current_quark && current_quark.hasOwnProperty('status') && current_quark.status === 0) {
	    if (!prevProps.current_quark) {
		    alert(current_quark.message);
	    }
	    return false;
	  }
	  
    if (Object.keys(quarks.list).length === 0) {
	    if (quarks.error_message) {
		    alert(quarks.error_message)
	    } else {
		    this.props.fetchCurrentQuark(this.props.match.params.quark_name, qtype_properties, privacy);
	    }
	  } else if (
	    !current_quark ||
	    (prevProps.match.params.quark_name !== this.props.match.params.quark_name) ||
      (this.props.match.params.quark_name !== current_quark.name)
	  ) {
	    let newQuark = quarks.list[quarks.quark_name2id[this.props.match.params.quark_name]]
	    if (newQuark) {
	    	this.props.changeCurrentQuark(newQuark);
	    }
	  }
  }

  onLinkClick = (event) => {
	  event.preventDefault();
	  this.props.initDetail(event.target.name);
  }

  render () {
    const { current_quark, qtype_properties } = this.props;
    if (!current_quark) {
      return (
        <div className="container">
          <div className="row">
            <div>Loading...</div>
          </div>
        </div>
     	);
    }
    return (
      <div>
        <StructuredData />
        <Navbar />
        <div className="container">
          <div className="row">

            <MainQuark quark={current_quark} quark_name={this.props.match.params.quark_name}/>

            <div className="col-md-9 subject-relation-list">
              <ul className="nav nav-pills">
                <li role="presentation" className={this.activenessPattern[this.state.sub_gluon_side].activeActiveness}>
                  {/*
                      <a href="javascript:void(0)" name="active" onClick={this.onLinkClick} >Active</a>
                    */}
                  <button type="submit" name="active" className="" onClick={this.onLinkClick}>Active</button>
                </li>
                <li role="presentation" className={this.activenessPattern[this.state.sub_gluon_side].noneActiveness}>
                  {/*
                      <a href="javascript:void(0)" name="none" onClick={this.onLinkClick} >None</a>
                    */}
                  <button type="submit" name="none" className="" onClick={this.onLinkClick}>None</button>
                </li>
              </ul>

              <QuarkPropertyList
                qtype_properties = {qtype_properties}
                current_quark = {current_quark} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, { initDetail, fetchCurrentQuark, changeCurrentQuark })(injectIntl(Detail));
