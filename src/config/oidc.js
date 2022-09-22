export const oidcSettings = {
    authority: process.env.VUE_APP_OIDC_AUTHORITY,
    clientId: process.env.VUE_APP_OIDC_CLIENT_ID,
    redirectUri: process.env.VUE_APP_OIDC_REDIRECT_URI,
    responseType: process.env.VUE_APP_OIDC_RESPONSE_TYPE,
    scope: process.env.VUE_APP_OIDC_SCOPES,
    automaticSilentRenew: true,
    loadUserInfo: true,
    silentRedirectUri: process.env.VUE_APP_OIDC_SILENR_REDIRECT_URI,
}