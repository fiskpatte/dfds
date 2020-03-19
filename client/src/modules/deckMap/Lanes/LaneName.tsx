import React, { useRef } from 'react';
import { DECK_MAP } from '../../../shared/constants';
import { LaneNameProps } from '../DeckMap.types';
import useReferenceScale from './../../../shared/hooks/useReferenceScale';

const LaneName: React.FC<LaneNameProps> = ({ lane, rightOrigin }) => {
    const originX = rightOrigin - 3 * DECK_MAP.X_MARGIN / 2;
    const textRef = useRef<SVGTextElement>(null);
    const scale = useReferenceScale(textRef,{width:DECK_MAP.LANE_NAME_WIDTH,height:lane.width});
    let fontSize = Math.min(scale.width, scale.height); 
    //Avoid changing the size before the initial render so that the scale applies correctly
    if(scale.height !== 1 && scale.width !==1){
        fontSize *= DECK_MAP.LANE_NAME_FONT_SIZE;
    }
    return (
        <text className={`LaneName ${lane.partial ? "Hidden" : ""}`}
            transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
            fontSize={`${fontSize}em`}
            x={originX * DECK_MAP.X_SCALE}
            y={lane.TCG * DECK_MAP.Y_SCALE}
            ref={textRef}>
            {lane.name}
        </text>
    );
}

export default LaneName;