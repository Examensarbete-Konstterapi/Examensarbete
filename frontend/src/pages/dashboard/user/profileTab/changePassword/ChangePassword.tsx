import "./changePassword.css";
import RegularButton from "../../../../../components/buttons/regularButton/RegularButton";
import { useState } from "react";


export function ChangePassword() {
	const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="change-password-section">
      <div className="password-heading">
        <h2>Ändra lösenord</h2>
          <RegularButton 
            onClick={() => setIsEditing(!isEditing)}
            label="Byt lösenord"
            color="red"
            size="xs"
          />
      </div>
    </div>
  )
}