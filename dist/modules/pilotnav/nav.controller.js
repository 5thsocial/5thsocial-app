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
        const token = auth?.replace(/^Bearer\s+/i, '');
        return this.svc.upsert(token, body);
    }
    async state() { return this.svc.state(); }
    async apps() {
        const mf = await this.svc.latest();
        const apps = (mf.apps || []).map((a) => ({ key: a.key || a.id || a.label?.toLowerCase(), label: a.label }));
        return { apps };
    }
    async menu(app) {
        const mf = await this.svc.latest();
        const found = (mf.apps || []).find((a) => (a.key || a.id) === app || a.label === app);
        const menu = found?.components?.map((c) => ({ key: c.id || c.key || c.label, label: c.label, app, view: c.view || c.label })) || [];
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
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NavController.prototype, "put", null);
__decorate([
    (0, common_1.Get)('state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavController.prototype, "state", null);
__decorate([
    (0, common_1.Get)('apps'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavController.prototype, "apps", null);
__decorate([
    (0, common_1.Get)('menu'),
    __param(0, (0, common_1.Query)('app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NavController.prototype, "menu", null);
exports.NavController = NavController = __decorate([
    (0, common_1.Controller)('api/nav'),
    __metadata("design:paramtypes", [nav_service_1.NavService])
], NavController);
//# sourceMappingURL=nav.controller.js.map