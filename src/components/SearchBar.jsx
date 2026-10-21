function SearchBar({ pesquisa, aoPesquisar }) {
  return (
    <div className="campo-busca">
      <label htmlFor="pesquisa">Pesquisar receita</label>
      <input
        id="pesquisa"
        type="search"
        placeholder="Digite o nome de uma receita..."
        value={pesquisa} /*Coleta a informação da pesquisa do usuário*/
        onChange={(evento) => aoPesquisar(evento.target.value)} /* O texto é pego e usuado como forma de busca das receitas com informações semelhantes*/
      />
    </div>
  );
}

export default SearchBar;
