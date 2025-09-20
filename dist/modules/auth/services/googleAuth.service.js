"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GoogleAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const user_model_1 = require("../models/user.model");
let GoogleAuthService = GoogleAuthService_1 = class GoogleAuthService {
    userModel;
    jwtService;
    logger = new common_1.Logger(GoogleAuthService_1.name);
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    generateToken(user) {
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            roles: user.roles || ['user']
        };
        return this.jwtService.sign(payload, { expiresIn: '24h' });
    }
    async findOrCreateUser(profile) {
        try {
            let user = await this.userModel.findOne({
                email: profile.emails[0].value.toLowerCase()
            });
            if (user) {
                const token = this.generateToken(user);
                return {
                    success: true,
                    message: 'Login successful',
                    data: {
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            roles: user.roles
                        },
                        token: token
                    }
                };
            }
            const newUser = new this.userModel({
                name: profile.displayName,
                email: profile.emails[0].value.toLowerCase(),
                password: await bcrypt.hash(Math.random().toString(36), 10),
                roles: ['user']
            });
            await newUser.save();
            const token = this.generateToken(newUser);
            return {
                success: true,
                message: 'Account created and login successful',
                data: {
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        roles: newUser.roles
                    },
                    token: token
                }
            };
        }
        catch (error) {
            this.logger.error('Google auth error', error);
            throw new Error('Error processing Google authentication');
        }
    }
    async handleGoogleAuth(profile) {
        try {
            if (!profile || !profile.emails || !profile.emails[0]) {
                throw new Error('Invalid Google profile data');
            }
            return await this.findOrCreateUser(profile);
        }
        catch (error) {
            this.logger.error('Google auth handler error', error);
            throw error;
        }
    }
};
exports.GoogleAuthService = GoogleAuthService;
exports.GoogleAuthService = GoogleAuthService = GoogleAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], GoogleAuthService);
//# sourceMappingURL=googleAuth.service.js.map