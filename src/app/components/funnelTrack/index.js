import './funnelTrack.style.sass';
import angular from 'angular';
import {funnelTrackName,funnelTrackComponent} from './funnelTrack.component';

const MODULE_NAME = "ps-funnelTrack";

angular.module(MODULE_NAME,[])
.component(funnelTrackName,funnelTrackComponent);

export default MODULE_NAME;
