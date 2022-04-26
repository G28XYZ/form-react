import axios from 'axios';
import link from './constants';

class Api {
  link: string;

  constructor({ link }: { [key: string]: string }) {
    this.link = link;
  }

  getUniversity() {
    return axios
      .get(this.link)
      .then((response) =>
        response.status === 200
          ? Promise.resolve(response.data)
          : Promise.reject('Error'),
      );
  }

  getCities() {
    return new Promise(async (resolve, reject) => {
      const data = await import('./cities.json');
      if (data) {
        return resolve(data);
      }
      return reject('Ошибка получения данных о городах');
    });
  }
}

const api = new Api({ link });

export default api;
