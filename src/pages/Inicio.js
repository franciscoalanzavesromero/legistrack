import { useEffect } from "react";
import Header from "../components/Header";
import TrendingCategorySection from "../components/TrendingCategorySection";
import CultureCategorySection from "../components/CultureCategorySection";
import BOELawsBootstrap from '../components/BOELawsBootstrap'
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
import ExternalScripts from "../components/ExternalScripts";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Inicio() {
  useEffect(() => {
    document.body.classList.add("index-page");
    // Inicializar AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    return () => {
      document.body.classList.remove("index-page");
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <BOELawsBootstrap />
        <Footer />
        <ScrollTop />
      </main>
      <ExternalScripts />
    </>
  );
}
