import templateUrl   from './success.view';
import stylist       from 'img/stylist_round.png';
import wallet		 from 'img/icon-wallet.svg';
import house		 from 'img/icon-house.svg';
import money		 from 'img/icon-Money.svg';

const COMPONENT_NAME = "psSuccess";

const successComponent = {
	templateUrl,
	bindings:{

	},
	controller: function($scope,calendarService)
	{
		$scope.stylist = stylist;
		$scope.wallet = wallet;
		$scope.house = house;
		$scope.money = money;
		$scope.stylistName = localStorage.getItem("stylist");
	}
};

export {COMPONENT_NAME as successName,successComponent};