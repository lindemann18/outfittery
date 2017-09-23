import templateUrl from './facebookShare.view';

function controller($facebook, referralLinkFactory) {
    this.share = () => {
        var link = referralLinkFactory(this.source, this.medium, this.campaign, this.referralCode);
        $facebook.ui({
            method: 'share',
            href: link
        });
    };
};

const bindings = {
    source: '@',
    medium: '@',
    campaign: '@',
    referralCode: '@'
};

const COMPONENT_NAME = 'facebookShare';
const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings
};

export { COMPONENT_NAME, component };