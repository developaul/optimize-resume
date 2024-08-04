import modelController from "../controllers/model";
import ReaderAPI from "../services/ReaderAPI";
import { IContext } from "../types";

// Inyeccion de dependencias
const getContext = (headers: IContext["headers"]): IContext => {
  const model = modelController.getModel(headers.keytype, headers.apikey);

  return {
    headers: headers,
    dataSources: {
      readerApi: new ReaderAPI(),
    },
    model,
  };
};

export default getContext;
