import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import receitasIniciais from "./dados/receitasIniciais.js";
// As linhas acima pegam as linhas dos arquivos jsx citados e os importa para cá
import "./App.css";

function contarPorCategoria(lista) {
  const totais = { Doces: 0, Salgadas: 0 };
  lista.forEach((receita) => {
    if (receita.categoria === "Doces") {
      totais.Doces = totais.Doces + 1;
    }
    if (receita.categoria === "Salgadas") {
      totais.Salgadas = totais.Salgadas + 1;
    }
  });
  return totais;
} // Uma função que tem como... Função, contar quantas receitas à em cada categoria.

function App() {

  // Maneira como o site inicia.
  const [pesquisa, setPesquisa] = useState("");
  // Barra de pesquisa vazia
  const [abaAtiva, setAbaAtiva] = useState("Todas");
  // O site começa na aba "Todas"
  const [receitas, setReceitas] = useState(receitasIniciais);
  // Ele exibe as receitas já existentes e as que, posteriormente, vão ser cadastradas pelo usuário
  const [favoritos, setFavoritos] = useState([]);
  // Inicia vazio e será alterado de acordo com o usuário, ele pode favoritar ou desfavoritas receitas

  useEffect(() => {
    if (abaAtiva === "Todas") {
      document.title = "Receitas de Casa";
    } else {
      document.title = abaAtiva + " - Receitas de Casa";
    }

    // Um useEffect simples envolvendo a troca de abas do site e o nome deste. Ao trocar de aba, seu "title" mudará.
  }, [abaAtiva]);// Pode ser considerado um parâmetro, seria um aviso pro useEffect averiguar o valor.

  function alternarFavorito(id) {
    if (favoritos.includes(id)) {
      const novaLista = favoritos.filter((favoritoId) => favoritoId !== id); 
      setFavoritos(novaLista); // Aqui esta verificando se a receita que o usuário favoritou já esta na lista de favoritos, caso esteja, irá ser criada uma nova lista de favoritos sem essa receita.
    } else {
      setFavoritos([...favoritos, id]); // Caso não, a receita só é adicionada na lista
    }
  }

  function adicionarReceita(novaReceita) {
    novaReceita.id = receitas.length + 1;
    setReceitas([novaReceita, ...receitas]);
    setPesquisa("");
    setAbaAtiva("Todas");

    // Aqui seria auto explicativa, adiciona a receita que o usuário incrementar, atribuindo um ID para ela, colocando ela nas listas de receitas e etc.
  }

  const receitasFiltradas = receitas.filter((receita) => {
    const combinaPesquisa = receita.titulo
      .toLowerCase()
      .includes(pesquisa.trim().toLowerCase());
    let combinaAba = true;
    if (abaAtiva === "Doces" || abaAtiva === "Salgadas") {
      combinaAba = receita.categoria === abaAtiva;
    }
    if (abaAtiva === "Favoritas") {
      combinaAba = favoritos.includes(receita.id);
    }
    return combinaPesquisa && combinaAba;
  }); // Nessa arrow function, ao selecionar uma aba onde filtra as receitas, elas serão exibidas de acordo com a categoria escolhida pelo usuário

  const totais = contarPorCategoria(receitas);

  return ( // Bloco em HTML
    <>
      <Header abaAtiva={abaAtiva} aoTrocarAba={setAbaAtiva} />
       
      <main className="container">
        <SearchBar pesquisa={pesquisa} aoPesquisar={setPesquisa} />
        <p className="estatisticas">
          Cadastradas: {receitas.length} | Doces: {totais.Doces} | Salgadas: {totais.Salgadas}
        </p>
        <section aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">
            {abaAtiva === "Todas" ? "Todas as receitas" : abaAtiva}
             {/* A aba ativa é "Todas"? Caso sim, o h2 será "Todas as receitas", caso não, será o nome da aba selecionada */}
          </h2>
          <p>{receitasFiltradas.length} receita(s) encontrada(s).</p>
           {/* Nesse bloco irá mostrar a quantidade de receitas que a categoria tem para o usuário, de acordo com oque ele selecionou. */}
          {receitasFiltradas.length === 0 && (
            <p className="aviso">Nenhuma receita encontrada para esta busca ou categoria.</p> 
          )}
          <div className="lista-receitas">
            {receitasFiltradas.map((receita) => ( 
              <RecipeCard
                key={receita.id}
                receita={receita}
                favorita={favoritos.includes(receita.id)}
                aoFavoritar={alternarFavorito}
                /* Seria os cards das receitas ao serem chamados nas trocas de aba*/
              />
            ))}
          </div>
        </section>
        <RecipeForm aoAdicionar={adicionarReceita} />
      </main>
      <footer className="rodape">Receitas de Casa — Site feito por Bebel, Felepo, Bela, Flaviana e AnaLisa.</footer>
    </>
  );
}

export default App;
