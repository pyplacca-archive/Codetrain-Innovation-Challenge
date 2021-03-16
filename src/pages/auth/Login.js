import styled from "styled-components";
import { AuthScreenLayout } from "../../components/auth";
import FormGroup from "../../components/form/FormGroup";

export default function Login () {
	return (
		<AuthScreenLayout>
			<FormGroup
				label="Email"
				input={{
					name: "email",
					type: "email"
				}}
			/>
			<FormGroup
				label="Password"
				input={{
					name: "password",
					type: "password"

				}}
			/>
		</AuthScreenLayout>
	)
}
