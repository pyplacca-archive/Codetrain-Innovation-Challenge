import styled from "styled-components";

/*
	props
		size,
		isOn,
*/
const Switch = styled.button`
	--size: ${props => props.size || "1.5rem"};
	width: calc(var(--size) * 2);
	height: var(--size);
	border-radius: var(--size);
	position: relative;
	background-color: var(${props => !props.isOn ? "--artis-light-grey" : "--artis-purple"});
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: background-color .15s ease-out;

	&::after {
		content: "";
		--offset: 2px;
		--s: calc(var(--size) - var(--offset) * 2);
		width: var(--s);
		height: var(--s);
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		left: calc(${props => props.isOn ? "100% - var(--s) - var(--offset)" : "0% + var(--offset)"}) ;
		transition: left .15s ease-out;
	}
`

export default Switch;
