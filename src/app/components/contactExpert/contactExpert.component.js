

import templateUrl from './contactExpert.view';

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
		calendarService.getTimeSlots($http).then(
			function(response)
			{
				$scope.timeSlots = response.data;
			},
			function(Err)
			{
				console.log(Err);
			}
		);


		$scope.clickbox = function()
		{
			$scope.contactExpertFlag = !$scope.contactExpertFlag;
		}
	}
};

export {CONTACT_EXPERT_COMPONENT_NAME as contactExpertName, contactExpertComponent}