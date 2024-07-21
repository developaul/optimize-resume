import ReaderAPI from "../services/ReaderAPI";
import { IContext } from "../types";

// Inyeccion de dependencias
const getContext = (headers: IContext['headers']): IContext => {
  return {
    headers: headers,
    dataSources: {
      readerApi: new ReaderAPI(),
    },
  };
};

export default getContext