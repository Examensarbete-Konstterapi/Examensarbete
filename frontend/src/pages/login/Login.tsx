import "./login.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import API from "../../api/axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../components/spinner/Spinner";

type LoginForm = {
  email: string;
  password: string;
};

type LoginProps = {
  onSwitchToRegister: () => void;
  onClose?: () => void;
};

export default function Login({ onSwitchToRegister, onClose }: LoginProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);

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

      console.log(response.data);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Inloggning misslyckades";
      setErrorMessage(errorMsg);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="login">
      <h2>Logga in</h2>
      <p>
        Är du ny på denna sida?{" "}
        <RegularButton
          type="button"
          onClick={onSwitchToRegister}
          label="Registrera dig här"
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
          E-post
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Vänligen ange din e-postadress",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Ogiltig e-postadress",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Lösenord
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Vänligen ange ditt lösenord",
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner size="md" />
          </div>
        ) : (
          <RegularButton
            label="Logga in"
            color="green"
            size="md"
            type="submit"
          />
        )}
      </form>
    </section>
  );
}
