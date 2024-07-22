import PDFParser, { Output } from "pdf2json";

class FileController {
  waitForPdfData = (pdfParser: PDFParser): Promise<Output> => {
    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", reject);
      pdfParser.on("pdfParser_dataReady", resolve);
    });
  };

  dataURLtoFile = (dataurl: string, filename: string = "default-name") => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  async getTextByBase64File(base64URI: string): Promise<string> {
    const file = this.dataURLtoFile(base64URI);
    const fileArrayBuffer = await file.arrayBuffer();

    const pdfParser = new PDFParser();

    pdfParser.parseBuffer(fileArrayBuffer as Buffer, 9);

    const pdfData = await this.waitForPdfData(pdfParser);

    const text = pdfData.Pages.map((page) => {
      return page.Texts.map((text) => {
        return text.R.map(({ T }) => decodeURIComponent(T).trim()).join("");
      }).join("");
    });

    return text.toString();
  }
}

const fileController = new FileController();

export default fileController;
