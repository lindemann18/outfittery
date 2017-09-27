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
		$scope.loading  = true;
		$scope.textOrerror = "";
		$scope.contactExpertInfo = {};
		$scope.textOrerror = "Loading...";
		calendarService.getTimeSlots($http).then(
			function(response)
			{
				$scope.timeSlots = response.data;
				$scope.loading  = false;
				$scope.textOrerror = "";
			},
			function(Err)
			{
				console.log(Err);
				$scope.textOrerror = "Ops! There was an error";
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
				if($scope.position!==$scope.timeSlots.length-3)
				{
					let leftval = $scope.position * 81;
					let div =document.querySelector(".ContactExpert__schedule");
					div.style.left = `-${leftval}px`;
					$scope.position++;
				}
			}else{
				console.log("left");
				if($scope.position>1)
				{
					$scope.position--;
					let leftval = ($scope.position * -81)+81;
					let div =document.querySelector(".ContactExpert__schedule");
					div.style.left = `${leftval}px`;
				}
			}
		}
		
	}
};

export {CONTACT_EXPERT_COMPONENT_NAME as contactExpertName, contactExpertComponent}