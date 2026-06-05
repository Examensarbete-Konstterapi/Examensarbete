import "./profileTab.css";
import { useAuth } from "../../../../context/useAuth";
import RegularButton from "../../../../components/buttons/regularButton/RegularButton";
import { useState } from "react";

export default function ProfileTab() {
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className="profile-section">
			<div className="profile-heading">
				<h2>Profilinformation</h2>
				<RegularButton 
					onClick={() => setIsEditing(!isEditing)}
					label="Redigera"
					color="green"
					size="xs"
				/>
			</div>
			<div className="profile-content">
				<div className="profile-info-input">
					<svg
						width="25px"
						height="25px"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
						strokeWidth="3.2"
						stroke="#597059"
						fill="none"
						>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							<circle cx="32" cy="18.14" r="11.14"></circle>
						<path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
						</g>
					</svg>
					<div className="name-input">
					<label>
						Namn
					</label>
					<input type="text" value={user?.firstName + " " + user?.lastName} disabled={isEditing} />
					</div>
				</div>
				<div className="profile-info-input">
					<svg 
						width="25px" 
						height="25px" 
						viewBox="0 0 24 24" 
						fill="none" 
						xmlns="http://www.w3.org/2000/svg" 
						stroke="#597059" 
						strokeWidth="0.00024000000000000003"><g 
							id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" 
						strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
						<path fill-rule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" 
						fill="#597059"></path> </g></svg>
				<div className="email-input">
				<label>
					E-post
				</label>
				<input type="email" value={user?.email} disabled={isEditing} />
				</div>
				</div>
			</div>
		</div>
	)
};