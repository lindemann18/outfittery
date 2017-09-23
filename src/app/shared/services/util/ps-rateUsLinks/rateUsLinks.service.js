const SERVICE_NAME = 'RateUsLinksService';

const links = {
  com: 'http://www.surveygizmo.com/s3/3149311/Account-CX-tracking-copy',
  de: 'http://www.surveygizmo.com/s3/3149285/Account-DEU-Sie-copy',
  at: 'http://www.surveygizmo.com/s3/3149285/Account-DEU-Sie-copy',
  ch: 'http://www.surveygizmo.com/s3/3149285/Account-DEU-Sie-copy',
  lu: 'http://www.surveygizmo.com/s3/3149285/Account-DEU-Sie-copy',
  nl: 'http://www.surveygizmo.com/s3/3149290/Account-CX-NL-copy',
  be: 'http://www.surveygizmo.com/s3/3149307/Account-CX-BE-copy',
  se: 'https://app.surveygizmo.com/builder/build/id/3149287',
  dk: 'http://www.surveygizmo.com/s3/3149309/Account-CX-DK-copy',
};

function rateUsLinksService() {
  const getLink = (code) => links[code];

  return { getLink };
}

rateUsLinksService.$inject = [];

export { SERVICE_NAME as rateUsLinksServiceName, rateUsLinksService };
