/**
 * This file was generated from ActionScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";
import { Big } from "big.js";

export interface ActionSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    timerEnabled: DynamicValue<boolean>;
    timerInterval: DynamicValue<Big>;
    timerAction?: ActionValue;
    fireOnce: DynamicValue<boolean>;
}

export interface ActionSchedulerPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    timerEnabled: string;
    timerInterval: string;
    timerAction: {} | null;
    fireOnce: string;
}
