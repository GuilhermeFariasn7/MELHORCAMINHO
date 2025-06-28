import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

function GrafoVisual({ rota }) {
  const [cores, setCores] = useState({
    texto: '#5B0E2D',
    no: '#C1A35F',
    sombra: 'rgba(91, 14, 45, 0.7)',
  });

  useEffect(() => {
    // Pega as variáveis CSS do :root no runtime
    const styles = getComputedStyle(document.documentElement);
    setCores({
      texto: styles.getPropertyValue('--cor-texto-grafo').trim() || '#5B0E2D',
      no: styles.getPropertyValue('--cor-no-grafo').trim() || '#C1A35F',
      sombra: styles.getPropertyValue('--cor-sombra-grafo').trim() || 'rgba(91, 14, 45, 0.7)',
    });
  }, []);

  if (!rota || !rota.rota || rota.rota.length === 0) return null;

  const caminho = rota.rota;

  const nodes = caminho.map((nome, index) => ({
    id: nome,
    name: nome,
    val: 1 + (index === 0 || index === caminho.length - 1 ? 1 : 0),
  }));

  const links = [];
  for (let i = 0; i < caminho.length - 1; i++) {
    links.push({
      source: caminho[i],
      target: caminho[i + 1],
    });
  }

  return (
    <div style={{ width: '600px', height: '400px', borderRadius: '12px' }}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeAutoColorBy="id"
        nodeRelSize={10}
        linkDirectionalArrowLength={0}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        width={600}
        height={400}
        enableZoom={false}
        enablePan={false}
        enableNodeDrag={false}
        nodeLabel={(node) => node.name}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = cores.texto;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fillStyle = cores.no;
          ctx.shadowColor = cores.sombra;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.strokeStyle = cores.texto;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = cores.texto;
          ctx.fillText(label, node.x, node.y + 14);
          ctx.shadowBlur = 0;
        }}
      />
    </div>
  );
}

export default GrafoVisual;
