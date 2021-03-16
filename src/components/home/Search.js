import styled from "styled-components";

export default function Search() {
	return (
		<SearchContainer>
			<span>icon</span>
			<input type="search" />
		</SearchContainer>
	);
}

const SearchContainer = styled.div`
	display: flex;
`;
