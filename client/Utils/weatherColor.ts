
export const getWeatherBackground = (condition: string) => {
  const weatherBackgrounds = {
    sunny: {
      gradient: 'linear-gradient(to bottom, #fddb92, #1e3c72)',
    },
    clear: {
      gradient: 'linear-gradient(to bottom, #fddb92, #1e3c72)', 
    },
    partly_sunny: {
      gradient: 'linear-gradient(to bottom, #fceabb, #b95d00)',
    },
    overcast: {
      gradient: 'linear-gradient(to bottom, #bdc3c7, #1e1e1e)', 
    },
    cloudy: {
      gradient: 'linear-gradient(to bottom, #bdc3c7, #1e1e1e)', 
    },
    light_rain: {
      gradient: 'linear-gradient(to bottom, #89f7fe, #2a2a72)',
    },
    heavy_rain: {
      gradient: 'linear-gradient(to bottom, #283e51, #0f2027)', 
    },
    snow: {
      gradient: 'linear-gradient(to bottom, #e0eafc, #a3b5d3)', 
    },
    ice: {
      gradient: 'linear-gradient(to bottom, #e0eafc, #a3b5d3)', 
    },
    fog: {
      gradient: 'linear-gradient(to bottom, #d7d2cc, #1b2735)', 
    },
    mist: {
      gradient: 'linear-gradient(to bottom, #d7d2cc, #1b2735)', 
    },
    haze: {
      gradient: 'linear-gradient(to bottom, #d7d2cc, #1b2735)', 
    },
    thunder: {
      gradient: 'linear-gradient(to bottom, #283e51, #0f2027)', 
    },
    drizzle: {
      gradient: 'linear-gradient(to bottom, #89f7fe, #66a6ff)', 
    },
    patchy_rain: {
      gradient: 'linear-gradient(to bottom, #89f7fe, #66a6ff)', 
    },
    patchy_snow: {
      gradient: 'linear-gradient(to bottom, #e0eafc, #a3b5d3)', 
    },
    blowing_snow: {
      gradient: 'linear-gradient(to bottom, #d7d2cc, #1b2735)', 
    },
    freezing_fog: {
      gradient: 'linear-gradient(to bottom, #e0eafc, #a3b5d3)', 
    },
    light_sleet: {
      gradient: 'linear-gradient(to bottom, #e0eafc, #a3b5d3)', 
    },
  };

  let backgroundStyle = weatherBackgrounds.sunny;

  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    backgroundStyle = weatherBackgrounds.sunny;
  } else if (lowerCondition.includes('partly') || lowerCondition.includes('mostly sunny')) {
    backgroundStyle = weatherBackgrounds.partly_sunny;
  } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    backgroundStyle = weatherBackgrounds.cloudy;
  } else if (lowerCondition.includes('light rain') || lowerCondition.includes('showers') || lowerCondition.includes('drizzle') || lowerCondition.includes('patchy rain')) {
    backgroundStyle = weatherBackgrounds.light_rain;
  } else if (lowerCondition.includes('heavy rain') || lowerCondition.includes('thunder')) {
    backgroundStyle = weatherBackgrounds.heavy_rain;
  } else if (lowerCondition.includes('snow') || lowerCondition.includes('ice')) {
    backgroundStyle = weatherBackgrounds.snow;
  } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist') || lowerCondition.includes('haze')) {
    backgroundStyle = weatherBackgrounds.fog;
  } else if (lowerCondition.includes('blowing snow')) {
    backgroundStyle = weatherBackgrounds.blowing_snow;
  } else if (lowerCondition.includes('freezing fog')) {
    backgroundStyle = weatherBackgrounds.freezing_fog;
  } else if (lowerCondition.includes('light sleet')) {
    backgroundStyle = weatherBackgrounds.light_sleet;
  }

  return backgroundStyle;
};
