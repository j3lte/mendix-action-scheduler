import { useMemo, useRef } from "react";
import { DynamicValue, ValueStatus } from "mendix";
import Big from "big.js";

export function useDynamicValue<T extends string | number | Big | boolean>(
    value: DynamicValue<T>
): [T | null, boolean, number] {
    const counter = useRef(0);

    const isLoading = useMemo(() => {
        if (value.status === ValueStatus.Available || value.status === ValueStatus.Unavailable) {
            return false;
        }
        return true;
    }, [value.status]);

    const returnValue = useMemo(() => {
        if (isLoading) {
            return null;
        }
        return value.value as T;
    }, [isLoading, value.value]);

    counter.current = counter.current + 1;

    return [returnValue, isLoading, counter.current];
}

export const useDynamicBigValue = (value: DynamicValue<Big>): [number | null, boolean, number] => {
    const [bigValue, isLoading, counter] = useDynamicValue(value);
    const intValue = bigValue === null ? null : parseInt(bigValue.toFixed(0), 10);
    return [intValue, isLoading, counter];
};
