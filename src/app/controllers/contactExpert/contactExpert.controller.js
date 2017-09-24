// import all the assets
import shirt   		from 'shared/img/SVG/short4.svg'
import user    		from 'shared/img/SVG/user.svg';
import boxxx   		from 'shared/img/SVG/boxxx.svg';
import stylist 		from 'img/Stylist.png';
import calendaricon from 'img/calendar-icon.svg';

const CONTROLLER_NAME = "contactExpertController";

function contactExpertController()
{
	const self 	 	  = this;
	self.user  	 	  = user;
	self.shirt 	 	  = shirt;
	self.boxxx 	 	  = boxxx;
	self.stylist 	  = stylist;
	self.calendaricon = calendaricon;

	self.clickBox = function()
	{
		alert("holis");
	}
}

contactExpertController.$inject = ['$timeout', '$http', 'LoggerService', 'AbLoggerService'];

export { CONTROLLER_NAME as contactExpertControllerName, contactExpertController };