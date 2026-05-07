import { getCurrentWindow } from '@tauri-apps/api/window';

export const isTauri = () => {
  return typeof window !== 'undefined' && window.__TAURI_INTERNALS__ !== undefined;
};

export const closeWindow = async () => {
  if (isTauri()) {
    const appWindow = getCurrentWindow();
    await appWindow.close();
  }
};

export const minimizeWindow = async () => {
  if (isTauri()) {
    const appWindow = getCurrentWindow();
    await appWindow.minimize();
  }
};

export const maximizeWindow = async () => {
  if (isTauri()) {
    const appWindow = getCurrentWindow();
    await appWindow.toggleMaximize();
  }
};
