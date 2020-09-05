export const PERSON = '[PERSON]';
export const FETCH_PERSON = `${PERSON} Fetch`;
export const SET_PERSON = `${PERSON} Set`;

export const fetchPerson = ({query}: any) => {
  return {
    type: FETCH_PERSON,
    payload: query,
  };
};

export const setPerson = ({personData}: any) => {
  return {
    type: SET_PERSON,
    payload: personData,
  };
};


