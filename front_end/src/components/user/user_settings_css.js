import styled from 'styled-components'

export const ProfileForm = styled.form`
	> h2 {
		margin: 15px 0 50px 0;
	}
	> h3 {
		margin: 30px 0 15px 0;
	}
	display:flex;
	flex-direction:column;
	border-radius: 4px;
	> input {
		font-size: 1.4rem;
		border: solid black 1px;
		margin-bottom: 15px;
		max-width: 400px;
		padding: 1%;
		border-radius: 4px;
	}
`
export const ContainForm = styled.div`
	max-width: 800px;
	margin: 0 auto;
	width: 96%;
	border: solid black 1px;
	padding: 2%;
	@media (max-width: 645px) {
		margin-top: 20px;
	}
	border-radius: 4px;
`

export const Reset = styled.div`
	border: solid black 1px;
	display: inline-block;
	padding: 1%;
	border-radius: 4px;
	background-color:grey;
	color:white
	font-size: 1.4rem;
	&:hover {
		color:grey
		background-color:white;
		cursor:pointer;
	}
`

export const Switch = styled.div`
	> div {
		display: flex;
		justify-content:center;
	}
	max-width: 200px;
	margin: 0 auto;
	border: solid black 1px;
`

export const SwitchTab = styled.div`
	background-color: blue;
	width: 100%;
	color: white;
	text-align: center;
	border:solid black 1px;
`
