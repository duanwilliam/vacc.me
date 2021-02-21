import { Actions } from 'actions';

const initialState = {
  sites: {},
  filtered: []
};

const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SITES:
      console.log(action.payload);
      return {
        ...state,
        sites: action.payload
      };
    case Actions.FILTER_SITES:
      console.log(action.payload);
      const newFiltered = action.payload.map((site) => [site.name, site.type]);
      console.log(newFiltered);
        return {
          ...state,
          filtered: newFiltered
        };
    default:
      return state;
  }
};

export default SiteReducer;