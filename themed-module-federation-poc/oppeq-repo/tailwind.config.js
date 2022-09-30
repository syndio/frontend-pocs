const { colors } = require('tailwindcss/defaultTheme');

const customColors = {
  ...colors,
  red: {
    DEFAULT: '#B3250D',
  },
  yellow: {
    DEFAULT: '#FEB950',
  },
  green: {
    DEFAULT: '#61A058',
    400: '#4CAF50',
  },
  orange: {
    DEFAULT: '#FA811B',
  },
  purple: {
    DEFAULT: '#5544A2',
    100: '#D6CCFD',
    300: '#B197FA',
    500: '#5544A2',
  },
  // ONLY FOR OPPEQ LITE CHARTS
  purpleLegacy: {
    DEFAULT: '#540BB8',
  },
  blue: {
    DEFAULT: '#127CB8',
    100: '#D1EDFC',
    300: '#5EBBEE',
    500: '#127CB8',
  },
  pink: {
    DEFAULT: '#B91377',
    100: '#F7D4E9',
    300: '#EA8BC4',
    500: '#B91377',
  },
  gray: {
    DEFAULT: '#DDDDDD',
    100: '#F8F8F8',
    200: '#F2F2F2',
    300: '#DDDDDD',
    400: '#B0B0B0',
    500: '#666666',
    600: '#2E2E2E',
  },
  teal: {
    DEFAULT: '#007B80',
    100: '#E7F7F8',
    200: '#B8ECEF',
    400: '#30BCC0',
    600: '#007B80',
    800: '#015559',
  },
  // ONLY FOR OPPEQ LITE CHARTS
  tealLegacy: {
    DEFAULT: '#00A38F',
    600: '#00544C',
  },
};

const namedCustomColors = {
  // actions
  actionPrimary: customColors.teal.DEFAULT,
  actionAccent: customColors.teal[800],
  actionBg: customColors.teal[100],

  // text
  primary: customColors.gray[600],
  secondary: customColors.gray[500],

  // backgrounds
  bgLightest: customColors.gray[100],
  bgLight: customColors.gray[200],

  // borders
  borderLightest: customColors.gray[200],
  borderLight: customColors.gray[300],

  // data
  minority: customColors.purple.DEFAULT,
  majority: customColors.teal.DEFAULT,
  missing: customColors.gray[500],

  // alerts
  alertWarning: customColors.yellow.DEFAULT,
  alertError: customColors.red.DEFAULT,
  alertSuccess: customColors.green.DEFAULT,

  // charts
  chartsOther: customColors.gray[200],
  chartsGreen: customColors.green[400],

  // charts -- LEGACY
  minorityLegacy: customColors.purpleLegacy.DEFAULT,
  majorityLegacy: customColors.tealLegacy.DEFAULT,
  otherChartLegacy: customColors.tealLegacy[600],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-teal-white-gradient': `linear-gradient(90.16deg, rgba(174, 232, 233, 0.7) -13.33%, rgba(255, 255, 255, 0.7) 10.58%, rgba(255, 255, 255, 0.7) 40.05%)`,
        'light-teal-white-gradient-opaque': `linear-gradient(90.16deg, #cef1f2 -13.33%, #FFFFFF 10.58%, #FFFFFF 40.05%)`,
      },
      colors: {
        ...namedCustomColors,
        teal: {
          DEFAULT: '#007B80',
          50: '#AEE8E9',
          100: '#E7F7F8',
          200: '#B8ECEF',
          400: '#30BCC0',
          600: '#007B80',
          800: '#015559',
        },
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-in',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
