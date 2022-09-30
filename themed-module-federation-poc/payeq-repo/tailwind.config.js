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

const charts = {
  charts: {
    pc: customColors.teal.DEFAULT,
    majority: customColors.teal[400],
    tertiary: customColors.teal[200],
  },
};
const gender = {
  gender: {
    pc: customColors.purple.DEFAULT,
    majority: customColors.purple[100],
    tertiary: customColors.purple[300],
  },
};

const race = {
  race: {
    pc: customColors.blue.DEFAULT,
    majority: customColors.blue[100],
    tertiary: customColors.blue[300],
  },
};

const custom = {
  custom: {
    pc: customColors.pink.DEFAULT,
    majority: customColors.pink[100],
    tertiary: customColors.pink[300],
  },
};

const customFontSizes = {
  xxs: 11,
  xs: 12,
  sm: 13,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 22,
  '4xl': 24,
  '20px': '20px', // TODO: Remove after lenaripple/OPPEQR-524 is merged
  '24px': '24px', // TODO: Remove after lenaripple/OPPEQR-524 is merged
};

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */
/** @typedef { DefaultConfig & { theme: { extend: DefaultTheme } } } TailwindConfig */

/** @type {TailwindConfig} */
module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      minWidth: {
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        '42px': '42px',
        175: '175px',
        alert: '300px',
        summaryStats: '5rem',
      },
      maxWidth: {
        '280px': '280px',
        '800px': '800px',
      },
      width: {
        invitemodal: '592px',
        cookiebanner: '90%',
        levelsTooltip: '247px',
        levelsTooltipXL: '300px',
      },
      margin: {
        18: '4.5rem',
        header: '60px',
        cookiebanner: '0 0 0 5%',
      },
      height: {
        '20px': '20px',
        '32px': '32px',
        '410px': '410px',
        header: '60px',
      },
      lineHeight: {
        1.2: '1.2', // TODO: Remove after lenaripple/OPPEQR-524 is merged
      },
      flexGrow: {
        3: 3,
      },
      inset: {
        header: '60px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: namedCustomColors.primary,
            fontWeight: 400,
            lineHeight: 1.2,
          },
        },
        'header-1': {
          // 24px
          css: {
            fontSize: customFontSizes['4xl'],
            fontWeight: 700,
          },
        },
        'header-2': {
          // 20px
          css: {
            fontSize: customFontSizes['2xl'],
            fontWeight: 700,
          },
        },
        'header-3': {
          // 18px
          css: {
            fontSize: customFontSizes.xl,
          },
        },
        'header-4': {
          // 13px all caps
          css: {
            fontSize: customFontSizes.sm,
            textTransform: 'uppercase',
          },
        },
        'body-regular': {
          // 14px
          css: {
            fontSize: customFontSizes.base,
          },
        },
        'body-heavy': {
          // 14px bold
          css: {
            fontSize: customFontSizes.base,
            fontWeight: 600,
          },
        },
        'helper-regular-12': {
          // 12px
          css: {
            fontSize: customFontSizes.xs,
          },
        },
        'helper-regular': {
          // 13px
          css: {
            fontSize: customFontSizes.sm,
          },
        },
        'helper-regular-16': {
          // 16px
          css: {
            fontSize: customFontSizes.lg,
          },
        },
        'helper-heavy': {
          // 13px bold
          css: {
            fontSize: customFontSizes.sm,
            fontWeight: 600,
          },
        },
        'helper-italic': {
          // 13px italic
          css: {
            fontSize: customFontSizes.sm,
            fontStyle: 'italic',
          },
        },
        link: {
          // 14px teal, dark teal hover
          css: {
            fontSize: customFontSizes.base,
            color: namedCustomColors.actionPrimary,
            '&:hover': {
              color: namedCustomColors.actionAccent,
              cursor: 'pointer',
            },
          },
        },
        'link-disabled': {
          // 14px gray
          css: {
            fontSize: customFontSizes.base,
            color: namedCustomColors.secondary,
          },
        },
      },
      outline: {
        blue: `2px solid ${customColors.teal.DEFAULT}`,
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
      backgroundImage: {
        'light-purple-white-gradient': `linear-gradient(92.94deg, ${colors.purple[500]} -31.27%, ${colors.white} 10.06%, ${colors.white} 327.06%)`,
        'light-teal-white-gradient': `linear-gradient(90.16deg, rgba(174, 232, 233, 0.7) -13.33%, rgba(255, 255, 255, 0.7) 10.58%, rgba(255, 255, 255, 0.7) 40.05%)`,
        'light-teal-white-gradient-opaque': `linear-gradient(90.16deg, ${namedCustomColors.actionBg} -13.33%, ${colors.white} 10.58%, ${colors.white} 40.05%)`,
        'gray-white-vertical-gradient': `linear-gradient(${colors.white} 430px, ${namedCustomColors.bgLightest} 570px)`,
      },
      zIndex: {
        top: '1000',
      },
    },
    colors: {
      ...customColors,
      ...namedCustomColors,
      ...charts,
      ...gender,
      ...race,
      ...custom,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      ...customFontSizes,
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    extend: {
      opacity: ['disabled'],
      cursor: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
