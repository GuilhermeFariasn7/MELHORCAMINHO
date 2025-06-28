class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function calcularCusto(distancia, precoCombustivel, autonomia, pedagio) {
  const custoCombustivel = (distancia / autonomia) * precoCombustivel;
  console.log("custoCombustivel:", custoCombustivel, "pedagio:", pedagio);
  console.log("Custo Final:", custoCombustivel + pedagio);
  return custoCombustivel + pedagio;
}

function calcularCaminhoMaisBarato(grafo, origem, destino, precoCombustivel, autonomia) {
  if (!grafo.find(c => Object.keys(c)[0] === origem) || !grafo.find(c => Object.keys(c)[0] === destino)) {
    throw new Error('Capital de origem ou destino não encontrada');
  }

  const capitalNomes = grafo.map(obj => Object.keys(obj)[0]);
  const capitalMap = {};
  grafo.forEach(obj => {
    const [nome] = Object.keys(obj);
    capitalMap[nome] = obj[nome];
  });

  const distancias = {};
  const custos = {};
  const anteriores = {};
  const visitados = new Set();
  const pedagiosPagos = new Set();
  const fila = new PriorityQueue();

  capitalNomes.forEach(capital => {
    distancias[capital] = Infinity;
    custos[capital] = Infinity;
    anteriores[capital] = null;
  });

  distancias[origem] = 0;
  custos[origem] = 0;
  fila.enqueue(origem, 0);

  while (!fila.isEmpty()) {
    const atual = fila.dequeue().element;

    if (visitados.has(atual)) continue;
    visitados.add(atual);

    const { toll: pedagioAtual, neighbors } = capitalMap[atual];

    for (const vizinho in neighbors) {
      const distancia = neighbors[vizinho];

      let pedagio = 0;
      if (!pedagiosPagos.has(atual) && atual !== origem) {
        pedagio = pedagioAtual;
      }

      const custo = calcularCusto(distancia, precoCombustivel, autonomia, pedagio);
      const novoCusto = custos[atual] + custo;

      if (novoCusto < custos[vizinho]) {
        distancias[vizinho] = distancias[atual] + distancia;
        custos[vizinho] = novoCusto;
        anteriores[vizinho] = atual;
        fila.enqueue(vizinho, novoCusto);
      }
    }

    pedagiosPagos.add(atual);
  }

  if (custos[destino] === Infinity) {
    throw new Error('Não existe rota entre as capitais informadas.');
  }

  const caminho = [];
  let atual = destino;
  while (atual !== null) {
    caminho.unshift(atual);
    atual = anteriores[atual];
  }

  return {
    rota: caminho,
    distancia: distancias[destino],
    custo: custos[destino]
  };
}

module.exports = calcularCaminhoMaisBarato;
