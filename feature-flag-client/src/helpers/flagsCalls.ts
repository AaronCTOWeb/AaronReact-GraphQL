import * as LDClient from 'launchdarkly-js-client-sdk';
import {
  launchBannerFlagKey,
  detailsCtaFlagKey,
  profileSectionFlagKey,
} from '../feature-flag-config';

const DARKLY_CLIENT_ID: string = process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID as string;

const flagsCalls = () => {
  const context = {
    kind: 'user',
    key: 'context-key-123abc',
  };
  const client = LDClient.initialize(DARKLY_CLIENT_ID, context);

  client.waitUntilReady();

  const getAllFlags = async () => {
    let flags = {} as LDClient.LDFlagSet;
    try {
      await client.waitForInitialization().then(() => {
        flags = client.allFlags();
      });
    } catch (e) {
      console.log('An Error ocurred trying to initialize Lauch Darkly:', e);
    }
    return flags;
  };

  const subscribeFlags = async (callback: (key: string, value) => void) => {
    try {
      await client.waitForInitialization().then(() => {
        //  This could be used to, and then iterate for the changes using the same callback
        //  or changing its parameters
        //  client.on('change', allChanges => {
        //
        //  });
        client.on('change', (allChanges) => {
          console.log('flags changed:', JSON.stringify(allChanges));
        });
        client.on(`change:${launchBannerFlagKey}`, (current, previous) => {
          console.log(
            `${launchBannerFlagKey} changed:`,
            current,
            '(was ' + previous + ')',
          );
          callback(launchBannerFlagKey, current);
        });
        client.on(`change:${detailsCtaFlagKey}`, (current, previous) => {
          console.log(`${detailsCtaFlagKey} changed:`, current, '(was ' + previous + ')');
          callback(detailsCtaFlagKey, current);
        });
        client.on(`change:${profileSectionFlagKey}`, (current, previous) => {
          console.log(
            `${profileSectionFlagKey} changed:`,
            current,
            '(was ' + previous + ')',
          );
          callback(profileSectionFlagKey, current);
        });
      });
    } catch (e) {
      console.log('An Error ocurred trying to initialize Lauch Darkly:', e);
    }
  };

  const shutDown = async () => {
    await client
      .close()
      .then(() => console.log('Connection to Lauch Darkly was closed'))
      .catch((e) => console.log('Error on closing Launch Darkly connection'));
  };

  return { getAllFlags, subscribeFlags, shutDown };
};

export const { getAllFlags, subscribeFlags, shutDown } = flagsCalls();
