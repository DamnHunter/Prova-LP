import { useState } from "react";

function RecipeForm({ aoAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Doces");
  const [foto, setFoto] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparo, setPreparo] = useState("");
  const [mensagem, setMensagem] = useState("");
  /* Criando as constantes e às atribuindo um estado inicial */

  function cadastrarReceita(evento) {
    evento.preventDefault();

    if (titulo.trim() === "" || ingredientes.trim() === "" || preparo.trim() === "") {
      setMensagem("Preencha o título, os ingredientes e o preparo.");
      /* Verifica se as caixas de texto estão vazias */ 
      return;
    }

    const listaIngredientes = ingredientes
      .split("\n")
      .filter((ingrediente) => ingrediente.trim() !== "");

    const novaReceita = {
      titulo: titulo.trim(),
      categoria: categoria,
      foto: foto.trim() || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600",
      ingredientes: listaIngredientes,
      preparo: preparo.trim(),
      /* Constante que armazena as informações que o usuário atribui para a receita cadastrada por este */
    };

    aoAdicionar(novaReceita);

    setTitulo("");
    setCategoria("Doces");
    setFoto("");
    setIngredientes("");
    setPreparo("");
    /* Limpa as caixas de texto*/
    setMensagem("Receita cadastrada! Ela já aparece na lista.");
  }

  return (
    <section className="cadastro" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro">Cadastre sua receita</h2>
      <form onSubmit={cadastrarReceita}>
        <label htmlFor="titulo">Nome da receita</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          required
        />

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option value="Doces">Doces</option>
          <option value="Salgadas">Salgadas</option>
        </select>

        <label htmlFor="foto">Link da foto — opcional</label>
        <input
          id="foto"
          type="url"
          placeholder="https://exemplo.com/foto.jpg"
          value={foto}
          onChange={(evento) => setFoto(evento.target.value)}
        />

        <label htmlFor="ingredientes">Ingredientes — um por linha</label>
        <textarea
          id="ingredientes"
          rows="5"
          value={ingredientes}
          onChange={(evento) => setIngredientes(evento.target.value)}
          required
        />

        <label htmlFor="preparo">Modo de preparo</label>
        <textarea
          id="preparo"
          rows="5"
          value={preparo}
          onChange={(evento) => setPreparo(evento.target.value)}
          required
        />

        <button type="submit" className="botao">Adicionar receita</button>
        <p role="status">{mensagem}</p>
      </form>
    </section>
    /* Nesse bloco, ele coloca as informações atribuídas pelo usuário nas variáveis que serão inseridas nos cards das receitas*/
  );
}

export default RecipeForm;
