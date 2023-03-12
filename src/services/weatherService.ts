import axios, { AxiosResponse } from "axios";
import { getCode } from "iso-3166-1-alpha-2";
import { startCase } from "lodash";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const createResponseObj = (res: AxiosResponse<any, any>) => {
  return {
    status: res.status,
    data: res.data,
  };
};
const fetchWeather = async (
  body: {
    city: string;
    country: string;
    isCountryCode?: boolean;
  } = {
    city: "singapore",
    country: "",
    isCountryCode: false,
  }
) => {
  try {
    const countryCode = body.isCountryCode
      ? body.country
      : startCase(getCode(body.country));

    const url = body.isCountryCode
      ? `${BASE_URL}?q=${body.city},${countryCode}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric
    `
      : `${BASE_URL}?q=${body.city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric
    `;

    const response = await axios.get(url);

    const {
      weather,
      main: { temp, humidity, temp_max, temp_min },
      dt,
      name,
      sys: { country },
    } = response.data;
    const { description, icon } = weather[0];

    const transformedWeatherResponse = {
      data: { temp, humidity, temp_max, temp_min, dt, name, country, description, icon },
    };
    return createResponseObj({
      ...response,
      ...transformedWeatherResponse,
    });
  } catch (err: any) {
    return createResponseObj(err.response);
  }
};

export { fetchWeather };
