import { useState } from "react";
import styled from "styled-components";
import { artisBlue, artisGrey } from "../../config";

export default function FormGroup({
	label,
	input,
	icon,
	overridePlaceholder = false,
	onFocusColor = artisBlue,
	outOfFocusColor = artisGrey,
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
			className="form-group"
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
			<div className="input-group">
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
				{icon && icon}
			</div>
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
		// left: ${(props) => (!props.setLabelAsPlaceholder ? "0" : "var(--cpad)")};
		color: ${(props) => (props.setLabelAsPlaceholder ? "#c4c4c4" : "var(--artis-blue)")};
		pointer-events: none;
		transition-property: transform, font-size, top, left, color;
		transition-duration: 0.25s;
		transition-timing-function: ease-in-out;
	}

	.input-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--cpad) 0;

		input {
			outline: none;
			border: none;
			font-size: var(--ifz);
			flex-grow: 1;

			&::placeholder {
				visibility: ${(props) => (props.hasLabel ? "hidden" : "visible")};
			}
		}
	}

`;
