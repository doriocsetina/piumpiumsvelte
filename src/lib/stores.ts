import { writable } from 'svelte/store'

export const y = writable(0);
export const isTitleShown = writable(true);
export const isScrolled = writable(false);
