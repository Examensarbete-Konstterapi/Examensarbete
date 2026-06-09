import "./changePassword.css";
import RegularButton from "../../../../../components/buttons/regularButton/RegularButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../../../../api/axios";
import { useAuth } from "../../../../../context/useAuth";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function ChangePassword() {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>();

  // const password = watch("newPassword");

  async function onSubmit(data: PasswordForm) {
    setErrorMessage("");

    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("Lösenorden matchar inte");
      return;
    }
    try {
      await API.put(`/users/${user?.id}/password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      reset();
      
      setSuccessMessage("Lösenordet har uppdaterats!");
      setErrorMessage("");
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage("Kunde inte uppdatera lösenordet.");
      console.error(error);
    }
  }

  function handleCancel() {
    if (!user) return;
    setIsEditing(false);
  }

  return (
    <div className="change-password-section">
      <div className="password-heading">
        <h2>Ändra lösenord</h2>
        <RegularButton
          onClick={() => setIsEditing(true)}
          label="Byt lösenord"
          color="red"
          size="xs"
          type="button"
        />
      </div>
      <div className={`${isEditing ? "no-password-text" : "password-text"}`}>
        <p>Klicka på "byt lösenord" för att ändra ditt lösenord</p>
        {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="new-password-form">
          <div className="new-password">
            <label>
              Nuvarande lösenord
              <input
                type="password"
                id="password"
                {...register("currentPassword")}
              />
              {/* {errors.newPassword && <span>{errors.newPassword.message}</span>} */}
            </label>
          </div>
          <div className="new-password">
            <label>
              Nytt lösenord
              <input
                type="password"
                id="newPassword"
                {...register("newPassword", {
                  minLength: {
                    value: 8,
                    message: "Minst 8 tecken",
                  },
                })}
              />
              {errors.newPassword && <span>{errors.newPassword.message}</span>}
            </label>
          </div>
          <div className="new-password">
            <label>
              Bekräfta nytt lösenord
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errorMessage && <span>{errorMessage}</span>}
            </label>
          </div>
          <div className="password-buttons">
            <RegularButton
              type="submit"
              label="Spara nytt lösenord"
              color="green"
              size="xs"
            />
            <RegularButton
              type="button"
              label="Avbryt"
              color="light"
              size="xs"
              onClick={handleCancel}
            />
          </div>
        </form>
      )}
    </div>
  );
}
