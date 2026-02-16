import { API_HEALTH_EVENT } from '@/context/ApiStatus.context';

let apiDown = false;

export const isApiDown = () => apiDown;

export const setApiDown = (value: boolean) => {
    if (apiDown === value) return;
    apiDown = value;
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(API_HEALTH_EVENT, { detail: { ok: !value } }));
};
