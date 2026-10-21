function Header({ abaAtiva, aoTrocarAba }) {
  const abas = [
    { texto: "Início", valor: "Todas" },
    { texto: "Doces", valor: "Doces" },
    { texto: "Salgadas", valor: "Salgadas" },
    { texto: "Favoritas", valor: "Favoritas" },
    /* Classificando as possíveis categorias das receitas */
  ];

  return (
    <header className="cabecalho">
      <h1>Receitas de Casa</h1>
      <p>Receitas simples para o seu dia a dia.</p>
      {/* Auto Explicativo */}
      <nav aria-label="Categorias de receitas">
        {abas.map((aba) => (
          <button
            key={aba.valor}
            type="button"
            className={abaAtiva === aba.valor ? "aba ativa" : "aba"}
            aria-pressed={abaAtiva === aba.valor}
            onClick={() => aoTrocarAba(aba.valor)}
            /* Uma arrow function simples envolvendo a admnistração de troca de abas, se for a mesma aba selecionada ela não irá trocar mas se for uma não selecionada ela irá trocar. */
          >
            {aba.texto}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
