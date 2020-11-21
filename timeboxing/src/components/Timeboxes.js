import { connect } from "react-redux";
import { getAllTimeboxes, getRemainingTimeboxes } from "../reducers";

export function Timeboxes({ timeboxes, renderTimebox }) {
    return (
        timeboxes.map(renderTimebox)
    );
}

export const AllTimeboxes = connect((state) => ({timeboxes: getAllTimeboxes(state)}))(Timeboxes);
export const RemainingTimeboxes = connect((state) => ({timeboxes: getRemainingTimeboxes(state)}))(Timeboxes);

