import { Component, h, State } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss",
  shadow: true
})
export class AppHome {
  @State() colors: Array<any> = [];
  private imgEl!: HTMLImageElement;

  render() {
    return [
      <div class="app-home">
        <div class="output">
          <div class="colors">
            {this.colors.length > 0
              ? this.colors.map(color => <color-patch color={color} />)
              : null}
          </div>
          <img
            src=""
            alt=""
            ref={el => (this.imgEl = el as HTMLImageElement)}
          />
        </div>
      </div>,
      <image-picker
        onImageChanged={ev => {
          this.imgEl.title = ev.detail.name;
          this.imgEl.src = ev.detail.src;
          this.colors = ev.detail.colors;
        }}
      />
    ];
  }
}
