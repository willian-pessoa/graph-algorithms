function topologicalSort([n, m], edges) {
  const adj = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < m; i++) {
    const [u, v] = edges[i];
    adj[u].push(v);
  }

  const visited = new Uint8Array(n + 1);
  const order = [];

  function dfs(u) {
    visited[u] = 1;

    for (const v of adj[u]) {
      if (!visited[v]) {
        dfs(v);
      }
    }

    // O truque da ordenação topológica:
    // Adicionar o nó à lista apenas APÓS visitar todos os seus dependentes.
    order.push(u);
  }

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // A ordem correta é o reverso da ordem de finalização
  return order.reverse().join(" ");
}

function runTopologicalTests() {
  const tests = [
    {
      name: "Sample 1: Hierarquia simples",
      input: [
        [4, 3],
        [
          [1, 2],
          [4, 1],
          [3, 1],
        ],
      ],
      // Saídas possíveis: 4 3 1 2 ou 3 4 1 2
      expected: ["4 3 1 2", "3 4 1 2"],
    },
    {
      name: "Sample 2: Apenas uma conexão",
      input: [[4, 1], [[3, 1]]],
      // Muitos resultados possíveis (2 e 4 podem estar em qualquer lugar)
      // Ex: 2 3 1 4 ou 4 3 1 2
      isValid: (out) =>
        out.includes("3") && out.indexOf("3") < out.indexOf("1"),
    },
    {
      name: "Sample 3: Grafo Denso",
      input: [
        [5, 7],
        [
          [2, 1],
          [3, 2],
          [3, 1],
          [4, 3],
          [4, 1],
          [5, 2],
          [5, 3],
        ],
      ],
      expected: ["5 4 3 2 1"],
    },
    {
      name: "Caso Extra: Nós sem conexões",
      input: [[3, 0], []],
      isValid: (out) => out.split(" ").length === 3,
    },
  ];

  console.log("--- Testando Ordenação Topológica ---");
  tests.forEach((t, i) => {
    const result = topologicalSort(...t.input);
    let passed = false;

    if (t.expected) {
      passed = t.expected.includes(result);
    } else if (t.isValid) {
      passed = t.isValid(result);
    }

    console.log(`${passed ? "✅" : "❌"} Teste ${i + 1}: ${t.name}`);
    console.log(`   Saída: ${result}`);
  });
}

runTopologicalTests();
