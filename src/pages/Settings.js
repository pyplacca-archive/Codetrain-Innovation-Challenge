import styled from "styled-components";
import { Blank } from "../components";
import { Layout, ProfileAvatar } from "../components/home";

export default function Settings() {
	return (
		<Layout>
			<SettingsContainer>
				<h1>Settings</h1>
				<div>
					<section className="profile-settings">
						<h3>Profile</h3>
						<ProfileAvatar editable/>
					</section>
					<div>
						<section className="notification-settings">
							<h3>Notification Preferences</h3>
						</section>
						<section className="payment-settings">
							<h3>Payment Method</h3>
						</section>
					</div>
				</div>
			</SettingsContainer>
		</Layout>
	);
}

const SettingsContainer = styled.div`
	--inner-pad: var(--pad-m);
	padding: var(--inner-pad) var(--pad-l);
	height: 100%;
	display: flex;
  flex-direction: column;

	> * {
		&:nth-child(1) {
			border-bottom: 1px solid var(--artis-light-grey);
			padding-bottom: var(--inner-pad);
		}

		&:nth-child(2) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			padding: var(--inner-pad) 0;
			flex-grow: 1;

			> * {
				&:nth-child(1) {
					padding-right: var(--inner-pad);
					border-right: 1px solid var(--artis-light-grey);
				}

				&:nth-child(2) {
					padding-left: var(--inner-pad);

					> * {
						&:not(:last-child) {
							margin-bottom: calc(var(--inner-pad) * 2);
						}
					}
				}
			}

			section {
				> *:nth-child(1) {
					color: var(--artis-grey);
					margin-bottom: var(--inner-pad);
				}
			}
		}
	}

`;
