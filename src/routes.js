// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

// component
import GlobalFooter  from './components/global_footer';
import Home          from './components/home';
import Terms         from './components/terms';
import Privacy       from './components/privacy';
import Detail        from './containers/detail';
import SearchResults from './containers/search_results';
import QuarkList     from './containers/quark_list';
import Login         from './containers/login';
import Signup        from './containers/signup';
import AddQuark      from './pages/add_quark_wrapper';
import EditQuark     from './pages/edit_quark_wrapper';
import AddGluon      from './pages/add_gluon_wrapper';
import EditGluon     from './pages/edit_gluon_wrapper';
import Contacts      from './containers/contacts';
// action
import { initLogin } from './actions/login';
import { initPrivacy } from './actions/privacy';
import { initQtypeProperties } from './actions/qtype_properties';
// style
import './assets/styles/main.css'


class AppRoutes extends Component {
  componentDidMount() {
	  this.props.initLogin();
    this.props.initPrivacy();
	  this.props.initQtypeProperties();
  }

  render () {
	  if (!this.props.qtype_properties) {
	    return ''
	  }

	  return (
      <BrowserRouter>
        <LastLocationProvider>
          <div className="main-content">

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
              <Route path='/subjects/edit/:id' component={EditQuark}/>

              <Route path='/relations/add/:quark_id' component={AddGluon}/>
              <Route path='/relations/edit/:id' component={EditGluon}/>

              <Route path='/contacts' component={Contacts}/>

              {/* conponents  */}
              <Route path='/terms' component={Terms}/>
              <Route path='/privacy' component={Privacy}/>
            </Switch>

          </div>
          <GlobalFooter />

        </LastLocationProvider>
      </BrowserRouter>
	  )
  }
}

export default connect(state => state, { initLogin, initPrivacy, initQtypeProperties })(AppRoutes);


