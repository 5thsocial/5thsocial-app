"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_model_1 = require("./models/user.model");
const otp_model_1 = require("./models/otp.model");
const facebookOAuthConfig_1 = require("../../configurations/facebookOAuthConfig");
const googleOAuthConfig_1 = require("../../configurations/googleOAuthConfig");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const facebookAuth_service_1 = require("./services/facebookAuth.service");
const googleAuth_service_1 = require("./services/googleAuth.service");
const login_service_1 = require("./services/login.service");
const signup_service_1 = require("./services/signup.service");
const forgetPassword_service_1 = require("./services/forgetPassword.service");
const profile_service_1 = require("./services/profile.service");
const user_service_1 = require("./services/user.service");
const facebookAuth_controller_1 = require("./controllers/facebookAuth.controller");
const googleAuth_controller_1 = require("./controllers/googleAuth.controller");
const login_controller_1 = require("./controllers/login.controller");
const signup_controller_1 = require("./controllers/signup.controller");
const forgetPassword_controller_1 = require("./controllers/forgetPassword.controller");
const profile_controller_1 = require("./controllers/profile.controller");
const user_controller_1 = require("./controllers/user.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: otp_model_1.OTP.name, schema: otp_model_1.OTPSchema }
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const secret = configService.get('JWT_SECRET');
                    if (!secret) {
                        throw new Error('JWT_SECRET environment variable is required');
                    }
                    return {
                        secret,
                        signOptions: {
                            expiresIn: '1h',
                            issuer: configService.get('JWT_ISS') || '5thsocial',
                            audience: configService.get('JWT_AUD') || 'api',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [
            facebookAuth_controller_1.FacebookAuthController,
            googleAuth_controller_1.GoogleAuthController,
            login_controller_1.LoginController,
            signup_controller_1.SignupController,
            forgetPassword_controller_1.ForgetPasswordController,
            profile_controller_1.ProfileController,
            user_controller_1.UserController
        ],
        providers: [
            facebookOAuthConfig_1.FacebookStrategy,
            googleOAuthConfig_1.GoogleStrategy,
            jwt_strategy_1.JwtStrategy,
            facebookAuth_service_1.FacebookAuthService,
            googleAuth_service_1.GoogleAuthService,
            login_service_1.LoginService,
            signup_service_1.SignupService,
            forgetPassword_service_1.ForgetPasswordService,
            profile_service_1.ProfileService,
            user_service_1.UserService
        ],
        exports: [passport_1.PassportModule, jwt_1.JwtModule]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map