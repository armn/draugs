import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor() {}

  // Based on: https://stackoverflow.com/a/46814952/283851

  /**
   * Create a Base64 Image URL, with rotation applied to compensate for EXIF orientation, if needed.
   *
   * Optionally resize to a smaller maximum width - to improve performance for larger image thumbnails.
   */
  async getImageUrl(file: File, maxWidth: number | undefined) {
    const readOrientation = (file: File) =>
      new Promise<number | undefined>(resolve => {
        const reader = new FileReader();

        reader.onload = () =>
          resolve(
            (() => {
              const view = new DataView(reader.result as ArrayBuffer);

              if (view.getUint16(0, false) != 0xffd8) {
                return;
              }

              const length = view.byteLength;

              let offset = 2;

              while (offset < length) {
                const marker = view.getUint16(offset, false);

                offset += 2;

                if (marker == 0xffe1) {
                  offset += 2;

                  if (view.getUint32(offset, false) != 0x45786966) {
                    return;
                  }

                  offset += 6;

                  const little = view.getUint16(offset, false) == 0x4949;

                  offset += view.getUint32(offset + 4, little);

                  const tags = view.getUint16(offset, little);

                  offset += 2;

                  for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) == 0x0112) {
                      return view.getUint16(offset + i * 12 + 8, little);
                    }
                  }
                } else if ((marker & 0xff00) != 0xff00) {
                  break;
                } else {
                  offset += view.getUint16(offset, false);
                }
              }
            })()
          );

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
      });

    const applyRotation = (file: File, orientation: number, maxWidth: number) =>
      new Promise<string>(resolve => {
        const reader = new FileReader();

        reader.onload = () => {
          const url = reader.result as string;

          const image = new Image();

          image.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;

            let { width, height } = image;

            const [outputWidth, outputHeight] =
              orientation >= 5 && orientation <= 8
                ? [height, width]
                : [width, height];

            const scale = outputWidth > maxWidth ? maxWidth / outputWidth : 1;

            width = width * scale;
            height = height * scale;

            // set proper canvas dimensions before transform & export
            canvas.width = outputWidth * scale;
            canvas.height = outputHeight * scale;

            // transform context before drawing image
            switch (orientation) {
              case 2:
                context.transform(-1, 0, 0, 1, width, 0);
                break;
              case 3:
                context.transform(-1, 0, 0, -1, width, height);
                break;
              case 4:
                context.transform(1, 0, 0, -1, 0, height);
                break;
              case 5:
                context.transform(0, 1, 1, 0, 0, 0);
                break;
              case 6:
                context.transform(0, 1, -1, 0, height, 0);
                break;
              case 7:
                context.transform(0, -1, -1, 0, height, width);
                break;
              case 8:
                context.transform(0, -1, 1, 0, 0, width);
                break;
              default:
                break;
            }

            // draw image
            context.drawImage(image, 0, 0, width, height);

            // export base64
            resolve(canvas.toDataURL("image/jpeg"));
          };

          image.src = url;
        };

        reader.readAsDataURL(file);
      });

    return readOrientation(file).then(orientation =>
      applyRotation(file, orientation || 1, maxWidth || 999999)
    );
  }
}
