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
      .then((response) => (response.status === 200
        ? Promise.resolve(response.data)
        : Promise.reject(new Error('Error'))));
  }

  public getCities = () => new Promise((resolve, reject) => {
    const data = import('./cities.json');
    if (data) {
      resolve(data);
      return;
    }
    reject(new Error('Ошибка получения данных о городах'));
  });

  public postForm(form: any) {
    console.log(form);
  }
}

const api = new Api({ link });

export default api;
