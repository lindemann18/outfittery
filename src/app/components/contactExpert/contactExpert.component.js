import templateUrl from './contactExpert.view';
import 'angular-ui-carousel/dist/ui-carousel.css';

const CONTACT_EXPERT_COMPONENT_NAME = "psContactExpert";

const contactExpertComponent = {
	templateUrl,
	bindings:{
		shirtImg:"<",
		userImg:"<",
		boxxxImg:"<",
		stylistImg:"<",
		calendariconImg:"<"
	},
	controller:function($scope,$http,calendarService)
	{
		$scope.contactExpertFlag = false;
		$scope.shareWithStylist  = "";
		$scope.timeSlots = [];
		$scope.slots  = [];
		$scope.slides = ["holis","ada"];

		calendarService.getTimeSlots($http).then(
			function(response)
			{
				$scope.timeSlots = response.data;
				console.log($scope.timeSlots);
			},
			function(Err)
			{
				console.log(Err);
			}
		);

		$scope.submitOrder = function()
		{
			alert("holis");
		}

		$scope.clickbox = function()
		{
			$scope.contactExpertFlag = !$scope.contactExpertFlag;
		}

		$scope.showTime = function(slots)
		{
			console.log("holis");
			$scope.slots = slots;
		}
		
	}
};

export {CONTACT_EXPERT_COMPONENT_NAME as contactExpertName, contactExpertComponent}