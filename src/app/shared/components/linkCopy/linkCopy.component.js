import templateUrl from './linkCopy.view.html';

function controller(referralLinkFactory) {
    this.buildLink = () => {
        this.link = referralLinkFactory(this.source, this.medium, this.campaign, this.referralCode);
    };
}

const bindings = {
    source: '@',
    medium: '@',
    campaign: '@',
    referralCode: '@'
};

const COMPONENT_NAME = 'linkCopy';
const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings
};

export { COMPONENT_NAME, component };