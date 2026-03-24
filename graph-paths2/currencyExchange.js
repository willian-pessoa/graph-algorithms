/**
 * Detecta se existe um ciclo negativo no grafo.
 * @param {number} n - Número de vértices
 * @param {Array} edges - Lista de arestas [u, v, w]
 * @returns {number} 1 se houver ciclo negativo, 0 caso contrário
 */
function hasNegativeCycle(n, edges) {
  const dist = new Array(n + 1).fill(0); // Iniciamos com 0 para detectar ciclos em qualquer componente

  // Relaxamos todas as arestas n-1 vezes
  for (let i = 1; i < n; i++) {
    let changed = false;
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        changed = true;
      }
    }
    // Otimização: se nada mudou em uma iteração, não há mais o que relaxar
    if (!changed) return 0;
  }

  // n-ésima iteração: se alguém relaxar agora, existe um ciclo negativo
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) {
      return 1;
    }
  }

  return 0;
}

// Função para processar a entrada no formato padrão
function currencyExchange(input) {
  const lines = input.trim().split("\n");
  if (lines.length === 0) return;

  const [n, m] = lines[0].split(" ").map(Number);
  const edges = [];

  for (let i = 1; i <= m; i++) {
    if (!lines[i]) continue;
    edges.push(lines[i].split(" ").map(Number));
  }

  console.log(hasNegativeCycle(n, edges));
}

const sampleInput = `4 4
1 2 -5
4 1 2
2 3 2
3 1 1`;

console.log("Resultado esperado: 1");
console.log("Resultado obtido:");
currencyExchange(sampleInput);
