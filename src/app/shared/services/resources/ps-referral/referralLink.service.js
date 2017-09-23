const SERVICE_NAME = 'referralLinkFactory';

const referralLinkFactory = ($window, UrlBuilderService) => {
    return (source, medium, campaign, referralCode, encode = false) => {
        const params = {utm_source:source, utm_medium:medium, utm_campaign:campaign, utm_content:referralCode};
        const url = UrlBuilderService.createUrl('/friends', undefined, params, $window.location.origin);
        return encode ? encodeURIComponent(url) : url;
    };
};

export { SERVICE_NAME as referralLinkFactoryName, referralLinkFactory };