import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";
import ColorContrastChecker from "color-contrast-checker";

const wcga = new ColorContrastChecker();

@customElement("din-swatch")
export default class ColorSwatch extends LitElement {
    @property()
    name: string = "Triforce"

    @property()
    color: string = "#FFD727";

    @property()
    validationColors = [
        {name: "Snowpeak", color: "#FFFFFF"},
        {name: "Lake Hylia 50", color: "#E1E8FA"},
        {name: "Lake Hylia 950", color: "#02050D"},
        {name: "Bongo Bongo", color: "#000000"},
    ]

    @property()
    validationFontSizes = [
        14, 16, 24
    ]

    private getTextColor() {
        if (wcga.isLevelAA("#000000", this.color, 14)) {
            return "#000000";
        } else {
            return "#FFFFFF";
        }
    }

    static styles = css`
      .swatch {
        border-radius: 2px;
        min-height: 100px;
        padding: 12px;
        margin: 12px 0;
        cursor: pointer;
      }

      .name {
        font-weight: 600;
      }
      
      .hex {
        margin: 0;
        font-size: 14px;
      }
      
      .split {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      
      table {
        font-size: 14px;
        width: 50%;
        border-collapse: collapse;
      }
      
      thead tr {
        border-bottom: 1px solid;
      }
    `

    private _copyColorToClipboard(e: Event) {
        navigator.clipboard.writeText(this.color);
    }

    render() {
        return html`
            <div class="swatch" style="background-color: ${this.color}; color: ${this.getTextColor()}"
                 @click="${this._copyColorToClipboard}">
                <span class="name">${this.name}</span>
                <div class="split">
                    <pre class="hex">${this.color}</pre>
                    <table class="text-small">
                        <thead>
                        <tr class="c-table-border" style="border-color: ${this.getTextColor()}">
                            <td></td>
                            ${this.validationFontSizes.map((size) => html`
                                <td>${size}px</td>
                            `)}
                        </tr>
                        </thead>
                        <tbody>
                        ${this.validationColors.map((item) => html`
                            <tr>
                                <td style="color: ${item.color}">${item.name}</td>
                                ${this.validationFontSizes.map((size) => html`
                                    <td>${wcga.isLevelAA(this.color, item.color, size) ? "Pass" : "Fail"}</td>
                                `)}
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            </div>
        `
    }
}