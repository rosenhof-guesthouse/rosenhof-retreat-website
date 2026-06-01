/**
 * Lightweight analytics helper. Sends custom events to Plausible if loaded,
 * otherwise no-ops. Use for high-value interactions (booking clicks, contact
 * form submits) to measure ROI for the owner.
 */
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export const track = (event: string, props?: Record<string, string | number | boolean>) => {
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the UI */
  }
};
