import { NavService } from "./nav.service";
interface MenuResponse {
    menu: MenuItemResponse[];
    defaultRoute?: {
        app: string;
        view: string;
    };
}
interface MenuItemResponse {
    key: string;
    label: string;
    app: string;
    view: string;
    icon: string;
}
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
    menu(app: string): Promise<MenuResponse>;
}
export {};
