function interceptor($httpProvider) {
  $httpProvider.interceptors.push('InterceptorService');
}

interceptor.$inject = ['$httpProvider'];

export default interceptor;
