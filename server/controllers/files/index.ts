import pdf from "pdf-parse";

class FileController {
  async convertBase64PdfToText(dataUri: string): Promise<string> {
    const validPrefixes = [
      "data:application/pdf;base64,",
      "data:@file/pdf;base64,",
    ];

    // Verificar si la cadena comienza con alguno de los prefijos válidos
    const matchedPrefix = validPrefixes.find((prefix) =>
      dataUri.startsWith(prefix)
    );

    if (!matchedPrefix) {
      throw new Error("El formato del Data URI no es válido");
    }

    // Eliminar el prefijo para obtener solo los datos en base64
    const base64Data = dataUri.slice(matchedPrefix.length);

    // Convertir base64 a Buffer
    const pdfBuffer = Buffer.from(base64Data, "base64");

    try {
      // Parsear el PDF
      const data = await pdf(pdfBuffer);

      // data.text contiene todo el texto extraído del PDF
      return data.text;
    } catch (error) {
      console.error("Error al procesar el PDF:", error);
      throw error;
    }
  }
}

const fileController = new FileController();

export default fileController;
