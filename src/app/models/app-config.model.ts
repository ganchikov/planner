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
    apiServer: {
        url: string;
        metadata: string;
        rules: string;
    };
    auth0: {
        clientID: string,
        domain: string,
        responseType: string,
        audience: string,
        redirectUri: string,
        scope: string        
    };
}
