import { createAction } from 'redux-actions';

export const openTimeZoneSelect = createAction('OPEN_TIME_ZONE_SELECT');
export const closeTimeZoneSelect = createAction('CLOSE_TIME_ZONE_SELECT');

export const openTimeZoneEdit = createAction('OPEN_TIME_ZONE_EDIT');
export const closeTimeZoneEdit = createAction('CLOSE_TIME_ZONE_EDIT');
