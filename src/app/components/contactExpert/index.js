import './contactExpert.style.sass';
import angular from 'angular';
import {contactExpertName, contactExpertComponent} from './contactExpert.component';

const MODULE_NAME = 'ps-contactExpert';

angular.module(MODULE_NAME,[])
.component(contactExpertName, contactExpertComponent);

export default MODULE_NAME;

