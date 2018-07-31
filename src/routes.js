// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import ScrollMemory from 'react-router-scroll-memory';

// component
import GlobalFooter from './components/global_footer';

import Home          from './components/home';
import Detail        from './containers/detail';
import SearchResults from './containers/search_results';
import QuarkList     from './containers/quark_list';
import Login         from './containers/login';
import Signup        from './containers/signup';
import AddQuark      from './containers/add_quark';
import EditQuarkForm from './containers/edit_quark';
import AddGluon      from './containers/add_gluon';
import EditGluonForm from './containers/edit_gluon';
import Contacts      from './containers/contacts';

import Terms         from './components/terms';
import Privacy       from './components/privacy';
// action
import { initLogin } from './actions/login';
import { initPrivacy } from './actions/privacy';
import { initQtypeProperties } from './actions/qtype_properties';


class AppRoutes extends Component {
    componentWillMount() {
	this.props.initLogin();
        this.props.initPrivacy();
	this.props.initQtypeProperties();
    }

    render () {

	return (
   <BrowserRouter>
     <LastLocationProvider>
      <div>

         <ScrollMemory />
         <Switch>
            {/* containers  */}
            <Route exact path='/' component={Home}/>
            <Route path='/subjects/relations/:quark_name/:sub_gluon_side' component={Detail}/>
            <Route path='/subjects/relations/:quark_name' component={Detail}/>

            <Route path='/subjects/search/:keywords' component={SearchResults}/>
            <Route exact path='/subjects' component={QuarkList}/>

            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>

            <Route path='/subjects/add' component={AddQuark}/>
            <Route path='/subjects/edit/:id' component={EditQuarkForm}/>

            <Route path='/relations/add/:quark_id' component={AddGluon}/>
            <Route path='/relations/edit/:id' component={EditGluonForm}/>

            <Route path='/contacts' component={Contacts}/>

            {/* conponents  */}
            <Route path='/terms' component={Terms}/>
            <Route path='/privacy' component={Privacy}/>
         </Switch>

         <GlobalFooter />

      </div>
     </LastLocationProvider>
   </BrowserRouter>
	)
    }
}

export default connect(state => state, { initLogin, initPrivacy, initQtypeProperties })(AppRoutes);

    
