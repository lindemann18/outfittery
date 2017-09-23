import templateUrl from './twitterShare.view';

function controller($window, referralLinkFactory) {
    this.share = () => {
        var link = referralLinkFactory(this.source, this.medium, this.campaign, this.referralCode, true);
        var twitterUrl = "https://twitter.com/intent/tweet?";
        var target = twitterUrl + 'url=' + link + '&text=' + (this.description || '');
        var params = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500px,height=280px';
        $window.open(target, "targetWindow", params);
    };
}

const bindings = {
    source: '@',
    medium: '@',
    campaign: '@',
    referralCode: '@',
    description: '@'
};

const COMPONENT_NAME = 'twitterShare';
const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings
};

export { COMPONENT_NAME, component };