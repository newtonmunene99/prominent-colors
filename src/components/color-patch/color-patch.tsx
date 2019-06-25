import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "color-patch",
  styleUrl: "color-patch.scss",
  shadow: true
})
export class ColorPatch {
  @Prop() color: any;
  render() {
    return (
      <div class="color" style={{ "--background-color": this.color.hex }}>
        <p>{this.color.hex}</p>
      </div>
    );
  }
}
