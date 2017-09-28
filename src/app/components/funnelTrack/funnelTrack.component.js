import templateUrl  from './funnelTrack.view';
import shirt   		from 'shared/img/SVG/short4.svg'
import user    		from 'shared/img/SVG/user.svg';
import boxxx   		from 'shared/img/SVG/boxxx.svg';
import angular  	from 'angular';

const COMPONENT_NAME = "psFunnelTrack";

const funnelTrackComponent = {
	templateUrl,
	bindings:{

	},
	controller:function($scope)
	{
		$scope.shirt = shirt;
		$scope.user  = user;
		$scope.boxxx = boxxx;
	}
};

export {COMPONENT_NAME as funnelTrackName, funnelTrackComponent};