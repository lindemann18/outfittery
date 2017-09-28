import './contactExpert.style.sass';
import angular from 'angular';
import psFunnelTrack from 'components/funnelTrack';

import {contactExpertName, contactExpertComponent} from './contactExpert.component';

const MODULE_NAME = 'ps-contactExpert';

angular.module(MODULE_NAME,[psFunnelTrack])
.component(contactExpertName, contactExpertComponent);

export default MODULE_NAME;

