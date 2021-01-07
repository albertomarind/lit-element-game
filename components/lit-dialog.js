import {
  LitElement,
  html,
  css
} from "lit-element";
class LitDialog extends LitElement {
  static get properties() {
    return {
      visibility: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return css`
      :host {
      
      }
      .wrapper-dialog{
        position:fixed;
        inset:0 0 0 0;
        background-color:rgba(0,0,0,.95);
        display: block;
        font-family: "Roboto", sans-serif;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .dialog{
        padding:1rem;
        background-color:white;
        border-radius: .5rem;
      }
      .dialog__header,.dialog__body,.dialog__footer{
        padding:.125rem;
      }
      
    `;
  }

  constructor() {
    super();
    this.visibility = false;
  }

  render() {
    return html`
      ${this.visibility ? html`
      <div class="wrapper-dialog">
        <div class="dialog">
          <div class="dialog__header">
            <slot name="header"></slot>
          </div>
          <div class="dialog__body">
            <slot name="body"></slot>
          </div>
          <div class="dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
      `: html``}
    `;
  }

  show() {
    this.visibility = true;
  }

  hide() {
    this.visibility = false;
  }
}
customElements.define("lit-dialog", LitDialog);