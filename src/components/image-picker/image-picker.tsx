import { Component, h, Event, EventEmitter, State } from "@stencil/core";
import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";

@Component({
  tag: "image-picker",
  styleUrl: "image-picker.scss",
  shadow: true
})
export class ImagePicker {
  @Event() imageChanged: EventEmitter;
  @State() open: boolean = true;
  private inputEl!: HTMLInputElement;
  private formEl!: HTMLDivElement;

  componentDidLoad() {
    if (this.isAdvancedUpload) {
      this.formEl.classList.add("has-advanced-upload");

      this.formEl.ondrag = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      this.formEl.ondragstart = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      this.formEl.ondragend = e => {
        e.preventDefault();
        e.stopPropagation();
        this.formEl.classList.remove("is-dragover");
      };
      this.formEl.ondragover = e => {
        e.preventDefault();
        e.stopPropagation();
        this.formEl.classList.add("is-dragover");
      };
      this.formEl.ondragenter = e => {
        e.preventDefault();
        e.stopPropagation();
        this.formEl.classList.add("is-dragover");
      };
      this.formEl.ondragleave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.formEl.classList.remove("is-dragover");
      };
      this.formEl.ondrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.formEl.classList.remove("is-dragover");
        this.inputChangedHandler(e.dataTransfer.files[0]);
      };
    }
  }

  private getPalette(url: string) {
    return new Promise<Palette>(async (resolve, reject) => {
      try {
        const vibrant = new Vibrant(url);
        const palette = await vibrant.getPalette();
        resolve(palette);
      } catch (error) {
        reject(error);
      }
    });
  }

  private inputChangedHandler(file) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.getPalette(event.target.result)
        .then(palette => {
          this.imageChanged.emit({
            name: file.name,
            src: event.target.result,
            colors: [
              {
                hex: palette.DarkMuted.getHex()
              },
              {
                hex: palette.DarkVibrant.getHex()
              },
              {
                hex: palette.LightMuted.getHex()
              },
              {
                hex: palette.LightVibrant.getHex()
              },
              {
                hex: palette.Muted.getHex()
              },
              {
                hex: palette.Vibrant.getHex()
              }
            ]
          });
        })
        .catch(error => {
          console.error(error);
        });
    };

    reader.readAsDataURL(file);
  }

  isAdvancedUpload = (function() {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();
  render() {
    if (this.open) {
      return (
        <div class="input" ref={el => (this.formEl = el as HTMLDivElement)}>
          <div class="controls">
            <h2
              onClick={() => {
                this.open = false;
              }}
            >
              Close
            </h2>
          </div>
          <div
            class="input-container"
            onClick={() => {
              this.inputEl.click();
            }}
          >
            <p>
              {this.isAdvancedUpload ? "Drag and drop image file or," : null}{" "}
              Click to select
            </p>
            <span class="file-info" />

            <input
              type="file"
              onChange={(ev: any) => {
                const name = ev.target.files[0].name;
                this.formEl.querySelector(".file-info").innerHTML =
                  name.length > 20 ? name.substr(name.length - 20) : name;
                this.inputChangedHandler(ev.target.files[0]);
              }}
              ref={el => (this.inputEl = el as HTMLInputElement)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <button
          class="input-closed"
          onClick={() => {
            this.open = true;
          }}
        >
          Open
        </button>
      );
    }
  }
}
