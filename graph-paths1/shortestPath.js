/**
 * Algoritmo BFS para encontrar o menor caminho em um grafo não direcionado.
 * @param {number} n - Número de vértices.
 * @param {Map<number, number[]>} adj - Lista de adjacência.
 * @param {number} start - Vértice de origem.
 * @param {number} end - Vértice de destino.
 */
function findShortestPath(n, adj, start, end) {
  if (start === end) return { distance: 0, path: [start] };

  // mapea as distancias de cada vertice
  const distance = new Array(n + 1).fill(-1);
  // mepea o parente do vertice para arvore de caminhos
  const parent = new Array(n + 1).fill(null);
  // fila para ajudar exploração vertices seguindo as camadas de distancia
  const queue = [start];

  // distancia atual na fila de exploracao
  distance[start] = 0;

  // aponta a cabeça da fila para evitar shift
  let head = 0;
  while (head < queue.length) {
    // vê que é cabeça da fila
    const u = queue[head];
    // e move o ponteiro como se estivesse fazendo o dequeue
    head += 1;

    if (u === end) break;

    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      if (distance[v] === -1) {
        distance[v] = distance[u] + 1;
        parent[v] = u;
        queue.push(v);
      }
    }
  }

  if (distance[end] === -1) {
    return { distance: -1, path: [] };
  }

  // Reconstrução do caminho (Backtracking)
  const path = [];
  let curr = end;
  while (curr !== null) {
    path.push(curr);
    curr = parent[curr];
  }

  return {
    distance: distance[end],
    path: path.reverse(),
  };
}

/**
 * Função Auxiliar para Criar o Grafo
 */
function createGraph(edges) {
  const adj = new Map();
  edges.forEach(([u, v]) => {
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push(v);
    adj.get(v).push(u);
  });
  return adj;
}

/**
 * Suite de Testes
 */
function runTests() {
  const tests = [
    {
      name: "Caso Comum (Exemplo 1)",
      n: 4,
      edges: [
        [1, 2],
        [4, 1],
        [2, 3],
        [3, 1],
      ],
      start: 2,
      end: 4,
      expectedDist: 2,
    },
    {
      name: "Sem Caminho (Exemplo 2)",
      n: 5,
      edges: [
        [1, 3],
        [3, 4],
        [1, 4],
      ],
      start: 3,
      end: 5,
      expectedDist: -1,
    },
    {
      name: "Caminho em Linha (Longa Distância)",
      n: 5,
      edges: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      start: 1,
      end: 5,
      expectedDist: 4,
    },
    {
      name: "Grafo em Estrela (Vários caminhos, um central)",
      n: 6,
      edges: [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [1, 6],
      ],
      start: 2,
      end: 6,
      expectedDist: 2,
    },
    {
      name: "Conexão Direta",
      n: 2,
      edges: [[1, 2]],
      start: 1,
      end: 2,
      expectedDist: 1,
    },
  ];

  console.log("--- INICIANDO TESTES ---\n");

  tests.forEach((t, i) => {
    const adj = createGraph(t.edges);
    const result = findShortestPath(t.n, adj, t.start, t.end);

    const status =
      result.distance === t.expectedDist ? "✅ PASSOU" : "❌ FALHOU";

    console.log(`Teste ${i + 1}: ${t.name}`);
    console.log(
      `Resultado: Distância ${result.distance} | Caminho: [${result.path.join(" -> ")}]`,
    );
    console.log(`${status}\n-----------------------`);
  });
}

// Executar
runTests();
