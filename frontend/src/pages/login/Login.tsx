import "./login.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";

export default function Login() {
  return (
    <section className="login">
      <h1>Logga in</h1>
      <p>
        Är du ny på denna sida? <a href="/register">Registrera dig här</a>
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
