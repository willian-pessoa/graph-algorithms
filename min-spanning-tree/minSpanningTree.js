/**
 * Implementação de uma Min-Heap (Priority Queue) usando Array.
 * Essencial para manter a performance de inserção/remoção em O(log n).
 */
const createMinHeap = () => {
  const heap = [];

  const push = (node) => {
    heap.push(node);
    let idx = heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (heap[parent].dist <= heap[idx].dist) break;
      [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
      idx = parent;
    }
  };

  const pop = () => {
    if (heap.length === 0) return null;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let idx = 0;
      while (true) {
        let left = 2 * idx + 1,
          right = 2 * idx + 2,
          smallest = idx;
        if (left < heap.length && heap[left].dist < heap[smallest].dist)
          smallest = left;
        if (right < heap.length && heap[right].dist < heap[smallest].dist)
          smallest = right;
        if (smallest === idx) break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
      }
    }
    return top;
  };

  return { push, pop, isEmpty: () => heap.length === 0 };
};

/**
 * Resolve o problema da MST usando Prim e Priority Queue.
 */
const minimumSpanningTrees = (n, points) => {
  if (n <= 1) return (0).toFixed(9);

  const priorityQueue = createMinHeap();
  const visited = new Array(n).fill(false);
  let totalLength = 0;
  let edgesFound = 0;

  // Começamos por um ponto arbitrário (ex: ponto 0)
  // A distância para começar é 0.
  priorityQueue.push({ dist: 0, u: 0 });

  while (!priorityQueue.isEmpty() && edgesFound < n) {
    const { dist, u } = priorityQueue.pop();

    // Se já visitamos esse nó através de uma aresta menor, ignoramos
    if (visited[u]) continue;

    visited[u] = true;
    totalLength += dist;
    edgesFound++;

    // "Exploramos" o nó u: calculamos distâncias para todos os vizinhos não visitados
    // e os adicionamos na Priority Queue
    for (let v = 0; v < n; v++) {
      if (!visited[v]) {
        const d = Math.sqrt(
          Math.pow(points[u][0] - points[v][0], 2) +
            Math.pow(points[u][1] - points[v][1], 2),
        );
        priorityQueue.push({ dist: d, u: v });
      }
    }
  }

  return totalLength.toFixed(9);
};

// --- Testes ---

const runTests = () => {
  const samples = [
    {
      n: 4,
      points: [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
      expected: "3.000000000",
    },
    {
      n: 5,
      points: [
        [0, 0],
        [0, 2],
        [1, 1],
        [3, 0],
        [3, 2],
      ],
      expected: "7.064495102",
    },
  ];

  samples.forEach((test, i) => {
    const result = minimumSpanningTrees(test.n, test.points);
    const isCorrect =
      Math.abs(parseFloat(result) - parseFloat(test.expected)) < 1e-6;
    console.log(
      `Teste ${i + 1}: ${isCorrect ? "✅ PASSOU" : "❌ FALHOU"} | Obtido: ${result}`,
    );
  });
};

runTests();
