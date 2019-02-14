import styled from 'styled-components';

export const FormE = styled.form`
	padding: 4%;
	> div {
		display: flex;
		justify-content: space-between;
		> p {
			margin-top: -3%;
	    margin-right: -1%;
	    font-size: 19px;
	    &:hover {
	    	cursor: pointer
	    }
		}
	}
	> input {
		max-width: 350px;
		width: 100%;
		border-radius: 4px;
		padding: 1%;
	}
	> p {
		margin-top: 15px;
    border: solid black 1px;
    max-width: 94px;
    text-align: center;
    padding: 1%;
    border-radius: 5px;
    &:hover {
	   	cursor: pointer
	   	background-color: #e8e7e7;
	  }
	}
`