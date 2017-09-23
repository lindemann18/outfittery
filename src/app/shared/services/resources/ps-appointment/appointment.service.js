import angular from 'angular';

const SERVICE_NAME = 'AppointmentResourcesService';

/**
 * Resource service for the address API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function appointmentService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    schedule: (customerId) => `/customers/${customerId}/appointments/schedule`,
    appointments: () => '/customers/appointments/',
    reset: (customerId, id) => `/customers/${customerId}/appointments/${id}/reset`,
    update: (customerId, id) => `/customers/${customerId}/appointments/${id}`,
  };
  return {
    /**
     * API method for retrieving list of stylist availabilities times for a specific customer.
     * @param customerID
     * @param id - (optional) ID of the order, if given balancer
     * will work on this specific order instead of on the customer
     * @param apiVersion
     * @returns {promise}
     */
    getAvailableAppointmentsById: (customerID, id, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.schedule(customerID), null,
            { id, timezoneOffset: new Date().getTimezoneOffset() }),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME,
        'getAvailableAppointmentsById - missing customer ID');
    },
    /**
     * API method for retrieving list of stylist availabilities times for a specific country.
     * @param countryCode
     * @param apiVersion
     * @returns {promise}
     */
    getAvailableAppointmentsByCountry: (countryCode, apiVersion = '3.0.0') => {
      if (angular.isDefined(countryCode)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.schedule(countryCode)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME,
        'getAvailableAppointmentsByCountry - missing countryCode');
    },
    /**
     * API method for retrieving list of customer appointments.
     * @param id
     * @param apiVersion
     * @returns {promise}
     */
    getCustomerAppointments: (id, apiVersion = '3.0.0') => {
      if (angular.isDefined(id)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.appointments(), null,
            { id, timezoneOffset: new Date().getTimezoneOffset() }),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME,
        'getCustomerAppointments - missing customerID');
    },
    /**
     * API method for reset a appointment for a specific order.
     * @param customerID
     * @param id - orderID
     * @param salesChannel - string
     * @param apiVersion
     * @returns {*}
     */
    resetCustomerAppointment: (customerID, id, salesChannel, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(id) &&
        angular.isDefined(salesChannel)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.reset(customerID, id)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: salesChannel,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME,
        'resetCustomerAppointment - missing params');
    },
    /**
     * API method for updating a appointment for a specific order.
     * @param customerID
     * @param id - orderID
     * @param appointmentData - object literal
     * @param apiVersion
     * @returns {*}
     */
    updateCustomerAppointmentByOrderId: (customerID, id, appointmentData, apiVersion = '3.0.0') => {
      if (angular.isDefined(customerID) &&
        angular.isDefined(id) &&
        angular.isDefined(appointmentData)) {
        appointmentData.timezoneOffset = new Date().getTimezoneOffset();
        appointmentData.id = id;
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.update(customerID, id)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: appointmentData,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME,
        'updateCustomerAppointmentByOrderId - missing params');
    },
  };
}

appointmentService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as appointmentServiceName, appointmentService };
