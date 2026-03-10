function checkCycle([n, m], edges) {
  // Inicializa a lista de adjacência
  const adj = Array.from({ length: n + 1 }, () => []);

  // Constrói o grafo (apenas as mEdges fornecidas)
  for (let i = 0; i < m; i++) {
    const [u, v] = edges[i];
    adj[u].push(v);
  }

  // 0: não visitado, 1: visitando (pilha de recursão), 2: visitado (concluído)
  const state = new Uint8Array(n + 1);

  function hasCycleDFS(u) {
    state[u] = 1; // Entrando no nó (Cinza)

    for (const v of adj[u]) {
      if (state[v] === 1) return true; // Encontrou um nó que ainda está na pilha: CICLO!
      if (state[v] === 0 && hasCycleDFS(v)) return true;
    }

    state[u] = 2; // Saindo do nó (Preto)
    return false;
  }

  // Itera por todos os vértices para cobrir grafos desconexos
  for (let i = 1; i <= n; i++) {
    if (state[i] === 0) {
      if (hasCycleDFS(i)) return 1;
    }
  }

  return 0;
}

function runSuite() {
  const testCases = [
    {
      desc: "Sample 1: Ciclo Direto (3-1-2-3)",
      input: [
        [4, 4],
        [
          [1, 2],
          [4, 1],
          [2, 3],
          [3, 1],
        ],
      ],
      expected: 1,
    },
    {
      desc: "Sample 2: Grafo Acíclico Complexo",
      input: [
        [5, 7],
        [
          [1, 2],
          [2, 3],
          [1, 3],
          [3, 4],
          [1, 4],
          [2, 5],
          [3, 5],
        ],
      ],
      expected: 0,
    },
    {
      desc: "Caso 3: Auto-dependência (u -> u)",
      input: [[2, 1], [[1, 1]]],
      expected: 1,
    },
    {
      desc: "Caso 4: Grafo Desconexo com Ciclo em uma parte",
      input: [
        [6, 3],
        [
          [1, 2],
          [4, 5],
          [5, 4],
        ],
      ],
      expected: 1,
    },
    {
      desc: "Caso 5: Grafo Vazio (Nenhum curso/dependência)",
      input: [[1, 0], []],
      expected: 0,
    },
    {
      desc: "Caso 6: Ciclo em 'V' (Duas rotas para o mesmo nó, sem ciclo)",
      input: [
        [3, 2],
        [
          [1, 2],
          [3, 2],
        ],
      ],
      expected: 0,
    },
  ];

  console.log("=== Testes de Consistência de Currículo ===\n");

  testCases.forEach(({ desc, input, expected }, i) => {
    const result = checkCycle(...input);
    const success = result === expected;
    console.log(`${success ? "✅ PASSOU" : "❌ FALHOU"} [Teste ${i + 1}]`);
    console.log(`   Cenário: ${desc}`);
    if (!success)
      console.log(`   Resultado: ${result} | Esperado: ${expected}`);
  });
}

runSuite();
