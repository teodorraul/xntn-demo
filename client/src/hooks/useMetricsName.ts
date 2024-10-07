import { useMemo } from "react";

export const useMetricsName = (id?: string) => {
    return useMemo(() => {
        if (!id) return "Unknown";

        return `Metrics #${id
            .substring(id.length - 4, id.length)
            .toUpperCase()}`;
    }, [id]);
};
