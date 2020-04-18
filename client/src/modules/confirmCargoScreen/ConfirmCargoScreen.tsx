import React from "react";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import Text from "../../components/text";
import Button from "../../components/button";
import "./ConfirmCargoScreen.scss";
import Separator from "../../components/separator";

export const ConfirmCargoScreen = () => {
  const { currentCargo: cargo } = useSelector(
    (state: RootState) => state.cargoReducer
  );

  const history = useHistory();
  if (cargo.registrationNumber === "") {
    history.push("/placecargo");
  }
  return (
    <BlueBackground>
      <Paper>
        <Text size="medium" value="Confirm cargo" />
        <table>
          <tbody>
            <tr>
              <td className="LabelCell">Cargo ID</td>
              <td className="ValueCell">{cargo.registrationNumber}</td>
            </tr>
            <tr>
              <td className="LabelCell">Type</td>
              <td className="ValueCell">Truck</td>
            </tr>
            <tr>
              <td className="LabelCell">Length</td>
              <td className="ValueCell">{cargo.length}</td>
            </tr>
            <tr>
              <td className="LabelCell">Width</td>
              <td className="ValueCell">{cargo.width}</td>
            </tr>
            <tr>
              <td className="LabelCell">Height</td>
              <td className="ValueCell">{cargo.height}</td>
            </tr>
            <tr>
              <td className="LabelCell">Weight</td>
              <td className="ValueCell">{cargo.weight}</td>
            </tr>
          </tbody>
        </table>
        <Separator />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1 }}>
            <Button
              onClick={() => history.push("/placecargo")}
              label="Cancel"
              type="danger"
            />
          </div>
          <div style={{ flex: 1, margin: "0 0 0 10px" }}>
            <Button
              onClick={() => history.push("/placecargo/deckmap")}
              label="Next"
              type="positive"
            />
          </div>
        </div>
      </Paper>
    </BlueBackground>
  );
};

export default ConfirmCargoScreen;
