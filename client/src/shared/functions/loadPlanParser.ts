import { PARSER_FIELD_MODE } from '../constants';
import { Deck, Lane, Grid } from '../types/deckMap';

let fieldMode = PARSER_FIELD_MODE.INIT;

export const parseLoadPlan = async (file: string) => {
    let data: Array<Deck> = [];
    await fetch(file).then(response => response.text()).then(allText => {
        const allTextByRows = allText.split(/\r?\n/);
        const allTextSplitted = allTextByRows.map(r => r.split("\t"));
        let switched = false;
        for (let index = 0; index < allTextSplitted.length; index++) {
            let element = allTextSplitted[index];
            if (!element[0]) continue;
            switched = setFieldMode(element[0].toLowerCase())
            if (switched) continue;
            setData(data, element);
        }
    })
    console.log(data)
    return data;
}

const setFieldMode = (value: string): boolean => {
    switch (value) {
        case "deck":
            fieldMode = PARSER_FIELD_MODE.DECK_NAME;
            return true;
        case "lanes":
            fieldMode = PARSER_FIELD_MODE.LANE;
            return true;
        case "grids":
            fieldMode = PARSER_FIELD_MODE.GRID;
            return true;
        default:
            return false;
    }
}

const setData = (data: Array<Deck>, dataElement: string[]) => {
    switch (fieldMode) {
        case PARSER_FIELD_MODE.DECK_NAME:
            data.push({ deck: dataElement[0], lanes: [], grids: [] });
            break;
        case PARSER_FIELD_MODE.LANE:
        case PARSER_FIELD_MODE.GRID:
            let newElem = {
                name: dataElement[0].trim().replace("-", ""),
                length: Number(dataElement[1].replace(",", ".")),
                width: Number(dataElement[2].replace(",", ".")),
                LCG: Number(dataElement[3].replace(",", ".")),
                TCG: -Number(dataElement[4].replace(",", ".")),
                VCG: Number(dataElement[5].replace(",", ".")),
            };
            let lastData = data[data.length - 1];
            if (fieldMode === PARSER_FIELD_MODE.LANE) {
                let lane = { ...newElem, partial: false, grids: [] } as Lane
                handlePartialLanes(lastData, lane);
                lastData.lanes.push(lane);
            } else {
                assignLane(lastData.lanes, newElem as Grid);
                lastData.grids.push(newElem);
            }
            break;
        default:
            break;
    }
}

const handlePartialLanes = (lastData: Deck, newElem: Lane) => {
    if (lastData.lanes.some(l => l.name === newElem.name)) {
        let updated = lastData.lanes.reduce((r, l) => {
            if (l.name === newElem.name && l.LCG < newElem.LCG) {
                l.partial = true;
                r++;
            }
            return r;
        }, 0)
        if (updated === 0) newElem.partial = true;
    }
}

const assignLane = (lanes: Array<Lane>, grid: Grid) => {
    let laneName = grid.name.substr(0, 4);
    let possibleLanes = lanes.filter(l => l.name === laneName && grid.LCG > l.LCG - l.length / 2);
    if (possibleLanes.length === 1) {
        possibleLanes[0].grids.push(grid);
        return;
    }
    let lane = possibleLanes.reduce((r: Lane | null, l) => {
        return r?.LCG && r.LCG > l.LCG - l.length / 2 ? r : l;
    }, null);
    lane?.grids.push(grid);
}