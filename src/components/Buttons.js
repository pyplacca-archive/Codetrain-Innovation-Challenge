import styled from 'styled-components';

export const BtnRegular = styled.button`
	border-radius: .5rem;
	background-color: var(--artis-blue);
	color: #fff;
	padding: var(--pad-m);
	min-width: 220px;
	border: 2px solid transparent;

	&:active {
		transform: scale(.97);
	}

	&:active,
	&:hover,
	&:focus {
		border-color: #000;
	}

	&[disabled] {
		opacity: .5;
		transform: none;
		border-color: transparent;
	}
`
