import "./myPages.css";
import Layout from "../../../components/layout/Layout";
import { MiniHeroSection } from "../../../components/miniHeroSection/MiniHeroSection";
import RegularButton from "../../../components/buttons/regularButton/RegularButton";
import { useAuth } from "../../../context/useAuth";

export function MyPages() {
  const { user, logout } = useAuth();

  return (
    <>
      <MiniHeroSection
        title="Mina Sidor"
        subtitle={
          user ? `Välkommen ${user.firstName} ${user.lastName}!` : "Välkommen!"
        }
      />
      <Layout>
        <section className="my-pages-section">
          <div className="menu">
            <RegularButton
              onClick={() => {}}
              label="Min profil"
              size="sm"
              color="green"
              type="button"
            />
            <RegularButton
              onClick={() => {}}
              label="Mina bokningar"
              size="sm"
              color="green"
              type="button"
            />
            <RegularButton
              onClick={logout}
              label="Logga ut"
              size="sm"
              color="green"
              type="button"
            />
          </div>
          <div className="settings">
            <div className="heading">
              <h2>Profilinställningar</h2>
              <RegularButton
                onClick={() => {}}
                label="Redigera"
                size="sm"
                color="green"
                type="button"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
