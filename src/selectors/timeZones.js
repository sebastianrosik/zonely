export const timeZoneExists = (state, name) =>
  state.list.find(timeZone => name === timeZone.name);
