import store from '@/store';

export function getHeaders() {
    let access_token = store.state.oidcStore.access_token;

    if (access_token !== null && access_token !== undefined) {
        return {
            'Authorization': `Bearer ${access_token}`
        };
    }
    return {};
}