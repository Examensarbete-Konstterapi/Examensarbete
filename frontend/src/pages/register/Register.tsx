import "./register.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import API from "../../api/axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../components/spinner/Spinner";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterProps = {
  onSwitchToLogin: () => void;
  onClose: () => void;
};

export default function Register({ onSwitchToLogin, onClose }: RegisterProps) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  async function onSubmit(data: RegisterForm) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await API.post("/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);

      // Spara user
      const userData = {
        id: response.data.id,
        firstName: response.data.name.split(" ")[0],
        lastName: response.data.name.split(" ")[1],
        email: response.data.email,
        role: response.data.role,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (onClose) onClose();

      navigate("/mina-sidor");
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Registrering misslyckades";
      setErrorMessage(errorMsg);
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="register">
      <h2>Registrera dig</h2>
      <p>
        Har du redan ett konto?{" "}
        <RegularButton
          type="button"
          onClick={onSwitchToLogin}
          label="Logga in här"
          color="transparent"
          size="xs"
        />
      </p>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Förnamn*
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "Vänligen ange förnamn",
            })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>
        <label>
          Efternamn*
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Vänligen ange efternamn",
            })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>
        <label>
          E-post*
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Vänligen ange en giltig e-postaddress",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Ogiltig e-postadress",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Lösenord*
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Vänligen ange ett lösenord",
              minLength: {
                value: 8,
                message: "Minst 8 tecken",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <label>
          Upprepa lösenord*
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Vänligen bekräfta ditt lösenord",
              validate: (value) =>
                value === password || "Lösenorden matchar inte",
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </label>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner size="md" />
          </div>
        ) : (
          <RegularButton
            label="Registrera"
            color="green"
            size="md"
            type="submit"
          />
        )}
      </form>
    </section>
  );
}
