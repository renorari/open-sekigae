import React from "react";
import { Switch, switchClasses, SwitchProps } from "@mui/joy";

export default function AnimeSwitch(props: SwitchProps) {
    return <Switch
        {...props}
        sx={{
            [`& .${switchClasses.thumb}`]: {
                "transition": "width 0.2s, left 0.2s"
            },
            "&:active": {
                "--Switch-thumbWidth": "50%"
            },
            ...props.sx
        }}
    />;
}