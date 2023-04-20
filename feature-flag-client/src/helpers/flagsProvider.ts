import { useEffect, useState } from 'react';
import { LDFlagSet } from 'launchdarkly-js-client-sdk';
import { getAllFlags, subscribeFlags, shutDown } from './flagsCalls';

export type AppFlags = LDFlagSet;

const flagsProvider = () => {
  let _flags: LDFlagSet =
    JSON.parse(localStorage.getItem('APP_RENDERING_FLAGS') || '{}') || {};

  getAllFlags().then((flags) => {
    setAppFlags(flags);
  });

  subscribeFlags((key, value) => {
    flagsOnChange(key, value);
    setAppFlags({ ..._flags, [key]: value });
  });

  function flagsOnChange(key: string, value: any) {
    if (_flags[key]) console.log(`${key} changed:`, value, '(was ' + _flags[key] + ')');
    else console.log('change on unknown flag:', key);
  }

  const setAppFlags = (flags: LDFlagSet) => {
    if (flags) localStorage.setItem('APP_RENDERING_FLAGS', JSON.stringify(flags));
    else {
      localStorage.removeItem('APP_RENDERING_FLAGS');
      flags = {};
    }
    _flags = flags;
    notify();
  };

  let observers: Array<(flags: LDFlagSet) => void> = [];
  const notify = () => {
    const flags = _flags;
    observers.map((observer) => observer(flags));
  };

  const subscribe = (observer: (flags: LDFlagSet) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (flags: LDFlagSet) => void) => {
    observers = observers.filter((_observer) => _observer !== observer);
    shutDown();
  };

  const useFlags = () => {
    const [flags, setFlags] = useState(_flags);

    useEffect(() => {
      const listener = (flags: LDFlagSet) => {
        setFlags(flags);
      };
      subscribe(listener);
      return () => {
        unsubscribe(listener);
      };
    }, []);
    return [flags] as [typeof flags];
  };

  return { useFlags };
};

export const { useFlags } = flagsProvider();
