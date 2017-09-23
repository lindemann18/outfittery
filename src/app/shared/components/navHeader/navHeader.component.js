import config from 'config/config';
import navHeaderView from './navHeader.view';

require('./navHeader.style.sass');

function controller(AuthService) {
  const authenticatedMenu = [
    { name: 'menu.overview', url: '/orders' },
    { name: 'menu.myPaymentMethods', url: '/customer/paymentMethods' },
    { name: 'menu.myProfile', url: '/profile/edit' },
    { name: 'menu.tellAFriend', url: '/customers/rewards' },
    { name: 'menu.logout', url: '/logout' },
  ];
  const nonAuthenticatedMenu = [
    { name: 'menu.login', url: '/login/auth' },
    {
      name: 'menu.changeCountry',
      items: config.countryTLDs.map(countryTLD => ({
        name: `country.${countryTLD}`,
        url: config.countryUrls[countryTLD],
        icon: require(`shared/img/countries/${countryTLD}.svg`),
      })),
    },
  ];

  this.isAuthenticated = AuthService.isAuthenticated();
  this.menu = this.isAuthenticated
    ? authenticatedMenu
    : nonAuthenticatedMenu;
  this.showNav = false;

  this.toggleMenu = () => {
    this.showNav = !this.showNav;
  };
}

controller.$inject = ['AuthService'];

const NAV_HEADER_COMPONENT_NAME = 'psNavHeader';

const navHeaderComponent = {
  templateUrl: navHeaderView,
  controller,
};

export { NAV_HEADER_COMPONENT_NAME as navHeaderComponentName, navHeaderComponent };
