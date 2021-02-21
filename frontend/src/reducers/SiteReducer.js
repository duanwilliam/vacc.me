import { Actions } from 'actions';

const initialState = {
  sites: {},
  filtered: []
};

const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SITES:
      return {
        ...state,
        sites: action.payload
      };
    case Actions.FILTER_SITES:
      const newFiltered = action.payload.map((site) => [site.name, site.type]);
      return {
        ...state,
        filtered: newFiltered
      };
    default:
      return state;
  }
};

export default SiteReducer;