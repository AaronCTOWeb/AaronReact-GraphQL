import React from 'react'
import { useLaunchDarklyClient } from '../hooks/useLaunchDarklyClient';

import { LDFlagSet } from 'launchdarkly-js-client-sdk';

interface IFeatureFlagContext {
    allFlags: LDFlagSet,
    getFlagValueForKey: (flagKey: string, defaultValue?: any) => any,
};

export const FeatureFlagContext = React.createContext<IFeatureFlagContext>({
    allFlags: {},
    getFlagValueForKey: () => null,
});

const FeatureFlagProvider = ({ children }) => {
    const { clientIsReady, fetchAllFlags, getFlagValueForKey } = useLaunchDarklyClient();
    
    const allFlags = React.useMemo(() => {
        if (clientIsReady) {
            return fetchAllFlags();
        }
        return [];
    }, [clientIsReady, fetchAllFlags]);

    return (
        <FeatureFlagContext.Provider value={{ allFlags, getFlagValueForKey }}>
            { children }
        </FeatureFlagContext.Provider>
    );
};

export default FeatureFlagProvider;