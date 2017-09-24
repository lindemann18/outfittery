import './contactExpert.style.sass';
import angular from 'angular';
import {contactExpertName, contactExpertComponent} from './contactExpert.component';

const MODULE_COMPONENTEXPERT_NAME = 'ps-contactExpert';

angular.module(MODULE_COMPONENTEXPERT_NAME,[])
.component(contactExpertName, contactExpertComponent);

export default MODULE_COMPONENTEXPERT_NAME;

