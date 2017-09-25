import angular from 'angular';
const URL = "https://nrg-frontend-task-api.herokuapp.com/";
let timeSlots = [];
const SERVICE_NAME = "calendarService";

// $http param

function getTimeSlots($http)
{
	const URL_GET_SLOTS = `${URL}timeslots`;
	return $http.get(URL_GET_SLOTS);
}


function calendarRequestService()
{

	return{
		getTimeSlots: getTimeSlots
	}
}

calendarRequestService.$inject = ["$http"];

export { SERVICE_NAME as calendarRequestServiceName, calendarRequestService };