// react
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { injectIntl, intlShape } from 'react-intl';

class SearchBar extends Component {
  static propTypes = {
	  intl: intlShape.isRequired
  }

  constructor(props) {
	  super(props);

	  this.state = {
	    value: '',
	  }
  }

  handleSubmit = (event) => {
	  event.preventDefault();
	  this.props.history.push(`/subjects/search/${this.state.value}`);
  }

  onInputChange(value) {
    this.setState({value});
  }

  render() {
	  let formClass = 'navbar-form navbar-left'
	  let formRole = 'search'
	  let divClass = 'input-group'
	  let inputPlaceHolder = 'search'
	  if (this.props.type === 'home') {
	    formClass = 'search_top text-center'
	    formRole = ''
	    divClass = 'form-group center-block input-container-top'
	    inputPlaceHolder = this.props.intl.formatMessage(
		    {
		      id: 'placeholder_home_searchbar',
		      defaultMessage: "Type people, organization, product and so on"
		    }
	    )
	  }

	  return (
      <form
	      method="get"
	      acceptCharset="utf-8"
	      onSubmit={this.handleSubmit}
	      className={formClass}
	      role={formRole}
	    >
        <div className={divClass}>
          <input
            value = {this.state.value}
            onChange = {event => this.onInputChange(event.target.value)}
            className="form-control"
            name="keywords"
            placeholder={inputPlaceHolder}/>
          {(() => { if (this.props.type !== 'home') { return (
             <span className="input-group-btn">
               <button className="btn btn-default" type="submit">Go</button>
             </span>
          );} })()}
        </div>
        {(() => { if (this.props.type === 'home') { return (
           <button className="btn btn-primary" type="submit">Gluons Search</button>
        );} })()}
      </form>
	  );
  }
}
export default withRouter(injectIntl(SearchBar));
