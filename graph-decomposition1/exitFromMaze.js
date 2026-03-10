function exitFromMaze([nVertices, mEdges], edges, [u, v]) {
  const adj = Array.from({ length: nVertices + 1 }, () => []);

  for (const edge of edges) {
    const [src, dest] = edge;

    if (src !== undefined && dest !== undefined) {
      adj[src].push(dest);
      adj[dest].push(src);
    }
  }

  const visited = new Array(nVertices + 1).fill(false);

  function dfs(current) {
    // Se achar v, caminho encontrado, começa retornar true
    if (current === v) return true;
    visited[current] = true;

    for (const neighbor of adj[current]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor)) return true;
      }
    }

    return false;
  }

  // Começa busca no u
  return dfs(u) ? 1 : 0;
}

// --- BATERIA DE TESTES ---

const tests = [
  {
    name: "Caminho Simples (Amostra 1)",
    inputN: [4, 4], // [n, m]
    inputEdges: [
      [1, 2],
      [3, 2],
      [4, 3],
      [1, 4],
    ],
    inputUV: [1, 4], // [u, v]
    expected: 1,
  },
  {
    name: "Sem Caminho (Amostra 2)",
    inputN: [4, 2],
    inputEdges: [
      [1, 2],
      [3, 2],
    ],
    inputUV: [1, 4],
    expected: 0,
  },
  {
    name: "Grafo em Linha (Extremidades)",
    inputN: [5, 4],
    inputEdges: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    inputUV: [1, 5],
    expected: 1,
  },
  {
    name: "Grafo Desconexo (Ilhas)",
    inputN: [6, 4],
    inputEdges: [
      [1, 2],
      [2, 3],
      [4, 5],
      [5, 6],
    ],
    inputUV: [1, 6],
    expected: 0,
  },
  {
    name: "Ciclo Fechado",
    inputN: [3, 3],
    inputEdges: [
      [1, 2],
      [2, 3],
      [3, 1],
    ],
    inputUV: [1, 3],
    expected: 1,
  },
  {
    name: "Vértice Isolado",
    inputN: [10, 2],
    inputEdges: [
      [1, 2],
      [2, 3],
    ],
    inputUV: [1, 10],
    expected: 0,
  },
  {
    name: "Aresta Direta",
    inputN: [2, 1],
    inputEdges: [[1, 2]],
    inputUV: [1, 2],
    expected: 1,
  },
];

console.log("--- Executando Testes ---");
tests.forEach((t) => {
  // Chamada seguindo a assinatura: ([n, m], edges, [u, v])
  const result = exitFromMaze(t.inputN, t.inputEdges, t.inputUV);

  const passed = result === t.expected ? "✅ PASSOU" : "❌ FALHOU";
  console.log(
    `${passed} | ${t.name}: esperava ${t.expected}, obteve ${result}`,
  );
});
