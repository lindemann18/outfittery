// import all the assets
import icon-Money  from 'icon-Money.svg';
import icon-house  from 'icon-house.svg';
import icon-pick   from 'icon-pick.svg';
import icon-wallet from 'icon-wallet'ç,

const CONTROLLER_NAME = "contactExpertController";

function contactExpertController()
{
	console.log("holis");
}

contactExpertController.$inject = ['$timeout', '$http', 'LoggerService', 'AbLoggerService'];

export { CONTROLLER_NAME as contactExpertControllerName, contactExpertController };