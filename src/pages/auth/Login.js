import { useState } from 'react';
import styled from "styled-components";
import { AuthScreenLayout, FormGroup } from "../../components/auth";
import { Icons, Link } from "../../components";
import { BtnRegular } from "../../components/Buttons";
import { artisBlue } from "../../config";
import leftImage from '../../assets/decor2.jpg';


export default function Login (props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState('');

	const handleFormSubmission = event => {
		event.preventDefault();
	}

	const PasswordIcon = showPassword ? Icons.VisibilityOff : Icons.VisibilityOn;

	return (
		<AuthScreenLayout image={leftImage} imagePosition="center" footerColor="#fff">
			<FormInner>
				<h1 className="form-title">Log in</h1>
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
							onChange: setPassword,
						}}
						icon={
							<PasswordIcon
								onClick={() => setShowPassword(!showPassword)}
								color={artisBlue}
								size="1.2rem"
								style={{cursor: "pointer"}}
							/>
						}
					/>
					<Link to="/forgot-password" className="forgot">Forgot password</Link>
					<BtnRegular disabled={ !(password && email) }>Log in</BtnRegular>
				</form>
			</FormInner>
			<SignupInstead>
				<p>
					Don't have an account?&nbsp;
					<Link to='/signup'>Sign up</Link>
				</p>
			</SignupInstead>
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

		.forgot {
			text-align: right;
			display: block;
			margin: var(--pad-s) 0 var(--pad-l) 0;
		}
	}
`;

const SignupInstead = styled.div`
	background-color: var(--artis-light-grey);
	bottom: 0;
	width: 100%;
	padding: var(--pad-m);

	> * {
		margin: auto;
		text-align: center;
	}
`
