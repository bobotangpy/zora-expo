import axios from 'axios';

export default class API {
  constructor() {
    const headers = {
      'content-type': 'application/json',
      Accept: '*/*',
    };

    this.api = axios.create({
      baseURL: 'https://zora3.herokuapp.com/',
      headers,
      timeout: 10000,
    });

    this.api.interceptors.response.use(
      function (response) {
        return parseData(response);
      },
      function (error) {
        console.log('error: ', error.response);
        return Promise.reject(error);
      },
    );

    const parseData = res => {
      // console.log("parseData", res);
      if (res.status === 200) {
        return res.data;
      } else {
        return Promise.reject(res.data);
      }
    };
  }

  login(email, pwd) {
    const url = 'api/login';
    const params = {
      email: email,
      password: pwd,
    };
    const res = this.api.post(url, params);
    // console.log(res);
    return res;
  }

  signup(name, email, pwd, bday, horoscope) {
    const url = 'api/signup';
    const params = {
      name: name,
      email: email,
      password: pwd,
      birthday: bday,
      horoscope: horoscope,
    };
    const res = this.api.post(url, params);
    return res;
  }

  queryUserProfile(userId) {
    const url = `api/profile/${userId}`;
    const res = this.api.get(url);
    return res;
  }

  updateUserProfile(userId, name, pwd, bday, horoscope) {
    const url = 'api/profile';
    const params = {
      userId: userId,
      name: name,
      password: pwd,
      birthday: bday,
      horoscope: horoscope,
    };
    const res = this.api.post(url, params);
    return res;
  }

  queryAllProducts() {
    const url = 'api/products';
    const res = this.api.get(url);
    return res;
  }

  queryProductInfo(id) {
    const url = `api/productInfo/${id}`;
    // const param = JSON.stringify({ id: id });
    const res = this.api.get(url);
    return res;
  }

  querySuggestions(horoscope, gender_id, type_id) {
    const url = 'api/suggestion';
    const params = {
      horoscope: horoscope,
      gender_id: gender_id,
      type_id: type_id,
    };
    const res = this.api.post(url, params);
    return res;
  }

  createOrder(userId, cartItems, total) {
    const url = 'api/orderHistory';
    const params = {
      user_id: userId,
      cart_items: cartItems,
      total: total,
    };
    console.log('create order params', params);
    const res = this.api.post(url, params);
    return res;
  }

  queryOrderHistory(userId) {
    const url = `api/orderHistory/${userId}`;
    const res = this.api.get(url);
    return res;
  }
}
