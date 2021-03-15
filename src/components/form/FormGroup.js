import { useState } from "react";
import styled from "styled-components";

export default function FormGroup({
	label,
	input,
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
		setInputIsEmpty(!value);
		input?.onChange(value);
	};

	const { placeholder } = input;
	const htmlFor = input.name || null;
	return (
		<FormGroupContainer
			showPlaceholder={inputIsEmpty}
			{...{
				focused,
				onFocusColor,
				outOfFocusColor,
				...props,
			}}
		>
			{label ? <label {...htmlFor}>{label}</label> : null}
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
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${focused ? onFocusColor : outOfFocusColor};
	transition: border 0.2s ease-in-out;

	label {
		tranform: translateY(${(props) => (props.showPlaceholder ? "0" : "50%")});
		font-size: ${props.showPlaceholder ? "1em" : ".9em"};
		pointer-events: none;
		transition-property: transform, font-size;
		transition-duration: 0.2s;
		transition-timing-function: ease-in-out;
	}
`;
