export const PARSER_FIELD_MODE = {
  INIT: 0,
  DECK_NAME: 1,
  LANE: 2,
  GRID: 3,
  FRAME: 4,
};

export const DECK_MAP_MODE = {
  OVERVIEW: 1,
  PLACE_CARGO: 2,
  DISCHARGE: 3,
};

export enum SwipeDirection {
  Undefined = -1,
  Up,
  Down,
  Left,
  Right,
}

export enum AdjacentSide {
  Right = 1,
  Left = -1,
  Undefined = 0,
}

export enum RouteKey {
  PlaceCargo = "PlaceCargo",
  PlaceCargoConfirm = "PlaceCargoConfirm",
  PlaceCargoDeckMap = "PlaceCargoDeckMap",
  Login = "Login",
  // Discharge = "Discharge",
  History = "History",
  Settings = "Settings",
  NoMatch = "NoMatch",
  DeckOverview = "DeckOverview",
}

export const DECK_MAP = {
  X_MARGIN: 8,
  Y_MARGIN: 2,
  X_SCALE: 1,
  Y_SCALE: 2.5,
  GRID_RADIUS: 0.2,
  LANE_BORDER_RADIUS: 0.5,
  LANE_BUTTON_WIDTH: 8,
  LANE_BUTTON_HEIGHT_RATIO: 0.8,
  LANE_NAME_WIDTH: 8,
  LANE_NAME_FONT_SIZE: 2,
  GRID_NAME_FONT_SIZE: 1.5,
  FRAME_NAME_FONT_SIZE: 1.5,
  BUTTON_ARROW_RATIO: 0.8,
  BASE_MARGIN: 0.5,
  FRAME_HEIGHT: 1,
  REPLACEMENT_BOX_HEIGHT: 5,
};
