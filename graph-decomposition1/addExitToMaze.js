function addExitToMaze([nVertices, mEdges], edges) {
  const adj = Array.from({ length: nVertices + 1 }, () => []);

  // Construção do grafo
  for (const [src, dest] of edges) {
    if (src !== undefined && dest !== undefined) {
      adj[src].push(dest);
      adj[dest].push(src);
    }
  }

  const visited = new Array(nVertices + 1).fill(false);
  let componentCount = 0;

  // DFS para explorar toda uma componente
  function explore(v) {
    visited[v] = true;
    for (const neighbor of adj[v]) {
      if (!visited[neighbor]) {
        explore(neighbor);
      }
    }
  }

  // Percorre todos os vértices de 1 a n
  for (let i = 1; i <= nVertices; i++) {
    if (!visited[i]) {
      // Se o nó não foi visitado, achamos uma nova componente
      componentCount++;
      explore(i);
    }
  }

  return componentCount;
}

// --- BATERIA DE TESTES ---

const tests = [
  {
    name: "Amostra 1 (2 componentes)",
    inputN: [4, 2],
    inputEdges: [
      [1, 2],
      [3, 2],
    ],
    expected: 2, // Componentes: {1, 2, 3} e {4}
  },
  {
    name: "Grafo Totalmente Conexo",
    inputN: [4, 3],
    inputEdges: [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    expected: 1,
  },
  {
    name: "Nós Totalmente Isolados",
    inputN: [5, 0],
    inputEdges: [],
    expected: 5,
  },
  {
    name: "Duas Ilhas Separadas",
    inputN: [6, 4],
    inputEdges: [
      [1, 2],
      [2, 3],
      [4, 5],
      [5, 6],
    ],
    expected: 2,
  },
  {
    name: "Estrela e um isolado",
    inputN: [5, 3],
    inputEdges: [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
    expected: 2, // Componentes: {1,2,3,4} e {5}
  },
  {
    name: "Grafo com Ciclo",
    inputN: [3, 3],
    inputEdges: [
      [1, 2],
      [2, 3],
      [3, 1],
    ],
    expected: 1,
  },
];

console.log("--- Contando Componentes Conectadas ---");
tests.forEach((t) => {
  const result = addExitToMaze(t.inputN, t.inputEdges);
  const passed = result === t.expected ? "✅" : "❌";
  console.log(
    `${passed} | ${t.name}: obteve ${result}, esperado ${t.expected}`,
  );
});
