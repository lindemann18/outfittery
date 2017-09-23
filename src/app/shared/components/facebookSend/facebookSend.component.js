import templateUrl from './facebookSend.view';

function controller($facebook, referralLinkFactory) {
    this.send = () => {
        var link = referralLinkFactory(this.source, this.medium, this.campaign, this.referralCode);
        $facebook.ui({
            method: 'send',
            link: link
        });
    };
};

const bindings = {
    source: '@',
    medium: '@',
    campaign: '@',
    referralCode: '@'
};

const COMPONENT_NAME = 'facebookSend';
const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings
};

export { COMPONENT_NAME, component };