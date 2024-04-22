export interface DebugEventParams {
  event: string;
  params?: { [key: string]: any };
}
export const debugEvent = ({ event, params }: DebugEventParams) => {
  if (process.env.REACT_APP_DEBUG_TRACKING === 'true') {
    console.log(`[Gateway Track][${event}]:\n\tParams:`, params || 'no-params', `\n`);
  }
};
