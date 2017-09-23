const SERVICE_NAME = 'CountriesService';

const countries = {
  DE: 'Deutschland',
  AT: 'Österreich',
  CH: 'Schweiz',
  NL: 'Nederland',
  DK: 'Danmark',
  SE: 'Sverige',
  LU: 'Luxembourg',
  BE: 'België',
};

function countriesService() {
  const fromCode = (code) => countries[code];
  return { fromCode };
}

countriesService.$inject = [];

export { SERVICE_NAME as countriesServiceName, countriesService };
