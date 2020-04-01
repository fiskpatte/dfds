import React, { useState } from "react";
import { Card } from "../../../shared/components/card";
import CargoDetailItem from "./CargoDetailsItem";
import { Collapsible } from "../../../shared/components/collapsible";
import "./CargoDetails.scss";
import variables from "./CargoDetails.scss";
import { Overlay } from "../../../shared/components/overlay";
import { Cargo } from "./../../../shared/types/deckMap";
import { useHistory } from "react-router-dom";

interface Props {
  currentCargo: Cargo;
}

export const CargoDetails: React.FC<Props> = ({ currentCargo }) => {
  const { registrationNumber, length, width, height, weight } = currentCargo;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const history = useHistory();

  return (
    <>
      <div className="CargoDetails">
        <Card className="Card">
          <CargoDetailItem label="Cargo ID" value={registrationNumber} />
          <CargoDetailItem label="Length" value={`${length} meters`} />
          <CargoDetailItem label="Width" value={`${width} meters`} />
          <Collapsible
            isCollapsedParent={isCollapsed}
            setIsCollapsedParent={() => setIsCollapsed(!isCollapsed)}
          >
            <CargoDetailItem label="Height" value={`${height} meters`} />
            <CargoDetailItem label="Weight" value={`${weight} t`} />
            <Card
              className="Button"
              onClick={() => console.log("Edit details click")}
            >
              {"Edit details"}
            </Card>
            <Card
              className="Button"
              onClick={() => history.push("/placecargo")}
            >
              {"Change cargo"}
            </Card>
          </Collapsible>
        </Card>
      </div>
      <Overlay
        visible={!isCollapsed}
        transparent={true}
        onClick={() => setIsCollapsed(true)}
        animate={false}
        zIndex={variables.cargoDetailsOverlayZIndex}
      />
    </>
  );
};

export default CargoDetails;
