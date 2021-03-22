import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

export default function ProfileInfo ({title, value="", onSave=()=>{}}) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [update, setUpdate] = useState(value);
	const inputRef = useRef();

	const saveUpdate = () => {
		setIsEditMode(false)
		onSave(update)
	}

	useEffect(() => {
		// direct focus to the input field when editing mode is activated
		if (isEditMode) {
			const {current: input} = inputRef;
			input.focus();
			// input.select();
		}
	}, [isEditMode])

	return (
		<InfoContainer className="profile-info" isEditing={isEditMode}>
			<div className="info-left">
				<span>{ title }</span>
				<input
					ref={inputRef}
					value={update}
					autoFocus
					disabled={!isEditMode}
					onChange={e => setUpdate(e.target.value)}
				/>
			</div>
			<button
				onClick={isEditMode
					? saveUpdate
					: () => setIsEditMode(!isEditMode)
				}
			>
				{ isEditMode ? "Save" : "Edit" }
			</button>
		</InfoContainer>
	)
}

const InfoContainer = styled.div`
	padding: var(--pad-s) 0;
	border-bottom: 1px solid var(--artis-light-grey);
	--fsz: 1rem;

	&,
	> *:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.info-left {
		flex-basis: 65%;
		min-width: 350px;

		> * {
			font-size: var(--fsz);

			&:first-child {
				text-transform: capitalize;
			}
		}

		input {
			// color: var(--artis-purple);
			color: red;
			background-color: transparent;

			&[disabled] {
				color: var(--artis-grey);
			}
		}
	}

	button {
		cursor: pointer;
		background-color: transparent;
		font-size: var(--fsz);
		color: ${props => props.isEditing ? "green" : "var(--artis-blue)"};
	}
`;
