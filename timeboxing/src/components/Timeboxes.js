import { connect } from "react-redux";
import { getAllTimeboxes } from "../reducers";

export function Timeboxes({ timeboxes, renderTimebox }) {
    return (
        timeboxes.map(renderTimebox)
    );
}

const mapStateToProps = (state) => ({timeboxes: getAllTimeboxes(state)});
export const AllTimeboxes = connect(mapStateToProps)(Timeboxes);

