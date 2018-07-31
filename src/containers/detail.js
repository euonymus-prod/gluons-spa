// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactGa from 'react-ga';
// redux
import { connect } from 'react-redux';
// component
import Navbar from './navbar';
import MainQuark from '../components/main_quark';
import QuarkPropertyList from './quark_property_list';
// action
import { initDetail } from '../actions/detail';
import { fetchCurrentQuark } from '../actions/quark';
import { changeCurrentQuark } from '../actions/quark';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeActiveness:  'active',
            noneActiveness:    '',
        };

	ReactGa.initialize('UA-15649807-18');

        let sub_gluon_side = 'active';
        if ('sub_gluon_side' in props.match.params) {
            sub_gluon_side = props.match.params.sub_gluon_side;
        }
        props.initDetail(sub_gluon_side);
    }


    trackPage = page => {
	ReactGa.set({
	    page,
		// ...options,
	});
	ReactGa.pageview(page);
    };

    componentDidMount() {
	document.title = this.props.match.params.quark_name +  " -\nグルーオンズ"

	const page = this.props.location.pathname;
	this.trackPage(page);
    }

    componentWillReceiveProps(nextProps) {

	const currentPage = this.props.location.pathname;
	const nextPage = nextProps.location.pathname;

	if (currentPage !== nextPage) {
            this.trackPage(nextPage);
	}

        // --------------------------------------------------------
        const { current_quark } = this.props;
        // initialize

	if (nextProps.current_quark && nextProps.current_quark.hasOwnProperty('status') && nextProps.current_quark.status == 0) {
	    if (!current_quark) {
		alert(nextProps.current_quark.message);
	    }
	    return false;
	}
	
	// Note: 以下ちょっと様子見。Object.keys(quarks.list).length == 0 のチェックがなぜ必要だったのか。
        // if (qtype_properties && (Object.keys(nextProps.quarks.list).length == 0) && (Object.keys(quarks.list).length == 0)) {
        if (nextProps.qtype_properties && (Object.keys(nextProps.quarks.list).length == 0)) {
	    if (nextProps.quarks.error_message) {
		alert(nextProps.quarks.error_message)
	    } else {
		this.props.fetchCurrentQuark(this.props.match.params.quark_name, nextProps.qtype_properties, nextProps.privacy);
	    }
        } else if (!nextProps.current_quark) {
	    let newQuark = nextProps.quarks.list[nextProps.quarks.quark_name2id[this.props.match.params.quark_name]]
	    if (newQuark) {
		this.props.changeCurrentQuark(newQuark);
	    }
	} else if (
	    (nextProps.match.params.quark_name != this.props.match.params.quark_name) ||
            (nextProps.match.params.quark_name != nextProps.current_quark.name)
	) {
	    let newQuark = nextProps.quarks.list[nextProps.quarks.quark_name2id[nextProps.match.params.quark_name]]
	    if (newQuark) {
	    	this.props.changeCurrentQuark(newQuark);
	    }
	}
	// --------------------------------------------------------
	
	if (nextProps.sub_gluon_side) {
	    if (!this.props.sub_gluon_side || nextProps.sub_gluon_side != this.props.sub_gluon_side) {
		if (nextProps.sub_gluon_side == 'active') {
		    this.setState({
			'activeActiveness':  'active',
			'noneActiveness':    '',
		    })
		} else if (nextProps.sub_gluon_side == 'none') {
		    this.setState({
			'activeActiveness':  '',
			'noneActiveness':    'active',
		    })
		} else {
		    this.setState({
			'activeActiveness':  'active',
			'noneActiveness':    '',
		    })
		}
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
         <Navbar />
      <div className="container">
         <div className="row">

            <MainQuark quark={current_quark} quark_name={this.props.match.params.quark_name}/>

            <div className="col-md-9 subject-relation-list">
               <ul className="nav nav-pills">
                  <li role="presentation" className={this.state.activeActiveness}>
                     <a href="javascript:void(0)" name="active" onClick={this.onLinkClick} >Active</a>
                  </li>
                  <li role="presentation" className={this.state.noneActiveness}>
                     <a href="javascript:void(0)" name="none" onClick={this.onLinkClick} >None</a>
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
export default connect(mapStateToProps, { initDetail, fetchCurrentQuark, changeCurrentQuark })(Detail);
