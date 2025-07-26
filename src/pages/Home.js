import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/boe-01.jpg';
import logo from '../assets/img/logo2.png';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inicio');
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1,
        }}
      />
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          height: '100vh',
          position: 'relative',
          zIndex: 2,
          color: '#535353', 
        }}
      >
        <h1 className="display-1 fw-bold d-flex align-items-center justify-content-center">
          <span>LEGISTRACK&nbsp;</span>
          <img 
            src={logo} 
            alt="Legistrack Logo" 
            style={{
              height: '60px',
              marginLeft: '20px'
            }}
          />
        </h1>
        <p className="fs-5 mt-2">Transparencia legal al servicio del ciudadano.</p>
        <Button 
          variant="secondary" 
          className="mt-4" 
          onClick={handleClick}
          style={{
            backgroundColor: '#535353', 
            borderColor: '#4A4A4A',
            color: 'white'
          }}
        >
          Ir a Inicio
        </Button>
      </Container>
    </div>
  );
}