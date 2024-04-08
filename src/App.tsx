import { useState } from "react";
import "./App.css";
import icon from './assets/3dgifmaker76547.gif'
interface Produto {
  sabor: string;
  cobertura: string;
  tipo: string;
  confeito: string;
}

const sabores: string[] = ["Chocolate", "Morango", "Baunilha"];
const coberturas: string[] = ["Chocolate", "Morango", "Caramelo"];
const tiposCasquinha: string[] = ["Casquinha", "Marshmallow"];
const confeitos: string[] = ["Granulado", "Chantilly", "Frutas"];

function App(): JSX.Element {
  const [produto, setProduto] = useState<Produto>({
    sabor: "",
    cobertura: "",
    tipo: "",
    confeito: "",
  });
  const [sacola, setSacola] = useState<Produto[]>([]);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openMinicart, setOpenMinicart] = useState<boolean>(false);

  const selecionarSabor = (sabor: string): void => {
    setProduto({ ...produto, sabor });
  };

  const selecionarCobertura = (cobertura: string): void => {
    setProduto({ ...produto, cobertura });
  };

  const selecionarTipo = (tipo: string): void => {
    setProduto({ ...produto, tipo });
  };

  const selecionarConfeito = (confeito: string): void => {
    setProduto({ ...produto, confeito });
  };

  const adicionarNaSacola = (): void => {
    // Verifica se todas as etapas estão selecionadas
    if (
      produto.sabor &&
      produto.cobertura &&
      produto.tipo &&
      produto.confeito
    ) {
      setSacola([...sacola, produto]);
      // Limpar seleção após adicionar à sacola
      setProduto({ sabor: "", cobertura: "", tipo: "", confeito: "" });
      setOpenSelect(false);
    } else {
      alert(
        "Por favor, selecione uma opção para cada etapa antes de adicionar à sacola."
      );
    }
  };

  const removerDaSacola = (index: number): void => {
    const novaSacola = [...sacola];
    novaSacola.splice(index, 1);
    setSacola(novaSacola);
  };

  const enviarPedidoWhatsapp = (): void => {
    const mensagem =
      "Olá! Gostaria de encomendar os seguintes produtos:%0A%0A" +
      sacola
        .map(
          (item) =>
            `${item.sabor} (${item.tipo}, cobertura: ${item.cobertura}, confeito: ${item.confeito})`
        )
        .join("%0A");
    const url = `https://wa.me/5511987361695?text=${mensagem}`;
    window.open(url);
    // Limpar a sacola após enviar o pedido
    setSacola([]);
  };

  return (
    <div className="App">
      <div className="minicart-container">
          {
            sacola.length ?
            <div className="minicart-qtn">
              {sacola.length}
            </div>
            :
            null
          }
        
        <img
          className="button-minicart-icon"
          onClick={() => {
            setOpenMinicart(true);
          }}
          src="https://cdn-icons-png.flaticon.com/512/57/57451.png"
          alt=""
        />

      </div>
      {openMinicart ? (
        <div className="minicart">
          <div className="header-minicart">
            <h2>Sacola</h2>
            <div
              onClick={() => {
                setOpenMinicart(false);
              }}
            >
              X
            </div>
          </div>
          {sacola.map((item: Produto, index: number) => (
            <div key={index} className="item-sacola">
              <p>
                <b>Sabor:</b> {item.sabor}
              </p>
              <p>
                <b>Cobertura:</b> {item.cobertura}
              </p>
              <p>
                <b>Tipo:</b> {item.tipo}
              </p>
              <p>
                <b>Confeito:</b> {item.confeito}
              </p>
              <button onClick={() => removerDaSacola(index)}>Remover</button>
            </div>
          ))}
          <button className="enviar-button" onClick={enviarPedidoWhatsapp}>
            Enviar Pedido
          </button>
        </div>
      ) : null}
      <h2>Monte sua paleta</h2>
      <img className="icon-paleta" src={icon} alt="" />
      <button className="botao-adicionar" onClick={() => setOpenSelect(true)}>
        Criar Paleta
      </button>
      {openSelect ? (
        <div className="selecoes">
          <div className="opcoes">
            <h2>Sabor</h2>
            <div className="opcoes-list-content">
              {sabores.map((sabor: string, index: number) => (
                <button
                  key={index}
                  className={
                    produto.sabor === sabor ? "botao-selecionado" : "botao"
                  }
                  onClick={() => selecionarSabor(sabor)}
                >
                  {sabor}
                </button>
              ))}
            </div>
          </div>
          <div className="opcoes">
            <h2>Cobertura</h2>
            <div className="opcoes-list-content">
              {coberturas.map((cobertura: string, index: number) => (
                <button
                  key={index}
                  className={
                    produto.cobertura === cobertura
                      ? "botao-selecionado"
                      : "botao"
                  }
                  onClick={() => selecionarCobertura(cobertura)}
                >
                  {cobertura}
                </button>
              ))}
            </div>
          </div>
          <div className="opcoes">
            <h2>Tipo</h2>
            <div className="opcoes-list-content">
              {tiposCasquinha.map((tipo: string, index: number) => (
                <button
                  key={index}
                  className={
                    produto.tipo === tipo ? "botao-selecionado" : "botao"
                  }
                  onClick={() => selecionarTipo(tipo)}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
          <div className="opcoes">
            <h2>Confeito</h2>
            <div className="opcoes-list-content"></div>
            {confeitos.map((confeito: string, index: number) => (
              <button
                key={index}
                className={
                  produto.confeito === confeito ? "botao-selecionado" : "botao"
                }
                onClick={() => selecionarConfeito(confeito)}
              >
                {confeito}
              </button>
            ))}
          </div>
          <button className="botao-adicionar" onClick={adicionarNaSacola}>
            Adicionar à Sacola
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
