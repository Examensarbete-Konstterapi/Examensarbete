import "./login.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import API from "../../api/axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

type LoginProps = {
  onSwitchToRegister: () => void;
};

export default function Login({ onSwitchToRegister }: LoginProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);

      const userData = {
        id: response.data.id,
        firstName: response.data.firstName.split(" ")[0],
        lastName: response.data.lastName.split(" ")[1],
        email: response.data.email,
        role: response.data.role,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/mina-sidor");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="login">
      <h1>Logga in</h1>
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
        <RegularButton label="Logga in" color="green" size="md" type="submit" />
      </form>
    </section>
  );
}
