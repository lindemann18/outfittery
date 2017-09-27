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
		$scope.phoneNumbers = [];


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

		$scope.phoneNumbers =calendarService.getCountryPhoneCodes();
		console.log($scope.phoneNumbers);

		$scope.submitOrder = function()
		{
			alert("holis");
		}

		$scope.clickbox = function()
		{
			$scope.contactExpertFlag = !$scope.contactExpertFlag;

			if($scope.contactExpertFlag)
			{
				$scope.showTime($scope.timeSlots[0].slots);
				$scope.contactExpertInfo.date = $scope.timeSlots[0].date;
			}
		}

		$scope.showTime = function(slots,time)
		{
			$scope.slots = slots;
			$scope.contactExpertInfo.date = time;
		}

		$scope.moveCarousel = function(direction){
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