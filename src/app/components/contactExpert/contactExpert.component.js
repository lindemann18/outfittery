

import templateUrl from './contactExpert.view';

const CONTACT_EXPERT_COMPONENT_NAME = "psContactExpert";

const contactExpertComponent = {
	templateUrl,
	bindings:{
		shirtImg:"<",
		userImg:"<",
		boxxxImg:"<",
		stylistImg:"<",
		calendariconImg:"<",
	},
};

export {CONTACT_EXPERT_COMPONENT_NAME as contactExpertName, contactExpertComponent}