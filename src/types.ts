export type Query = {
  country: string;
  city: string;
};

export type Weather = {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  dateTime: number;
  country: string;
  countryCode: string;
  description: string;
  icon: string;
};

export type SearchHistoryType = {
  query: string;
  queryTime: number;
  countryCode: string;
};
