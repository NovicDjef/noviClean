import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    white: '#FFFFFF',
    secondaryWhite: '#F7F7F8',
    black: '#030013',
    secondaryBlack: '#444654',
    tertiaryBlack: '#202123',
    gray: 'F8F8F8',
    secondaryGray: '#808080',
    primary: '#637aff',
    primaryDark: '#2759ff',
    primaryLite: '#637aff99',
    black: '#000',
    white: '#ffffff',
    accent: '#112233',
    green: '#60c5a8',
    green2: '#039a83',
    light: '#EEEEEE',
    dark: '#333',
    gray: '#CCCCCC',
    red: '#ff2f68',
    lightRed: '#ff4f7e',
    darkRed: '#d9365e',
    purple: '#8f06e4',
    skyBlue: 'skyblue',
    yellow: '#f8c907',
    pink: '#ff4c98',
    gold: 'gold',
    line: '#282C35',
    gray: '#CCCCCC',
    darkGray: '#999999',
}

export const SIZES = {
    // Global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,

    // FONTS Sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // App Dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
