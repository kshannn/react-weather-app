import Dotenv from "dotenv-webpack";
import { Configuration } from "webpack";

const config: Configuration = {
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
};

export default config;
