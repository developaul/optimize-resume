import ReaderAPI from "../services/ReaderAPI";
import { IContext } from "../types";

// Inyeccion de dependencias
const getContext = (apiKey: string): IContext => {
  return {
    headers: {
      apiKey,
    },
    dataSources: {
      readerApi: new ReaderAPI(),
    },
  };
};

export default getContext