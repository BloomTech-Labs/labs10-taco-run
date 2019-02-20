import React from 'react';
//import axios from 'axios';

class CreateEvent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			date: '',
			invite: true,
		};
	}

	componentDidMount(){

	}

	// extra in case you need to reference

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	 }



	render() {
		return (
			<div>
				<form>
					<input
						type="text"
						placeholder='example'
						onChange={this.handleChange}
						name="example"
						value={this.state.example}
					/>
				</form>
			</div>
		)
	}
}

export default CreateEvent;
