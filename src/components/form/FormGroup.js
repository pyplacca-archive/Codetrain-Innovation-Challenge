import { useState } from "react";
import styled from "styled-components";

export default function FormGroup({
	label,
	input,
	overridePlaceholder = false,
	onFocusColor = "red",
	outOfFocusColor = "grey",
	...props
}) {
	// this form group sets the label as the placeholder for the input field when it's empty and out of focus and,
	// sets the label as the original label when the input field is in focus or not empty but out of focus
	const [inputIsEmpty, setInputIsEmpty] = useState(true);
	const [focused, setFocused] = useState(false);

	const handleInputChange = ({ target }) => {
		const { value } = target;
		setInputIsEmpty(!value && !focused);
		input.onChange?.(value);
	};

	const htmlFor = input.name || null;
	return (
		<FormGroupContainer
			setLabelAsPlaceholder={inputIsEmpty}
			hasLabel={!!label}
			{...{
				focused,
				onFocusColor,
				outOfFocusColor,
				...props,
			}}
		>
			{label ? (
				<label {...htmlFor}>
					{(overridePlaceholder && inputIsEmpty && input.placeholder) || label}
				</label>
			) : null}
			<input
				{...input}
				onChange={handleInputChange}
				onFocus={() => {
					setFocused(true);
					setInputIsEmpty(false);
				}}
				onBlur={({ target }) => {
					setFocused(false);
					setInputIsEmpty(!target.value);
				}}
			/>
		</FormGroupContainer>
	);
}

const FormGroupContainer = styled.div`
	--ifz: 1rem;
	--cpad: 0.5rem;
	--padt: calc(var(--cpad) * 2);
	position: relative;
	padding-top: calc(var(--padt) + var(--cpad));
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid
		${(props) => (props.focused ? props.onFocusColor : props.outOfFocusColor)};
	transition: border 0.2s ease-in-out;

	label {
		position: absolute;
		top: ${(props) =>
			props.setLabelAsPlaceholder ? "calc(var(--ifz) + var(--padt))" : "0"};
		// font-size: ${(props) => (props.setLabelAsPlaceholder ? "1em" : ".9em")};
		left: ${(props) => (!props.setLabelAsPlaceholder ? "0" : "var(--cpad)")};
		color: ${(props) => (props.setLabelAsPlaceholder ? "#c4c4c4" : "#000")};
		pointer-events: none;
		transition-property: transform, font-size, top, left, color;
		transition-duration: 0.25s;
		transition-timing-function: ease-in-out;
	}

	input {
		outline: none;
		border: none;
		padding: var(--cpad);
		font-size: var(--ifz);

		&::placeholder {
			visibility: ${(props) => (props.hasLabel ? "hidden" : "visible")};
		}
	}
`;
