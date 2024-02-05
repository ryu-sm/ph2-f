export function parseStepId(pathname) {
  const strID = pathname.replace('/step-', '');
  return parseInt(strID);
}
