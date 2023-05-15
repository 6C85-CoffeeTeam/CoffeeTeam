const csvWorld = 
  `Year,Population
  1990,15.6379
  1995,24.6575
  2000,34.2103
  2005,44.8882
  2010,58.7503
  2015,72.9855
  2020,98.5077`;
const csvUS =
  `Year,Population
  1990,10.8923
  1995,19.8509
  2000,29.0034
  2005,38.3822
  2010,49.1834
  2015,60.7457
  2020,77.3045`;

function csvConvert(csv) {
    return csv.split('\n').slice(1).map(str => {
      const [date, population] = str.split(',')
      .map((el) => (el > 1900 ? new Date(el, 0) : parseFloat(el)));
      return { date, population };
    });
  }
  const World = csvConvert(csvWorld);
  const US = csvConvert(csvUS);

  
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