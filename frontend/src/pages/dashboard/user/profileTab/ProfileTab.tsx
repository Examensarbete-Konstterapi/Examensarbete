import "./profileTab.css";
import { useAuth } from "../../../../context/useAuth";
import RegularButton from "../../../../components/buttons/regularButton/RegularButton";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../../../api/axios";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfileTab() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, reset]);

  async function onSubmit(data: ProfileForm) {
    setErrorMessage("");
    try {
      const response = await API.put(`/users/${user?.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      const userData = {
        id: response.data._id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        role: response.data.role,
      };

      setUser(userData);
      setSuccessMessage("Dina ändringar har sparats!");
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Kunde inte spara ändringarna",
      );
      if (error.response?.status === 409) {
        setErrorMessage("E-postadressen används redan");
      }
    }
  }
  function handleCancel() {
    if (!user) return;

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setSuccessMessage("");
    setErrorMessage("");
    setIsEditing(false);
  }

  return (
    <>
      <form className="profile-section" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-heading">
          <h2>Profilinformation</h2>
          <RegularButton
            onClick={() => {
              setIsEditing(true);
              setSuccessMessage("");
              setErrorMessage("");
            }}
            label="Redigera"
            color="green"
            size="xs"
            type="button"
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
            <div
              className={`${isEditing ? "active-name-input" : "name-input"}`}
            >
              <div>
                <label>Förnamn</label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "Vänligen ange förnamn",
                  })}
                  disabled={!isEditing}
                />
                {errors.firstName && <span>{errors.firstName.message}</span>}
              </div>
              <div>
                <label>Efternamn</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Vänligen ange efternamn",
                  })}
                  disabled={!isEditing}
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </div>
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
              strokeWidth="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                  fill="#597059"
                ></path>{" "}
              </g>
            </svg>
            <div
              className={`${isEditing ? "active-email-input" : "email-input"}`}
            >
              <label>E-post</label>
              <input
                type="email"
                {...register("email", {
                  required: "Vänligen ange en giltig e-postaddress",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Ogiltig e-postadress",
                  },
                })}
                disabled={!isEditing}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
        </div>
        {isEditing && (
          <>
            {errorMessage && <span>{errorMessage}</span>}
            <div className="profile-buttons">
              <RegularButton
                type="submit"
                label="Spara"
                color="green"
                size="xs"
                disabled={!isDirty}
              />
              <RegularButton
                type="button"
                label="Avbryt"
                color="light"
                size="xs"
                onClick={handleCancel}
              />
            </div>
          </>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </>
  );
}
