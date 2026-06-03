import "./register.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";
import API from "../../api/axios";
import { useForm } from "react-hook-form";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterProps = {
  onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  async function onSubmit(data: RegisterForm) {
  try {

    const response = await API.post("/auth/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <section className="register">
      <h1>Registrera dig</h1>
      <p>
        Har du redan ett konto? {" "} 
        <RegularButton
          type="button"
          onClick={onSwitchToLogin}
          label="Logga in här"
          color="transparent"
          size="xs"
        />
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Förnamn* 
          <input type="text" id="firstName" 
            {...register("firstName", {
              required: "Vänligen ange förnamn",
            })} 
            />
            {errors.firstName && (
              <span>{errors.firstName.message}</span>
            )}
        </label>
        <label>
          Efternamn* 
          <input type="text" id="lastName"
            {...register("lastName", {
              required: "Vänligen ange efternamn",
            })}
            />
            {errors.lastName && (
              <span>{errors.lastName.message}</span>
            )}
        </label>
        <label>
          E-post*
          <input type="email" id="email"
          {...register("email", {
            required: "Vänligen ange en giltig e-postaddress",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Ogiltig e-postadress",
            },
          })}
          />
          {errors.email && (
              <span>{errors.email.message}</span>
            )}
        </label>
        <label>
          Lösenord*
          <input type="password" id="password"
          {...register("password", {
            required: "Vänligen ange ett lösenord",
            minLength: {
            value: 8,
            message: "Minst 8 tecken",
          },
          })}
          />
          {errors.password && (
              <span>{errors.password.message}</span>
            )}
        </label>
        <label>
          Upprepa lösenord* 
          <input type="password" id="confirmPassword"
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
        <RegularButton
          onClick={() => {}}
          label="Registera"
          color="green"
          size="md"
          type="submit"
        />
      </form>
    </section>
  );
}
