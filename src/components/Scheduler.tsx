import { createElement, FC } from "react";
import { useInterval, useGetSet } from "react-use";

export interface SchedulerProps {
    enabled: boolean;
    interval: number;
    onTimer: () => void;
    debug?: boolean;
}

export const Scheduler: FC<SchedulerProps> = ({ enabled, interval, onTimer, debug }) => {
    const [getInternalRender, setInternalRender] = useGetSet(0);
    useInterval(
        () => {
            setInternalRender(getInternalRender() + 1);
            if (debug) {
                console.log(`ActionScheduler: internal number ref: ${getInternalRender()}`);
            }
            onTimer();
        },
        enabled && interval > 0 ? interval : null
    );
    return <div className={enabled ? "scheduler-enabled" : "scheduler-disabled"} />;
};
