import ReaderAPI from "../services/ReaderAPI";

export type IContext = {
  headers: {
    apiKey: string;
  };
  dataSources: {
    readerApi: ReaderAPI;
  };
};
