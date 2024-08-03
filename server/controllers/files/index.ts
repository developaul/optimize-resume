import PDFParser, { Output } from "pdf2json";
import pdf from 'pdf-parse';

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

  async convertBase64PdfToText(dataUri: string): Promise<string> {
    const validPrefixes = [
      "data:application/pdf;base64,",
      "data:@file/pdf;base64,"
    ];
  
    // Verificar si la cadena comienza con alguno de los prefijos válidos
    const matchedPrefix = validPrefixes.find(prefix => dataUri.startsWith(prefix));
  
    if (!matchedPrefix) {
      throw new Error("El formato del Data URI no es válido");
    }
  
    // Eliminar el prefijo para obtener solo los datos en base64
    const base64Data = dataUri.slice(matchedPrefix.length);
  
    // Convertir base64 a Buffer
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    try {
      // Parsear el PDF
      const data = await pdf(pdfBuffer);

      // data.text contiene todo el texto extraído del PDF
      return data.text;
    } catch (error) {
      console.error('Error al procesar el PDF:', error);
      throw error;
    }
  }
}

const fileController = new FileController();

export default fileController;
