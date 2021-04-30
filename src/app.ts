import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

serviceWorkerRegistration.register();

export async function getInitialState(): Promise<{ token?: string }> {
  return {};
}
