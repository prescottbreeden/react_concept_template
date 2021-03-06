import { readPerson } from 'redux/actions/feature/person.actions';
import { API_SUCCESS } from 'redux/actions/core/api.actions';
import { PERSON_KEY } from 'redux/keys';
import { setData } from 'redux/actions/core/data.actions';
import { ReduxBaseAction } from 'types/core/baseAction.type';

export const personMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ReduxBaseAction<any>
) => {
  next(action);

  if (action.type.includes(PERSON_KEY)) {
    const { payload, meta } = action;
    switch (action.type) {
      case `${PERSON_KEY} ${API_SUCCESS} GET`:
        dispatch(
          setData({
            payload: payload,
            feature: meta.feature,
          })
        );
        break;

      case `${PERSON_KEY} ${API_SUCCESS} POST`:
      case `${PERSON_KEY} ${API_SUCCESS} PUT`:
      case `${PERSON_KEY} ${API_SUCCESS} PATCH`:
        next(readPerson(payload));
        break;
    }
  }
};
