// react
import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// component
import Navbar from '../containers/navbar';
import SearchBar from './search_bar';
import TopPickups from '../containers/top_pickups';


class Home extends Component {
    static propTypes = {
	intl: intlShape.isRequired
    }

    componentDidMount() {
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
