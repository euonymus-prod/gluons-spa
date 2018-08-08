// react
import React, { Component } from 'react';
import ReactGa from 'react-ga';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// component
import Navbar from '../containers/navbar';
import SearchBar from './search_bar';
import TopPickups from '../containers/top_pickups';


class Home extends Component {
    static propTypes = {
	intl: intlShape.isRequired
    }

    constructor(props) {
        super(props);

	ReactGa.initialize('UA-15649807-18');
    }

    trackPage = page => {
	ReactGa.set({
	    page,
		// ...options,
	});
	ReactGa.pageview(page);
    };

    componentDidMount() {
	this.trackPage(this.props.location.pathname);

	document.title = this.props.intl.formatMessage(
	    {
		id: 'title_home',
		defaultMessage: "Search hidden relations on your favorite things, people, company... -\ngluons"
	    }
	)
    }

    render () {
	return (
      <div>
         <Navbar />
      <div className="container">
         <div className="logo-top">
             <img src="/img/logo.gif" alt="gluons" />
         </div>

         <div className="home">
            <p className="text-center">
               <FormattedMessage
                  id="message_home_main"
                  defaultMessage={`Search hidden relations on your favorite things, people, company...`} />
            </p>

            <SearchBar type="home" />
            <TopPickups />
         </div>

      </div>
      </div>
	)
    }
}
export default injectIntl(Home);
