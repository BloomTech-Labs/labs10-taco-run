import React from 'react';
import Nav from '../nav/Nav.js'
//import axios from 'axios';

class CreateEvent extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){}

	// extra in case you need to reference

	// handleChange = event => {
 	//    this.setState({[event.target.name]: event.target.value})
 	//  }

	//  <form>
	// 	<input
	// 		type="text"
	// 		placeholder='example'
	// 		onChange={this.handleChange}
	// 		name="example"
	// 		value={this.state.example}
	// 	/>
	// </form>

	render() {
		return (
			<div>
				<Nav />
				<div>
					Lets Create An Event!
				</div>
			</div>
		)
	}
}

export default CreateEvent;