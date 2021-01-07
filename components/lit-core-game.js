import { LitElement, html, css } from "lit-element";
class LitCoreGame extends LitElement {
  static get properties() {
    return {
      figures: {
        type: Array,
      },
      quantity: {
        type: Number,
        reflect:true
      },
      attempts: {
        type: Number,
        reflect:true
      },
    };
  }

  static get styles() {
    return css`
      :host {
      }
      lit-figure-game {
        --no-selection-figure-color: #616161;
        margin: 0.5rem;
      }
      lit-figure-game[is-selected] {
        --loser-figure-color: #d32f2f;
      }

      lit-figure-game[is-selected][is-winner] {
        --winner-figure-color: #4caf50;
      }
      .core {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    `;
  }

  constructor() {
    super();
    this.figures = [];
    this.quantity = 5;
  }

  init() {
    this.calculateAttempts();
    this.figures = this.createFigures();
  }

  calculateAttempts() {
    this.attempts = this.quantity - 1;
  }

  createFigures() {
    let unrepeatNumbers = [];
    while (unrepeatNumbers.length < this.quantity) {
      let randomNumber = Math.floor(Math.random() * this.quantity + 1);
      if (!unrepeatNumbers.find((n) => n === randomNumber)) {
        unrepeatNumbers.push(randomNumber);
      }
    }
    return unrepeatNumbers.map((number) => ({
      isWinner: number === 1,
      isSelected: false,
    }));
  }

  render() {
    return html`
      <div class="core">
        ${this.figures.map(
          (figure) => html`
            <lit-figure-game
              .isWinner="${figure.isWinner}"
              .isSelected="${figure.isSelected}"
              @click=${(e) => this.selectFigure(e, figure)}
            ></lit-figure-game>
          `
        )}
      </div>
    `;
  }
  selectFigure(event, figure) {
    figure.isSelected = true;
    this.figures = [...this.figures];
    if (figure.isWinner) {
      this.emmitEvent("on-winner",'Has ganado');
    } else {
      this.substractAttempts();
      if (this.attempts === 0) {
        this.emmitEvent("on-loser",'Has perdido');
      }
    }
  }

  substractAttempts() {
    this.attempts--;
  }

  emmitEvent(eventName, msg) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail:msg
      })
    );
  }
}
customElements.define("lit-core-game", LitCoreGame);
