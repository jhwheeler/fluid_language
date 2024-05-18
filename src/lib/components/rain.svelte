  const DROPLET_COUNT = 250
  const BASE_SPEED = 1
  const BASE_COLOR_VALUE = 190 // min value for RGB to ensure lightness
  const COLOR_RANGE = 255 - BASE_COLOR_VALUE // range for random addition to base value
  const REDNESS_MULTIPLIER = 0.6
  const GREENNESS_MULTIPLIER = 0.9
  const BLUENESS_MULTIPLIER = 1
  const randomRGBValue = () => Math.floor(Math.random() * COLOR_RANGE + BASE_COLOR_VALUE)
    })`
      animationDuration: Math.random() + BASE_SPEED,
    }
