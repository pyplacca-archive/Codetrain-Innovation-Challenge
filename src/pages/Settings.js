import { useContext } from "react";
import styled from "styled-components";
import { Blank } from "../components";
import { Layout, ProfileAvatar } from "../components/home";
import { Switch, ProfileInfo } from "../components/settings";
import { AppContext } from "../context";
import mtnLogo from "../assets/mtn.png";

export default function Settings() {
	const { state: {profile, preferences: {notification}}, dispatch } = useContext(AppContext);

	const updateProfile = (key) => {
		return (value) => {
			const actionType = `update_profile_${key}`
			dispatch({
				type: "update_profile",
				payload: {
					[key]: value
				}
			})
		}
	}

	const toggleNotificationPreference = (type) => {
		return () => {
			dispatch({
				type: "update_notification_preference",
				payload: {
					[type]: !notification[type]
				}
			})
		}
	}

	return (
		<Layout>
			<SettingsContainer>
				<h1>Settings</h1>
				<div>
					<section id="profile-settings">
						<h3>Profile</h3>
						<ProfileAvatar editable/>
						<ProfileInfo
							title="username"
							value={profile.username}
							onSave={updateProfile("username")}
						/>
						<ProfileInfo
							title="Name"
							value={profile.fullname}
							onSave={updateProfile("fullname")}
						/>
						<ProfileInfo
							title="email"
							value={profile.email}
							onSave={updateProfile("email")}
						/>
						<ProfileInfo
							title="Mobile number"
							value={profile.mobile}
							onSave={updateProfile("mobile")}
						/>
					</section>
					<div className="settings-right">
						<section id="notification-settings">
							<h3>Notification Preferences</h3>
							{
								[
									['playSound', "Play a sound when I get a notification"],
									["desktop", "Desktop notification"],
									["tagsIDontFollow", "Notify me on tags I don't follow"]
								].map((pref, i) => {
									const [key, description] = pref;
									return (
										<div className="preference" key={i}>
											<Switch
												onClick={toggleNotificationPreference(key)}
												isOn={!!notification[key]}
											/>
											<span>{description}</span>
										</div>
									)
								})
							}
						</section>
						<section id="payment-settings">
							<h3>Payment Method</h3>
							<ul>
								<li>
									<img src={mtnLogo} alt="mtn logo"/>
									<p>{profile.mobile}</p>
									<button>Change</button>
								</li>
							</ul>
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

			#profile-settings {
				padding-right: var(--pad-l);
				border-right: 1px solid var(--artis-light-grey);

				.profile-info {
					margin-top: var(--inner-pad);
					margin-bottom: var(--pad-s);
				}
			}

			.settings-right {
				padding-left: var(--pad-l);

				section:not(:last-child) {
					margin-bottom: calc(var(--inner-pad) * 2);
				}

				#notification-settings {
					.preference {
						display: flex;
						align-items: center;
						margin: var(--pad-m) 0;

						> *:nth-child(1) {
							margin-right: var(--pad-s);
						}

						span {
							font-size: 1rem;
						}
					}
				}

				#payment-settings {
					ul li {
						padding: var(--pad-m);
						border-radius: 1rem;
						display: flex;
						align-items: center;
						background-color: var(--artis-light-grey);

						img {
							--size: 60px;
							width: var(--size);
							height: var(--size);
							object-fit: cover;
							border-radius: 50%;
						}

						p {
							margin-left: 1.5rem;
						}

						button {
							margin-left: auto;
							color: var(--artis-blue);
							cursor: pointer;
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
