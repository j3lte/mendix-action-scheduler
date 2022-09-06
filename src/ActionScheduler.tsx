import { createElement, useCallback, useMemo, FC, useRef } from "react";

import { ActionSchedulerContainerProps } from "../typings/ActionSchedulerProps";
import { Scheduler } from "./components/Scheduler";

import { executeAction } from "./utils/action";
import { useDynamicValue, useDynamicBigValue } from "./utils/hooks";

export const ActionScheduler: FC<ActionSchedulerContainerProps> = ({
    timerEnabled,
    timerInterval,
    timerAction,
    fireOnce
}) => {
    const firedOnce = useRef(false);
    const firedOnceTimeout = useRef(-1);

    const [enabled, loadinEnabled] = useDynamicValue(timerEnabled);
    const [interval, loadingInterval] = useDynamicBigValue(timerInterval);
    const [once, loadingOnce] = useDynamicValue(fireOnce);

    const onTimer = useCallback(() => {
        executeAction(timerAction);
    }, [timerAction]);

    const schedulerProps = useMemo(
        () => ({
            enabled: enabled !== null && interval !== null && !once ? enabled : false,
            interval: interval !== null ? interval : -1
        }),
        [enabled, interval, once]
    );

    if (loadinEnabled || loadingInterval || loadingOnce) {
        return null;
    }

    if (once) {
        if (!firedOnce.current) {
            if (firedOnceTimeout.current !== -1) {
                clearTimeout(firedOnceTimeout.current);
            }
            firedOnceTimeout.current = setTimeout(
                () => {
                    onTimer();
                },
                interval !== null ? interval : 0
            ) as unknown as number;
            firedOnce.current = true;
        }
        return <div className={"scheduler-once"} />;
    }

    return <Scheduler {...schedulerProps} onTimer={onTimer} />;
};
