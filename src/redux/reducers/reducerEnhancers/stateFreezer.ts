function deepFreeze(object: any) {
  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object);
  // Freeze properties before freezing self
  for (let name of propNames) {
    let value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function stateFreezer(reducer: any) {
  return function freezer(state: any, action: any) {
    // freeze the state and run the original reducer
    deepFreeze(state);
    const newState = reducer(state, action);

    // freeze and return the result state
    deepFreeze(newState);
    return newState;
  };
}
