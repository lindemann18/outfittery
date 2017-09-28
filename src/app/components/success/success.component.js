import templateUrl   from './success.view';
const COMPONENT_NAME = "psSuccess";

const successComponent = {
	templateUrl,
	bindings:{

	},
	controller: function()
	{
		alert("holis");
	}
};

export {COMPONENT_NAME as successName,successComponent};