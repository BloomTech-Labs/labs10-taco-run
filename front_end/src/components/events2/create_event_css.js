import styled from 'styled-components';

export const CreateEventWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #F3F7F8;
  height: 42.53rem;
`

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
  padding: 2rem 5.6rem;
  border-radius: 10px;
  width: 50%;  
`

export const FormHeader = styled.h1`
  font-family: 'Roboto', sans-serif;
`

export const LabelElement = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  width: 100%;
  padding-top: 15px;
  color: black;
`

export const InputElement = styled.input`
  width: 100%;
  border-radius: 6px;
  padding: 5px;  
  font-family: 'Roboto Condensed', sans-serif;  
`

export const SubmitButton = styled.button`
  width: 75%;
  background-color: lightpink;  
  margin-top: 30px;
  padding: 10px 50px;
  font-size: 1rem;
  border-radius: 10px;

  &:hover {
    background-color: lightgreen;
    color: black;
    font-size: 1.2rem;
    transition: 0.2s;
    border-bottom: 5px solid black;    
  }
`