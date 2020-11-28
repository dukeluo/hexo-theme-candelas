(function (window) {
  const options = {
    excludes: {
      plugins: true,
      localStorage: true,
      adBlock: true,
      screenResolution: true,
      availableScreenResolution: true,
      enumerateDevices: true,
      pixelRatio: true,
      doNotTrack: true
    }
  };

  function getFingerprint() {
    return new Promise((resolve, reject) => {
      async function getHash() {
        try {
          const components = await window.Fingerprint2.getPromise(options);
          const values = components.map(component => component.value);

          return window.Fingerprint2.x64hash128(values.join(''), 31);
        } catch (e) {
          reject(e);
        }
      }

      if (window.requestIdleCallback) {
        requestIdleCallback(async () => resolve(await getHash()));
      } else {
        setTimeout(async () => resolve(await getHash()), 500);
      }
    });
  }

  const candelas = window.candelas || {};

  candelas.getFingerprint = getFingerprint;
  window.candelas = candelas;
})(window);
