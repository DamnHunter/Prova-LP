import { useState } from "react";

function RecipeCard({ receita, favorita, aoFavoritar }) {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  return (
    <article className="cartao">
      <img className="foto-receita" src={receita.foto} alt={receita.titulo} />
      <div className="conteudo-cartao">
        <span className="categoria">{receita.categoria}</span>
        <h3>{receita.titulo}</h3>
        <div className="acoes">
          <button
            type="button"
            className={favorita ? "botao favorito" : "botao"}
            aria-pressed={favorita}
            onClick={() => aoFavoritar(receita.id)}
          >
            {favorita ? "♥ Desfavoritar" : "♡ Favoritar"}
          </button>
          <button
            type="button"
            className="botao secundario"
            aria-expanded={mostrarDetalhes}
            onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
          >
            {mostrarDetalhes ? "Ocultar detalhes" : "Ver detalhes"}
          </button>
        </div>
        {mostrarDetalhes && (
          <div className="detalhes">
            <h4>Ingredientes</h4>
            <ul>
              {receita.ingredientes.map((ingrediente, indice) => (
                <li key={indice}>{ingrediente}</li>
              ))}
            </ul>
            <h4>Modo de preparo</h4>
            <p className="texto-preparo">{receita.preparo}</p>
          </div>
        )}
      </div>

      {/* De maneira resumida, esse seria o bloco em HTML que constrói os cards das receitas.
      Aqui esta incluído a inexação de imagens, sua categoria, se esta favoritado, o botão de detalhes que exibe e oculta a receita e as estruturas dos textos de
      ingredientes e modo de preparo*/}
    </article>
  );
}

export default RecipeCard;
