import { useState, useEffect } from 'react';
import axios from 'axios';
import Resultado from './Resultado';

function Form() {
  const [capitais, setCapitais] = useState([]);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [preco, setPreco] = useState('');
  const [autonomia, setAutonomia] = useState('');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/capitais')
      .then(res => setCapitais(res.data))
      .catch(err => console.error("Erro ao carregar capitais:", err));
  }, []);

  const calcular = async () => {
    if (!origem || !destino || !preco || !autonomia) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/rota', {
        origem,
        destino,
        precoCombustivel: parseFloat(preco),
        autonomia: parseFloat(autonomia)
      });
      setResultado(res.data);
    } catch (error) {
      alert('Erro ao calcular: ' + (error.response?.data?.erro || error.message));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <p className='text-danger'>Informe a origem e o destino para encontrar o caminho mais barato</p>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Origem</label>
            <select className="form-select" value={origem} onChange={e => setOrigem(e.target.value)}>
              <option value="">Selecione a origem</option>
              {capitais.map(capital => <option key={capital} value={capital}>{capital}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Destino</label>
            <select className="form-select" value={destino} onChange={e => setDestino(e.target.value)}>
              <option value="">Selecione o destino</option>
              {capitais.map(capital => <option key={capital} value={capital}>{capital}</option>)}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Preço do combustível (R$)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ex: 5.89"
              value={preco}
              onChange={e => setPreco(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Autonomia (km/l)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ex: 10"
              value={autonomia}
              onChange={e => setAutonomia(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div className="d-grid">
          <button className="btn btn-secondary" onClick={calcular}>Buscar Caminho</button>
        </div>
      </div>

      {resultado && <Resultado resultado={resultado} />}
    </div>
  );
}

export default Form;
