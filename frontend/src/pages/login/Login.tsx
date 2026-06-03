import "./login.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";

type LoginProps = {
  onSwitchToRegister: () => void;
}

export default function Login({onSwitchToRegister}: LoginProps) {
  return (
    <section className="login">
      <h1>Logga in</h1>
      <p>
        Är du ny på denna sida? {" "} 
        <RegularButton
          type="button"
          onClick={onSwitchToRegister}
          label="Registrera dig här"
          color="transparent"
          size="xs"
        />
      </p>
      <form>
        <label>
          E-post <input type="email" id="email" />
        </label>
        <label>
          Lösenord <input type="password" id="password" />
        </label>
        <RegularButton
          onClick={() => {}}
          label="Logga in"
          color="light"
          size="md"
        />
      </form>
    </section>
  );
}
