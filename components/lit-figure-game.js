import { LitElement, html, css } from "lit-element";
class LitFigureGame extends LitElement {
  static get properties() {
    return {
      isWinner: {
        type: Boolean,
        reflect: true,
        attribute:'is-winner'
      },
      isSelected: {
        type: Boolean,
        reflect: true,
        attribute:'is-selected'
      },
    };
  }

  static get styles() {
    return css`
      :host {
        --size: 8rem;
        --winner-figure-color: green;
        --loser-figure-color: red;
        --no-selection-figure-color: gray;
      }
      :host([is-selected]) .figure {
        background-color: var(--loser-figure-color);
      }

      :host([is-selected][is-winner]) .figure {
        background-color: var(--winner-figure-color);
      }
      .figure {
        display: inline-block;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
        transition: ease 0.1s;
        position: relative;
        background-color: var(--no-selection-figure-color);
      }
      .figure__emoji {
        position: absolute;
        font-size: 4rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `;
  }

  constructor() {
    super();
    this.isWinner = false;
    this.isSelected = false;
  }

  render() {
    return html`
      <div class="figure">
        ${this.isSelected
          ? html`
              ${this.isWinner
                ? html` <span class="figure__emoji">🐱</span> `
                : html` <span class="figure__emoji">🐶</span> `}
            `
          : ``}
      </div>
    `;
  }
}
customElements.define("lit-figure-game", LitFigureGame);
