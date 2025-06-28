
import GrafoVisual from './GrafoVisual';

function Resultado({ resultado }) {
  return (
    <div className="row mt-4">
      {/* Lado esquerdo: informações da rota */}
      <div className="col-md-5 mb-3">
        <div className="card shadow-sm rounded p-4 h-100">
          <h4 className="border-bottom pb-2 mb-3">Rota Encontrada</h4>
          <p><strong>Caminho:</strong> {resultado.rota.join(' → ')}</p>
          <p><strong>Distância total:</strong> {resultado.distancia} km</p>
          <p><strong>Custo total:</strong> R$ {resultado.custo.toFixed(2)}</p>
        </div>
      </div>

      {/* Lado direito: grafo visual */}
      <div className="col-md-7 mb-3 d-flex justify-content-center align-items-start">
        <div className="graph-container">
          <GrafoVisual rota={resultado} />
        </div>
      </div>
    </div>
  );
}

export default Resultado;
