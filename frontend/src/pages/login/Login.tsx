import "./login.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import API from "../../api/axios";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

type LoginProps = {
  onSwitchToRegister: () => void;
};

export default function Login({ onSwitchToRegister }: LoginProps) {
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
        <RegularButton
          onClick={() => {}}
          label="Logga in"
          color="green"
          size="md"
          type="submit"
        />
      </form>
    </section>
  );
}
