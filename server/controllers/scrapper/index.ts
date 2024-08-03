import { IContext } from "@/server/types";

class ScrapperController {
  async getTextByUrl(url: string, context: IContext): Promise<string> {
    const { readerApi } = context.dataSources;

    const response = await readerApi.getTextByUrl(url);

    return response;
  }
}

const scrapperController = new ScrapperController();

export default scrapperController;
