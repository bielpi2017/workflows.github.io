export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#10100E", coal: "#191714", wood: "#513522", gold: "#C39A55", sand: "#E8DCC6", cream: "#F7F2E9" },
    fontFamily: { serif: ['"Playfair Display"', "Georgia", "serif"], sans: ["Inter", "system-ui", "sans-serif"] },
  } },
  plugins: [],
};
