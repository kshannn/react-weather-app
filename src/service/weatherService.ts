import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const createSuccessResponseObj = (response: AxiosResponse<any, any>) => {
  return {
    status: response.status,
    data: response.data,
  };
};
const fetchWeather = async (query: string = "singapore") => {
  try {
    const response =
      await axios.get(`${BASE_URL}?q=${query}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric
        `);
    return createSuccessResponseObj(response);
  } catch (err) {
    return err;
  }
};

export { fetchWeather };
