import React, { useState } from "react";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getMockCargo } from "../../api/endpoints";
import { setCurrentCargo } from "../../store/actions/cargoActions";
import { ErrorMessage } from "../../components/errorMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../../components/textInput";
import Button from "../../components/button";
import Text from "../../components/Text";
import Separator from "../../components/separator";

export const EnterCargoScreen = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const onNextButtonClick = async () => {
    try {
      if (error) {
        setError("");
      }
      const cargo = await getMockCargo();
      dispatch(setCurrentCargo(cargo));
      history.push("/placecargo/confirmcargo");
      // go to mapscreen
    } catch (error) {
      setError("Cargo not found");
    }
  };

  return (
    <BlueBackground>
      <Paper>
        <Text type="header2" value="Enter cargo ID" />
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        <Separator />
        <Button type="positive" label="Next" onClick={onNextButtonClick} />
        {error && <ErrorMessage message={error} />}
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;
