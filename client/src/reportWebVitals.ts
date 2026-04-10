type WebVitalsCallback =
  Parameters<typeof import('web-vitals')['onCLS']>[0] & Parameters<typeof import('web-vitals')['onFCP']>[0] & Parameters<typeof import('web-vitals')['onINP']>[0] & Parameters<typeof import('web-vitals')['onLCP']>[0] & Parameters<typeof import('web-vitals')['onTTFB']>[0];

type ReportWebVitals = (onPerfEntry?: WebVitalsCallback) => void;

const reportWebVitals: ReportWebVitals = (onPerfEntry): void => {
  if (onPerfEntry === undefined) {
    return;
  }

  void import('web-vitals').then((webVitals) => {
    webVitals.onCLS(onPerfEntry);
    webVitals.onFCP(onPerfEntry);
    webVitals.onINP(onPerfEntry);
    webVitals.onLCP(onPerfEntry);
    webVitals.onTTFB(onPerfEntry);
  });
};

export default reportWebVitals;