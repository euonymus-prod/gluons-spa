import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Util from '../utils/common';

class QuarkInList extends Component {
    render () {
	let util = new Util();
	return (
           <div className="subject-relation white">
              <div className="subject-relation-main">
                 <div className="media">
                    <div className="media-left subject-image">
                       <Link to={`/subjects/relations/${this.props.quark_in_list.name}`}>
                          <img src={this.props.quark_in_list.image_path} width="100px" height="100px" alt=""/>
                       </Link>
                    </div>
                    <div className="media-body">
                       <h4>
                          <Link to={`/subjects/relations/${this.props.quark_in_list.name}`}>
                             {this.props.quark_in_list.name}
                          </Link>
                       </h4>

                       {this.props.quark_in_list.description}
                       <p>{util.period2str(this.props.quark_in_list)}</p>
                    </div>
                 </div>
              </div>
           </div>
	)
    }
}
export default connect(state => state)(QuarkInList);
