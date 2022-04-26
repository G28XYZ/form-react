import axios from 'axios';
import { adress } from './contstants';

class Api {
  private adress: string;

  constructor() {
    this.adress = adress;
  }

  getUniversity() {
    axios
      .get(this.adress)
      .then((data: any) => data)
      .catch((err: any) => console.log(err));
  }
}

const api = new Api();

export default api;
