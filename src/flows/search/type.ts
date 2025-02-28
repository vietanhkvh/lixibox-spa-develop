import { ACTION_TYPE } from '../action.config';

export const SEARCH_ALL = `${ACTION_TYPE.API_ACTION}/SEARCH_ALL`;
export const SEARCH_SUGGESTION = `${ACTION_TYPE.API_ACTION}/SEARCH_SUGGESTION`;
export const MAGAZINE_SEARCH_SUGGESTION = `${ACTION_TYPE.API_ACTION}/MAGAZINE_SEARCH_SUGGESTION`;
export const SEARCH_SUGGESTION_SELECT = `${ACTION_TYPE.INTERACTION_ACTION}/SEARCH_SUGGESTION_SELECT`;
export const CLEAR_DATA_SEARCH = `${ACTION_TYPE.BACKGROUND_ACTION}/CLEAR_DATA_SEARCH`;
export const GET_POPULAR_SEARCH = `${ACTION_TYPE.BACKGROUND_ACTION}/GET_POPULAR_SEARCH`;
export const GET_HISTORY_SEARCH = `${ACTION_TYPE.BACKGROUND_ACTION}/GET_HISTORY_SEARCH`;
export const TOGGLE_SUBMIT_SEARCH = `${ACTION_TYPE.BACKGROUND_ACTION}/TOGGLE_SUBMIT_SEARCH`;
export const SET_LAST_SEARCH_SOURCE = `${ACTION_TYPE.BACKGROUND_ACTION}/SET_LAST_SEARCH_SOURCE`;
export const GET_SEARCH_BAR_SECTIONS = `${ACTION_TYPE.BACKGROUND_ACTION}/GET_SEARCH_BAR_SECTIONS`;
