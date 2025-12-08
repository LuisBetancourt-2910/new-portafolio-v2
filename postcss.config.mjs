const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "Firefox ESR",
        "not dead",
        "not ie 11"
      ]
    },
  },
};

export default config;
