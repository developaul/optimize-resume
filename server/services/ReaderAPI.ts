import DataSource from "./DataSource";
import config from "@/config";

class ReaderAPI extends DataSource {
  constructor() {
    super(config.dataSources.readerApi.baseURL);
  }

  async getTextByUrl(url: string) {
    const response = await this.get<string>(`/${url}`);

    return response;
  }
}

export default ReaderAPI;
