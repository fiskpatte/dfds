import React, { useState } from "react";
import { BlueBackground } from "../../shared/components/blueBackground";
import { Paper } from "../../shared/components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentCargo } from "../../store/actions/cargoActions";
import { ErrorMessage } from "../../shared/components/errorMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function EnterCargoScreen() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const onNextButtonClick = async () => {
    // I detta läge ska vi mocka ett cargo.
    // Sedan ska vi sätta detta i redux
    try {
      if (error) {
        setError("");
      }
      const cargo = await getMockCargo();
      dispatch(setCurrentCargo(cargo));
      history.push("/placecargo/confirmcargo");
      // go to mapscreen
    } catch (error) {
      // Show error
      setError("Cargo not found");
    }
  };

  return (
    <BlueBackground>
      <Paper>
        <h1>Enter cargo id</h1>
        <input
          style={{ width: "300px" }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write whatever, mockcargo will be used"
        />
        <button onClick={onNextButtonClick}>Next</button>
        {error && <ErrorMessage message={error} />}
      </Paper>
    </BlueBackground>
  );
}
