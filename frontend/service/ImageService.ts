import { API_URL } from "../http";

export default class ImageService {
  static getURL(id: string) {
    return API_URL + "/images/" + id;
  }
}
