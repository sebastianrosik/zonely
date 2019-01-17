import React, { Fragment } from 'react';
export const addTimeZone = () => 'Add time zone';
export const selectTimeZone = () => 'Pleas select a time zone';
export const noTimeZoneFound = name => (
  <Fragment>
    Time zone <strong>{name}</strong> not found
  </Fragment>
);
export const searchTimeZone = () => 'Search';
