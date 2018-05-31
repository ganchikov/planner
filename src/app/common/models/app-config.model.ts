export interface IAppConfig {
    env: {
        name: string;
    };
    appInsights: {
        instrumentationKey: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    aad: {
        requireAuth: boolean;
        tenant: string;
        clientId: string;

    };
    enableHttps: boolean;
    apiServer: {
        url: string;
        httpsUrl: string;
        metadata: string;
        rules: string;
    };
    auth0: {
        clientID: string,
        domain: string,
        responseType: string,
        audience: string,
        redirectUri: string,
        redirectHttpsUri: string,
        scope: string
    };
}
