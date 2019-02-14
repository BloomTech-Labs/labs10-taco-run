import React from 'react';
import xBurg from './images/X_BURGER.jpg';
import './custom.css';

class NotAuth extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	restart = () => {
		this.props.history.push("/")
		window.location.reload();
	}

	render() {
		return (
			<div>
				<div className="flexed">
					<p>NOT AUTHORIZED</p>
					<button className="return" onClick={this.restart}>Return</button>
					<img src={xBurg}/>
				</div>
			</div>
		)
	}
}

export default NotAuth;