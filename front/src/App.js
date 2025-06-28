import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="graph-theme-card shadow-lg rounded p-4">
        <h1 className="text-center mb-4 text-success fw-bold">Calculadora de Caminho Mais Barato</h1>
        <Form />
      </div>
    </div>
  );
}

export default App;
