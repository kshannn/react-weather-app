import { rest } from "msw";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const handlers = [
  rest.get(
    `${BASE_URL}?q=singapore&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          coord: {
            lon: 103.8501,
            lat: 1.2897,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
          base: "stations",
          main: {
            temp: 30.65,
            feels_like: 37.24,
            temp_min: 29.02,
            temp_max: 32.08,
            pressure: 1008,
            humidity: 72,
          },
          visibility: 10000,
          wind: {
            speed: 4.63,
            deg: 150,
          },
          clouds: {
            all: 75,
          },
          dt: 1685703167,
          sys: {
            type: 1,
            id: 9470,
            country: "SG",
            sunrise: 1685660218,
            sunset: 1685704100,
          },
          timezone: 28800,
          id: 1880252,
          name: "Singapore",
          cod: 200,
        })
      );
    }
  ),
];
