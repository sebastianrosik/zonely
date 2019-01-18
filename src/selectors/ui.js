export const getEditedTimeZoneMinutes = (state, offsetInMinutes) => {
  if (!state.editedTimeZone) {
    return;
  }
  return state.editedTimeZone.getMinutes(offsetInMinutes);
};

export const getEditedTimeZoneHours = (state, offsetInMinutes) => {
  if (!state.editedTimeZone) {
    return;
  }
  return state.editedTimeZone.getHours(offsetInMinutes);
};

export const getEditedTimeZoneName = state => {
  if (!state.editedTimeZone) {
    return;
  }
  return state.editedTimeZone.name;
};
