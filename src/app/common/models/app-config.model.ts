export interface IAppConfig {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
    };
    enableHttps: boolean;
    apiServer: {
        url: string;
        httpsUrl: string;
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
