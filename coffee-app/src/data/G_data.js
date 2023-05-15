const csvWorld = 
  `Year,Population
  1990,34.8189
  1995,46.1891
  2000,58.2796
  2005,73.6715
  2010,92.4898
  2015,111.8115
  2020,136.8431`;
const csvUS =
  `Year,Population
  1990,22.5739
  1995,35.7929
  2000,49.2870
  2005,64.3349
  2010,81.7495
  2015,99.1516
  2020,122.6849`;

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