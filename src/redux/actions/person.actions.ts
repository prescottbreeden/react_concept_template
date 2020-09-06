export const PERSON = '[PERSON]';
export const FETCH_PERSON = `${PERSON} FETCH`;
export const SET_PERSON = `${PERSON} SET`;

export const fetchPerson = ({query}: any) => {
  return {
    type: FETCH_PERSON,
    payload: query,
  };
};

export const setPerson = ({data, feature}: any) => {
  return {
    type: SET_PERSON,
    payload: data,
    meta: { feature }
  };
};


