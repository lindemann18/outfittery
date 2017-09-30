import templateUrl from './contactExpert.view';
import left from 'shared/img/SVG/left.svg';
import right from 'shared/img/SVG/right.svg';
import angular from 'angular';

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
	controller:function($scope,$http,calendarService,$state)
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
		$scope.selectedIndex = "";
		$scope.contactExpertInfo = {
			orderConfirmationComment:"",
			slot:"",
			date:""
		};
		$scope.numberPhone = {
			code:null,
			number:null
		};
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
				$scope.textOrerror = "Ops! There was an error";
			}
		);

		$scope.phoneNumbers =calendarService.getCountryPhoneCodes();

		$scope.submitOrder = function()
		{
				
			// Setting the information for the submit request.
			$scope.contactExpertFlag = false;
			$scope.loading = true;
			$scope.contactExpertInfo.phone = $scope.numberPhone.code + $scope.numberPhone.number;


			calendarService.submitAppointment($http,$scope.contactExpertInfo).then(
				function(response)
				{
					localStorage.setItem("stylist",response.data.stylist);
					if(response.status===201)
					{
						window.location.assign("/success");
					}
				},
				function(Err)
				{
					console.log(Err);
				}
			);

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

		$scope.showTime = function(slots,time,index)
		{
			$scope.selectedIndex = index;
			$scope.slots = slots;
			$scope.contactExpertInfo.date = time;
		}

		$scope.moveCarousel = function(direction){
			if(direction=="right")
			{
				if($scope.position!==$scope.timeSlots.length-2)
				{
					let leftval = $scope.position * 81;
					let div =document.querySelector(".ContactExpert__schedule");
					div.style.left = `-${leftval}px`;
					$scope.position++;
				}
			}else{
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