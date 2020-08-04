import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

export const TooltipYellow = withStyles((theme) => ({
    tooltip: {
        color: "#ffffff",
        backgroundColor: "#dfa528",
        fontFamily: "Arimo",
        fontSize: "12px",
        marginTop: theme.spacing(1)
    }
}))(Tooltip);