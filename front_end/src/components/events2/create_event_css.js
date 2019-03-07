import styled from 'styled-components';

export const CreateEventWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 800px;
  margin-top: 60px;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`

export const YelpDiv = styled.div`
  border: solid black 1px;
  padding: 2%;
  margin-bottom: 15px;
  background-color: #f0f0f0;
`

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
  padding: 2rem 5.6rem;
  border-radius: 10px;
  width: 50%; 
  margin-bottom: 20px; 
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

export const CenterP = styled.p`
  text-align: center;
`

export const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const MapDiv = styled.div`
  border: solid black 1px;
  height: 450px;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 40px;
  width: 98%;
  margin-bottom: 15px;
`