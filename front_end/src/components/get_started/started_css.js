import styled from 'styled-components'

export const MainDiv = styled.div`
	display:flex
	max-width: 900px;
	padding: 100px 10px 0 85px;
	margin: 0 auto;
	justify-content: space-evenly;
	align-items: center;
	font-family: 'Roboto', sans-serif
	> div > div {
		@media (max-width: 645px) {
			padding: 0 4%;
		}
	}
	> div > p {
		margin-top: 15px;
		max-width: 500px;
		font-size: 1.2rem;
		@media (max-width: 645px) {
			padding: 0 2%;
		}
	}
	@media (max-width: 645px) {
		flex-direction:column-reverse;
		justify-content: center;
		align-items: center;
	}
	> img {
		@media (max-width: 645px) {
			width: 300px;
		}
	}
`

export const TopHr = styled.hr`
	max-width: 900px;
	margin: 100px auto 50px auto;
	border-bottom: solid 5px #f56a6a;
	@media (max-width: 645px) {
		margin: 0px auto 15px auto;
	}
`

export const BottomHr = styled.hr`
	max-width: 900px;
	margin: 50px auto 0px auto;
	border-bottom: solid 5px #ebeaea;
	@media (max-width: 645px) {
		margin-bottom: 30px;
	}
`