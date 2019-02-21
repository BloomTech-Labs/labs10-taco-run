import {
  FAVORITES_SEARCH_START,
  FAVORITES_SEARCH_COMPLETE,
  FAVORITES_SEARCH_ERROR
} from "../actions/favoritesActions";

const initialState = {
  locations: [],
  searchingFavorites: false,
  searchedFavorites: false,
  error: null
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_SEARCH_START:
      return {
        ...state,
        searchingFavorites: true,
        searchedFavorites: false
      };
    case FAVORITES_SEARCH_COMPLETE:
      return {
        ...state,
        locations: action.payload,
        searchingFavorites: false,
        searchedFavorites: true,
        error: null
      };

    case FAVORITES_SEARCH_ERROR:
      return {
        ...state,
        error: "Error searching favorites"
      };
    default:
      return state;
  }
};

export default favoritesReducer;
