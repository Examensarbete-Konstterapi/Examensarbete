import "./myPages.css";
import Layout from "../../../components/layout/Layout";
import { MiniHeroSection } from "../../../components/miniHeroSection/MiniHeroSection";
import RegularButton from "../../../components/buttons/regularButton/RegularButton";

export function MyPages() {
  return (
    <>
      <MiniHeroSection />
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
              onClick={() => {}}
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
