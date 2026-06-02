import "./register.css";
import RegularButton from "../../components/buttons/regularButton/RegularButton";

export default function Register() {
  return (
    <section className="register">
      <h1>Registrera dig</h1>
      <p>
        Har du redan ett konto? <a href="/login">Logga in här</a>
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
          label="Registera"
          color="light"
          size="md"
        />
      </form>
    </section>
  );
}
