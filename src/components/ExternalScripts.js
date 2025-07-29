import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const ExternalScripts = () => {
  useEffect(() => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
      duration: 1000,      // duración de las animaciones
      easing: 'ease-in-out', // tipo de animación
      once: true,          // las animaciones ocurren solo una vez
      mirror: false,       // si los elementos deben animarse al salir de la vista
      offset: 120         // offset (en px) desde el borde inferior de la ventana
    });

    // Inicializar Swiper
    const swiper = new Swiper('.posts-slider', {
      modules: [Navigation, Pagination, Autoplay],
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });

    // Cleanup function
    return () => {
      if (swiper) {
        swiper.destroy(true, true);
      }
      // Limpiar AOS
      AOS.refresh();
    };
  }, []);

  return null; // Este componente no renderiza nada visible
};

export default ExternalScripts;