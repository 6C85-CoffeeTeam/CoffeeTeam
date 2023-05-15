const csvWorld = 
  `Year,Population
  1990,124.1849
  1995,93.3103
  2000,94.9042
  2005,111.8793
  2010,133.7085
  2015,151.2895
  2020,159.9058`;
const csvUS = 
  `Year,Population
  1990,46.5433
  1995,64.997
  2000,83.809
  2005,99.7858
  2010,119.2423
  2015,135.2357
  2020,141.0659`;

function csvConvert(csv) {
    return csv.split('\n').slice(1).map(str => {
      const [date, population] = str.split(',')
      .map((el) => (el > 1900 ? new Date(el, 0) : parseFloat(el)));
      return { date, population };
    });
  }
  const World = csvConvert(csvWorld);
  const US = csvConvert(csvUS);
//   const south = csvConvert(csvSouth);
//   const west = csvConvert(csvWest);
  
  export default [
    {
      id: 'World',
      data: World
    },
    {
      id: 'US',
      data: US
    }
  ]