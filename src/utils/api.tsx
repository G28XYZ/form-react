import axios from 'axios';

class Api {
  link: string;

  axios: any;

  constructor({ link }: { [key: string]: string }) {
    this.link = link;
    this.axios = axios.create({ baseURL: link });
  }

  public getUniversity(path: string) {
    return this.axios
      .get(path)
      .then((response: any) => (response.status === 200
        ? Promise.resolve(response.data)
        : Promise.reject(
          new Error(
            'Ошибка получения списка университетов, возможно из-за протокола https',
          ),
        )));
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

const api = new Api({ link: 'http://universities.hipolabs.com' });

export default api;
