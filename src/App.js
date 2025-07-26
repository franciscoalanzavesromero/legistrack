import React, { useEffect, useState } from 'react';

function App() {
  const [normas, setNormas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://6c6b73cfa537.ngrok-free.app/api/normas')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta');
        return res.json();
      })
      .then((data) => {
        setNormas(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando normas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>LegisTrack - Listado de Normas</h1>
      <ul>
        {normas.map((norma) => (
          <li key={norma.id}>
            {norma.nombre || 'Sin nombre'} - {norma.descripcion || 'Sin descripción'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
