import { writable } from 'svelte/store';

export const position = writable({ x: 0, y: 0 });
