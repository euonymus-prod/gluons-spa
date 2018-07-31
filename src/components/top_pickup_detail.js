// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TopPickupDetail extends Component {
    render () {
	const { pickup } = this.props
	let secondpath = '';
	return (
           <div className="pickup-link">
                <Link to={`/subjects/relations/${pickup.name}${secondpath}`} >
                   <img src={pickup.image_path} alt={pickup.name}/>
                </Link>
           </div>
	)
    }
}
export default TopPickupDetail;
