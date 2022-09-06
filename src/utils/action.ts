import { ActionValue } from "mendix";

export const executeAction = (action?: ActionValue): boolean => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
        return true;
    }
    return false;
};
