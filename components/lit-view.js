import { LitElement, html, css } from "lit-element";
class LitView extends LitElement {
  static get properties() {
    return {
      msgDialog: {
        type: String,
      },
      name: {
        type: String,
      },
      numFigures: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1024px;
        margin: auto;
        font-family: Roboto;
        overflow: hidden;
      }
      .game {
        background-color: black;
        padding: 1rem 2rem;
      }
      .game__header {
        position: relative;
      }
      .game__dog-emoji,
      .game__cat-emoji {
        position: absolute;
        top: -2rem;
        font-size: 4rem;
      }
      .game__dog-emoji {
        left: -2rem;
        transform: rotate(-25deg);
      }
      .game__cat-emoji {
        right: -2rem;
        transform: rotate(25deg);
      }
      .game__title,
      .game__instructions,
      .game__desc-instructions {
        color: white;
      }
      .game__title {
        font-size: 1.7rem;
        text-align: center;
      }
      .game__instructions {
        font-size: 1.5rem;
        margin-top: 2rem;
      }
      .game__desc-instructions {
        font-size: 1.3rem;
      }
      .game__body {
      }
      input {
        display: block;
        width: 100%;
        margin-bottom:1rem;
      }
    `;
  }

  constructor() {
    super();
    this.numFigures = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      let litDialog = this.shadowRoot.getElementById("initDialog");
      litDialog.show();
    }, 100);
  }

  render() {
    return html`
      <lit-dialog id="litDialog">
        <div slot="body">${this.msgDialog}</div>
        <div slot="footer">
          <button @click="${this.hideDialog}">Cerar</button>
          <button @click="${this.restartGame}">Reiniciar</button>
        </div>
      </lit-dialog>
      <lit-dialog id="initDialog">
        <div slot="body">
          <label>Nombre:</label><input type="text" id="name" />
          <label>Cantida de figuras: </label>
          <input type="number" id="numfigures" />
        </div>
        <div slot="footer">
          <button @click="${this.startGame}">Aceptar</button>
        </div>
      </lit-dialog>
      <div class="game">
        <div class="game__header">
          <span class="game__dog-emoji">🐶</span>
          <span class="game__cat-emoji">😸</span>
          <h1 class="game__title">El juego del gato.</h1>
          <h2 class="game__instructions">Usuario: ${this.name}</h2>
          <h2 class="game__instructions">Instrucciones</h2>
          <p class="game__desc-instructions">
            Hay un gato escondido dentro de alguna de estas figuras, encuéntralo
            y gana, ¡pero cuidado con los perros, ya que tambien están
            escondidos entre las figuras buscando al gato!
          </p>
        </div>
        <div class="game__body">
          <lit-core-game
            id="coreGame"
            .quantity="${this.numFigures}"
            @on-winner="${(e) => this.showDialog(e)}"
            @on-loser="${(e) => this.showDialog(e)}"
          ></lit-core-game>
        </div>
      </div>
    `;
  }

  showDialog(e) {
    setTimeout(() => {
      this.msgDialog = e.detail;
      let litDialog = this.shadowRoot.getElementById("litDialog");
      litDialog.show();
    }, 125);
  }

  restartGame() {
    let coreGame = this.shadowRoot.getElementById("coreGame");
    coreGame.init();
    this.hideDialog();
  }

  hideDialog() {
    let litDialog = this.shadowRoot.getElementById("litDialog");
    litDialog.hide();
  }

  startGame() {
    this.getValuesFromInputs();
    setTimeout(() => {
      let coreGame = this.shadowRoot.getElementById("coreGame");
      coreGame.init();
    }, 100);
    this.hideInitDialog();
  }

  hideInitDialog() {
    let litDialog = this.shadowRoot.getElementById("initDialog");
    litDialog.hide();
  }

  getValuesFromInputs() {
    this.name = this.shadowRoot.getElementById("name").value;
    this.numFigures = parseInt(
      this.shadowRoot.getElementById("numfigures").value
    );
  }
}
customElements.define("lit-view", LitView);
