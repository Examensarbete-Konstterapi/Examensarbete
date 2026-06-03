import "./register.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";

type RegisterProps = {
  onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
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
      <form>
        <label>
          Förnamn* <input type="text" id="firstName" />
        </label>
        <label>
          Efternamn* <input type="text" id="lastName" />
        </label>
        <label>
          E-post* <input type="email" id="email" />
        </label>
        <label>
          Lösenord* <input type="password" id="password" />
        </label>
        <label>
          Upprepa lösenord* <input type="password" id="password" />
        </label>
        <RegularButton
          onClick={() => {}}
          label="Registera"
          color="light"
          size="md"
        />
      </form>
    </section>
  );
}
