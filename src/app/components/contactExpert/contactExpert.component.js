import templateUrl from './contactExpert.view';
import left from 'shared/img/SVG/left.svg';
import right from 'shared/img/SVG/right.svg';

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
		$scope.left = left;
		$scope.right = right;
		$scope.position = 1;

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
			$scope.slots = slots;
		}

		$scope.moveCarousel = function(direction){
			console.log(direction);
			if(direction=="right")
			{
				if($scope.position!==$scope.timeSlots.length-2)
				{
					let leftval = $scope.position * 110;
					let div =document.querySelector(".ContactExpert__schedule");
					div.style.left = `-${leftval}px`;
					$scope.position++;
				}
			}else{
				console.log("left");
				if($scope.position>1)
				{
					console.log("here");
					let leftval = ($scope.position * 110)-110;
					console.log(leftval);
					let div =document.querySelector(".ContactExpert__schedule");
					div.style.left = `${leftval}px`;
					$scope.position--;
				}
			}
		}
		
	}
};

export {CONTACT_EXPERT_COMPONENT_NAME as contactExpertName, contactExpertComponent}