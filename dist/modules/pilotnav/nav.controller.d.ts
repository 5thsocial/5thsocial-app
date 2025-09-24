import { NavService } from './nav.service';
export declare class NavController {
    private readonly svc;
    constructor(svc: NavService);
    manifest(): Promise<any>;
    put(auth: string, body: any): Promise<{
        ok: boolean;
    }>;
    state(): Promise<any>;
    apps(): Promise<{
        apps: any;
    }>;
    menu(app: string): Promise<{
        menu: any;
        defaultRoute: {
            app: string;
            view: any;
        } | undefined;
    }>;
}
