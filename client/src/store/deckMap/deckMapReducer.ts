import { cargoFactory } from "../../types/deckMap";
import { CargoState } from "../types";
import { DECK_MAP_ACTION_TYPES } from "./deckMapActionTypes";
import _ from "lodash";

const initialState: CargoState = {
  currentCargo: cargoFactory(),
  currentPlacement: null,
  deckMap: {},
  currentDeckId: undefined,
};
const deckMapReducer = (state = initialState, action: any): CargoState => {
  const { type, payload } = action;

  switch (type) {
    case DECK_MAP_ACTION_TYPES.SET_CURRENT_CARGO:
      return {
        ...state,
        currentCargo: payload,
      };
    case DECK_MAP_ACTION_TYPES.SET_CURRENT_PLACEMENT:
      return {
        ...state,
        currentPlacement: payload,
      };
    case DECK_MAP_ACTION_TYPES.SET_DECK_MAP:
      return {
        ...state,
        deckMap: payload,
      };
    case DECK_MAP_ACTION_TYPES.SET_CURRENT_DECK_ID: {
      return {
        ...state,
        currentDeckId: payload,
      };
    }
    case DECK_MAP_ACTION_TYPES.ADD_CARGO_PLACEMENT: {
      const deckMap = _.cloneDeep(state.deckMap);
      deckMap[payload.deckId].lanes
        .find((l) => l.id === payload.laneId)
        ?.cargo.push(payload);
      return {
        ...state,
        deckMap,
      };
    }
    default:
      return state;
  }
};

export default deckMapReducer;
