import styled from 'styled-components'

export const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	border: solid black 1px;
	padding: 1%;
	border-radius: 4px;
`

export const Comment = styled.div`
	border: solid black 1px;
	padding: 1%;
	margin: 10px 0;
`

export const FormComment = styled.form`
	border: solid black 1px;
	> textarea {
		width: 100%;
		height: 80px;
	}
`

export const CommentSubmit = styled.button`
	border: solid black 1px;
	padding: .5%;
	margin-top: 10px;
	border-radius: 4px;
	background-color:grey;
	color:white;
	&:hover {
		background-color:white;
		color:grey;
	}
`





