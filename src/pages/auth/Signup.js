import { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { AuthScreenLayout, FormGroup } from "../../components/auth";
import { Icons, Link } from "../../components";
import { BtnRegular } from "../../components/Buttons";
import { artisBlue } from "../../config";
import rightImage from '../../assets/signup 1.png';

export default function Signup (props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleFormSubmission = event => {
		event.preventDefault()
	}


	const validatePassword = value => {
		setPassword({
			value,
			hasDigit: /[0-9]/.test(value),
			hasLowercase: /[a-z]/.test(value),
			hasUppercase: /[A-Z]/.test(value),
			hasChars: value.length > 5,
			hasSpecial: /[^a-zA-Z0-9]/.test(value)
		})
		console.log(Object.values(password).reduce((res, val) => res && val, false))
		navigate("/profile-setup");
	}

	const PasswordIcon = showPassword ? Icons.VisibilityOff : Icons.VisibilityOn;

	return (
		<AuthScreenLayout placeImageOnRight image={rightImage} footerColor="#fff">
			<FormInner>
				<h1 className="form-title">Create Account</h1>
				<form onSubmit={handleFormSubmission}>
					<FormGroup
						label="Email"
						input={{
							name: "email",
							type: "email",
							autoComplete: "off",
							value: email,
							onChange: setEmail,
						}}
					/>
					<FormGroup
						label="Password"
						input={{
							name: "password",
							autoComplete: "off",
							type: showPassword ? "text" : "password",
							value: password,
							onChange: validatePassword,
						}}
						icon={<PasswordIcon
							onClick={() => setShowPassword(!showPassword)}
							color={artisBlue}
							size="1.2rem"
							style={{cursor: "pointer"}}
						/>}
					/>
					<p className="pass-check">
						Password must be at least&nbsp;
						<PassCheck valid={password.hasChars}>6 characters</PassCheck>&nbsp;
						long and include an&nbsp;
						<PassCheck valid={password.hasUppercase}>uppercase letter</PassCheck>, a&nbsp;
						<PassCheck valid={password.hasLowercase}>lowercase letter</PassCheck>, a&nbsp;
						<PassCheck valid={password.hasDigit}>digit</PassCheck> and a&nbsp;
						<PassCheck valid={password.hasSpecial}>special character</PassCheck> eg; !@#$%^&*
					</p>
					<BtnRegular
						disabled={ !(Object.values(password).reduce((res, val) => res && val, true) && email) }
					>Sign up</BtnRegular>
				</form>
				<p className="agreement">
					By signing up, you agree to the&nbsp;
					<Link to="/terms-and-conditions">Terms & Conditions</Link> and&nbsp;
					<Link to="/privacy-policy">Privacy Policy</Link>
				</p>
			</FormInner>
			<LoginInstead>
				<p>
					Already have an account?&nbsp;
					<Link to='/login'>Log in</Link>
				</p>
			</LoginInstead>
		</AuthScreenLayout>
	)
}

const FormInner = styled.div`
	padding: var(--pad-xl) var(--pad-xl) var(--pad-l);
	flex-grow: 1;

	form {
		margin: var(--pad-xl) 0 var(--pad-l);

		.form-group:not(:nth-child(2)) {
			margin-bottom: var(--pad-l);
		}

		.pass-check {
			margin: var(--pad-s) 0 var(--pad-l);
			line-height: 1.3rem;
			color: var(--safe-grey);
		}
	}

	.agreement {
		max-width: 40ch;
		text-align: center;
		margin: var(--pad-xl) auto 0;
		color: var(--safe-grey);
	}
`;

const PassCheck = styled.span`
	// color: ${props => props.valid ? "green" : "red"};
	color: var(--artis-purple);
	text-decoration: ${props => props.valid ? "line-through" : "normal"};
	// font-weight: 500;
`

const LoginInstead = styled.div`
	background-color: var(--artis-light-grey);
	bottom: 0;
	width: 100%;
	padding: var(--pad-m);

	> * {
		margin: auto;
		text-align: center;
	}
`
