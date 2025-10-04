import { IImageFIle } from "../../../../shared/types/file";

export function bufferToDataURI(image: IImageFIle): string {
  const base64Image = image.data.toString("base64");

  return `data:${image.contentType};base64,${base64Image}`;
}
