import { useState, useContext } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { firestore } from "../../firebase";
import { FormGroup } from "../../components/auth";
import { BtnRegular } from "../../components/Buttons";
import { ProfileAvatar } from "../../components/home";
import background from "../../assets/signup 2.png";

const progress = [
	{title: "Basic Info",},
	{title: "Profile Image"},
]
export default function ProfileSetup() {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [birthday, setBirthday] = useState("");
	const [mobile, setMobile] = useState("");
	const [city, setCity] = useState("");

	const [step, setStep] = useState(1);

	const handleSubmission = () => {
		if (step > 1) {
			navigate("/")
		} else {
			setStep(step+1)
		}
	}

	return (
		<Container>
			<div className="inner-container">
				<h2 className="title">Almost there!</h2>
				<p>Let's setup your profile to personalize your account</p>
				<div className="progress">
					<h4 className="prog-title">{progress[step-1].title}</h4>
				</div>
				{step < 2 ? (
					<form onSubmit={handleSubmission}>
						<FormGroup
							label="First name"
							input={{
								name: "firstname",
								autoComplete: "off",
								type: "text",
								value: firstname,
								onChange: setFirstname,
							}}
						/>
						<FormGroup
							label="Last name"
							input={{
								name: "lastname",
								autoComplete: "off",
								type: "text",
								value: lastname,
								onChange: setLastname,
							}}
						/>
						<FormGroup
							label="Birthday"
							input={{
								name: "birthday",
								autoComplete: "off",
								type: "date",
								value: lastname,
								onChange: setLastname,
							}}
						/>
						<FormGroup
							label="Mobile"
							input={{
								name: "mobile",
								autoComplete: "off",
								type: "text",
								value: mobile,
								onChange: setMobile,
							}}
						/>
						<FormGroup
							label="City"
							input={{
								name: "city",
								autoComplete: "off",
								type: "text",
								value: city,
								onChange: setCity,
							}}
						/>
					</form>
				) : (
					<ProfileAvatar editable/>
				)}
				<div className="buttons">
					<BtnRegular
						// disabled={ !(Object.values(password).reduce((res, val) => res && val, true) && email) }
						type="submit"
						className="next-btn"
						onClick={handleSubmission}
					>{step > 1 ? "Complete" : "Next"}</BtnRegular>
					{ step > 1 ? <button className="previous-btn">Back</button> : null}
				</div>
			</div>
		</Container>
	)
}

const Container = styled.div`
	background-image: url("${background}");
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.inner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		border-radius: 1rem;
		padding: var(--pad-l);
		padding-bottom: var(--pad-xl);
		min-width: 550px;

		.title {
			& + p {
				margin: 1rem 2rem;
			}
		}

		.progress {
			margin-bottom: var(--pad-s);

			> *:nth-child(1) {
				color: #fd9644;
			}
		}

		form {
			width: 63%;
			min-width: 350px;
			margin-bottom: 2rem;

			.form-group {
				margin-bottom: var(--pad-s);
			}
		}

		.avatar {
			width: 250px;
			height: 250px;
			// border-radius: 50%;
			border: 1px dashed var(--artis-grey);
			margin: var(--pad-l);
			// background-color: transparent;
			// align-self: flex-end;
		}

		.buttons {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			width: 100%;
			align-items: center;
		}
	}
`;
