import * as timeZones from './timeZones';
import * as ui from './ui';

export const timeZoneExists = state =>
  timeZones.timeZoneExists(state.timeZones);
export const getEditedTimeZoneMinutes = state =>
  ui.getEditedTimeZoneMinutes(state.ui);
export const getEditedTimeZoneHours = state =>
  ui.getEditedTimeZoneHours(state.ui);
export const getEditedTimeZoneName = state =>
  ui.getEditedTimeZoneName(state.ui);

export const getEditedTimeZoneOffsettedHours = state =>
  ui.getEditedTimeZoneHours(state.ui, state.timeZones.offsetInMinutes);
export const getEditedTimeZoneOffsettedMinutes = state =>
  ui.getEditedTimeZoneMinutes(state.ui, state.timeZones.offsetInMinutes);
