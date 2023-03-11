import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const createSuccessResponseObj = (res: AxiosResponse<any, any>) => {
  return {
    status: res.status,
    data: res.data,
  };
};
const fetchWeather = async (query: string = "singapore") => {
  try {
    const response =
      await axios.get(`${BASE_URL}?q=${query}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric
        `);

    const {
      weather,
      main: { temp, humidity },
      dt,
      name,
      sys: { country },
    } = response.data;
    const { description } = weather[0];

    const transformedWeatherResponse = {
      data: { temp, humidity, dt, name, country, description },
    };
    return createSuccessResponseObj({
      ...response,
      ...transformedWeatherResponse,
    });
  } catch (err) {
    return err;
  }
};

export { fetchWeather };
