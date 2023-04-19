import React from "react";
import * as LDClient from 'launchdarkly-js-client-sdk';

// Assumption: LDClient initiated based on a sample test user context
const context: LDClient.LDContext = {
    kind: 'user',
    key: 'context-key-123abc',
};

const client = LDClient.initialize(
    process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID || "",
    context,
);

export const useLaunchDarklyClient = () => {
    const [clientIsReady, setClientIsReady] = React.useState(false);

    const handleCheckIfClientIsReady = async () => {
        try {
            await client.waitUntilReady();
            setClientIsReady(true);
        } catch (err) {
            console.error(err);
            setClientIsReady(false);
        }
    };

    const handleClientClose = () => {
        client.close();
    };

    const fetchAllFlags = () => {
        return client.allFlags();
    };

    const dispatchFlgEvaluationEvent = (flagKey: string, result: any) => {
        // Mock event
        console.log(`Evaluating feature flag: ${flagKey}`, context, result);
        console.log("User: ", context);
        console.log("Evaluation result: ", result);
    };

    const getFlagValueForKey = (flagKey: string, defaultValue?: any) => {
        const result = client.variation(flagKey, defaultValue);
        dispatchFlgEvaluationEvent(flagKey, result);
        return result;
    }

    React.useEffect(() => {
        // Check if client is ready on mount
        handleCheckIfClientIsReady();
        // Close connection on unmount
        return handleClientClose; 
    }, []);

    return {
        clientIsReady,
        fetchAllFlags,
        getFlagValueForKey,
    };
};