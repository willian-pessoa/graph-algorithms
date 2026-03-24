function flightCost(input) {
  const lines = input.trim().split("\n");
  if (lines.length === 0) return;

  const [n, m] = lines[0].split(" ").map(Number);
  const adj = Array.from({ length: n + 1 }, () => []);

  // Construção do Grafo de adjacencia
  for (let i = 1; i <= m; i++) {
    const [u, v, w] = lines[i].split(" ").map(Number);
    adj[u].push({ node: v, weight: w });
  }

  // Leitura da origem e destino
  const [startNode, endNode] = lines[m + 1].split(" ").map(Number);

  // Algoritmo de Dijkstra
  const distances = new Array(n + 1).fill(Infinity);
  const parent = new Array(n + 1).fill(null);
  distances[startNode] = 0;

  // Usando um array como min-priority queue simplificada
  const priorityQueue = [{ node: startNode, dist: 0 }];

  while (priorityQueue.length > 0) {
    // Ordena ao contrario para pegar o de menor distância usando pop que é O(1)
    priorityQueue.sort((a, b) => b.dist - a.dist);
    const { node: curr, dist: d } = priorityQueue.pop();

    if (d > distances[curr]) continue;
    if (curr === endNode) break;

    for (let edge of adj[curr]) {
      if (distances[curr] + edge.weight < distances[edge.node]) {
        distances[edge.node] = distances[curr] + edge.weight;
        parent[edge.node] = curr;
        priorityQueue.push({ node: edge.node, dist: distances[edge.node] });
      }
    }
  }

  // Formatação do Output
  if (distances[endNode] === Infinity) {
    console.log("-1");
  } else {
    const path = [];
    let temp = endNode;
    while (temp !== null) {
      path.push(temp);
      temp = parent[temp];
    }
    console.log(`Custo Mínimo: ${distances[endNode]}`);
    console.log(`Caminho: ${path.reverse().join(" -> ")}`);
  }
}

const samples = [
  {
    name: "Sample 1",
    input: `4 4\n1 2 1\n4 1 2\n2 3 2\n1 3 5\n1 3`,
    expected: "Custo Mínimo: 3\nCaminho: 1 -> 2 -> 3",
  },
  {
    name: "Sample 2",
    input: `5 9\n1 2 4\n1 3 2\n2 3 2\n3 2 1\n2 4 2\n3 5 4\n5 4 1\n2 5 3\n3 4 4\n1 5`,
    expected: "Custo Mínimo: 6\nCaminho: 1 -> 3 -> 5", // ou 1 -> 3 -> 2 -> 5
  },
  {
    name: "Sample 3",
    input: `3 3\n1 2 7\n1 3 5\n2 3 2\n3 2`,
    expected: "-1",
  },
];

console.log("=== Iniciando Testes ===\n");
samples.forEach((s) => {
  console.log(`Rodando ${s.name}...`);
  flightCost(s.input);
  console.log("------------------------");
});
