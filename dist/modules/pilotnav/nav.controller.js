"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavController = void 0;
const common_1 = require("@nestjs/common");
const nav_service_1 = require("./nav.service");
let NavController = class NavController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async manifest() {
        return this.svc.latest();
    }
    async put(auth, body) {
        const token = auth?.replace(/^Bearer\s+/i, "");
        return this.svc.upsert(token, body);
    }
    async state() {
        return this.svc.state();
    }
    async apps() {
        const mf = await this.svc.latest();
        console.log('Full manifest:', JSON.stringify(mf, null, 2));
        const apps = (mf.apps || [])
            .filter((a) => !a.disabled)
            .map((a) => ({
            key: a.key || a.id || a.label,
            label: a.label,
            disabled: a.disabled || false,
        }));
        return { apps };
    }
    async menu(app) {
        const mf = await this.svc.latest();
        console.log('Looking for app:', app);
        console.log('Full manifest data:', JSON.stringify(mf, null, 2));
        console.log('Available apps:', mf.apps?.map((a) => ({
            key: a.key,
            label: a.label,
            components: a.components?.length || 0,
            hasComponents: !!a.components
        })));
        const found = (mf.apps || []).find((a) => {
            const appKey = a.key || a.id || a.label;
            const appLabel = a.label;
            console.log(`Checking app: key="${appKey}", label="${appLabel}" against "${app}"`);
            return appKey === app ||
                appLabel === app ||
                appKey?.toLowerCase() === app?.toLowerCase() ||
                appLabel?.toLowerCase() === app?.toLowerCase();
        });
        console.log('Found app:', found);
        console.log('Found app components:', found?.components);
        console.log('Components length:', found?.components?.length);
        if (!found) {
            console.log('No app found');
            return { menu: [], defaultRoute: undefined };
        }
        if (!found.components) {
            console.log('App found but no components property');
            return { menu: [], defaultRoute: undefined };
        }
        if (found.components.length === 0) {
            console.log('App found but components array is empty');
            return { menu: [], defaultRoute: undefined };
        }
        const menu = [];
        for (const component of found.components) {
            console.log('Processing component:', JSON.stringify(component, null, 2));
            if (component.workflows && component.workflows.length > 0) {
                menu.push({
                    key: component.key || component.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
                    label: component.label,
                    app,
                    view: component.view || component.label,
                    icon: component.icon || '📝'
                });
                component.workflows.forEach((workflow) => {
                    menu.push({
                        key: workflow.key || workflow.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
                        label: `  ${workflow.label}`,
                        app,
                        view: workflow.view || workflow.label?.replace(/\s+/g, '') || 'unknown',
                        icon: workflow.icon || '⚡'
                    });
                });
            }
            else {
                menu.push({
                    key: component.key || component.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
                    label: component.label,
                    app,
                    view: component.view || component.label,
                    icon: component.icon || '📄'
                });
            }
        }
        console.log('Generated menu:', menu);
        const defaultRoute = menu[0] ? { app, view: menu[0].view } : undefined;
        return { menu, defaultRoute };
    }
};
exports.NavController = NavController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavController.prototype, "manifest", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NavController.prototype, "put", null);
__decorate([
    (0, common_1.Get)("state"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavController.prototype, "state", null);
__decorate([
    (0, common_1.Get)("apps"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavController.prototype, "apps", null);
__decorate([
    (0, common_1.Get)("menu"),
    __param(0, (0, common_1.Query)("app")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NavController.prototype, "menu", null);
exports.NavController = NavController = __decorate([
    (0, common_1.Controller)("nav"),
    __metadata("design:paramtypes", [nav_service_1.NavService])
], NavController);
//# sourceMappingURL=nav.controller.js.map