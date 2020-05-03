import React, { useEffect } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { ConfirmButton } from "./confirmButton";
import { setCurrentPlacement } from "../../store/cargo/cargoActions";
import { placeCargo } from "../../api/endpoints";
import { getCurrentDeck } from "../../store/app/appSelectors";
import { useHistory } from "react-router-dom";

export const DeckMapContainer: React.FC = () => {
  const { deckMap } = useSelector((state: RootState) => state.appReducer);
  const { currentCargo, currentPlacement } = useSelector(
    (state: RootState) => state.cargoReducer
  );

  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setCurrentPlacement(null));
  }, [dispatch, currentDeck]);

  const onConfirm = async () => {
    // set loader
    await placeCargo({
      ...currentCargo,
      ...currentPlacement,
      deckId: currentDeck.name,
    });
    dispatch(setCurrentPlacement(null));
    history.push("/placecargo");
  };

  return (
    <div className="DeckMap">
      <div className="Header">
        <CargoDetails currentCargo={currentCargo} />
        <DeckSelector deckMap={deckMap} currentDeck={currentDeck} />
      </div>
      <DeckMap
        currentCargo={currentCargo}
        currentDeck={currentDeck}
        currentPlacement={currentPlacement}
      />
      <div className="Footer">
        {currentPlacement ? (
          <ConfirmButton onClick={() => onConfirm()} />
        ) : null}
      </div>
    </div>
  );
};

export default DeckMapContainer;
