import { oidcSettings } from '@/config/oidc'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'

import { modals } from "./modals"
import { variables } from "./variables"

export default {
    modals,
    variables,
    oidcStore: vuexOidcCreateStoreModule(
        oidcSettings,
        { namespaced: true },
        {
            userLoaded: (user) => window.console.log('OIDC user is loaded:', user),
            userUnloaded: () => window.console.log('OIDC user is unloaded'),
            accessTokenExpiring: () => window.console.log('Access token will expire'),
            accessTokenExpired: () => window.console.log('Access token did expire'),
            silentRenewError: () => window.console.log('OIDC user is unloaded'),
            userSignedOut: () => window.console.log('OIDC user is signed out'),
            oidcError: (payload) => {
                window.console.log('OIDC error', payload);
                window.localStorage.clear();
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                window.location.reload();
            }
        }
    )
}