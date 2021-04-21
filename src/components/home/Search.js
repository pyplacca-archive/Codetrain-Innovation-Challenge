import { useState } from "react";
import styled from "styled-components";

export default function Search() {
	const [focused, setFocused] = useState(false);
	return (
		<SearchContainer focused={focused}>
			{/*<span>icon</span>*/}
			<input
				type="search"
				placeholder="Search a product"
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
		</SearchContainer>
	);
}

const SearchContainer = styled.div`
	display: flex;
	padding: .5rem 1rem;
	border-radius: 1.5rem;
	width: ${props => props.focused ? "480px" : "270px"};
	border: 1px solid ${props => props.focused ? "var(--artis-blue)" : "#ccc"};
	transition: width .15s ease-out;

	input {
		flex-grow: 1;
	}
`;
