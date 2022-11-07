"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var validator_1 = __importDefault(require("validator"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var keys_1 = require("../keys");
exports.Auth = {
    signUp: function (_, _a, _b) {
        var u = _a.user;
        var prisma = _b.prisma;
        return __awaiter(void 0, void 0, void 0, function () {
            var name, email, password, isEmail, isValidPassword, hashedPassword, letters, replacement, nameEN, i, user, days360, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = u.name, email = u.email, password = u.password;
                        isEmail = validator_1.default.isEmail(email);
                        isValidPassword = validator_1.default.isLength(password, {
                            min: 5,
                        });
                        if (!name) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Name not found.",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        if (!isEmail) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid e-mail syntax.",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        if (!isValidPassword) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid password syntax.",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        return [4, bcryptjs_1.default.hash(password, 10)];
                    case 1:
                        hashedPassword = _c.sent();
                        letters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
                        replacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];
                        nameEN = name.toLocaleLowerCase();
                        for (i = 0; i < letters.length; ++i) {
                            nameEN = nameEN.replace(letters[i], replacement[i]);
                        }
                        return [4, prisma.user.create({
                                data: {
                                    name: name,
                                    nameEN: nameEN,
                                    email: email,
                                    password: hashedPassword,
                                },
                            })];
                    case 2:
                        user = _c.sent();
                        days360 = 31104000;
                        token = jsonwebtoken_1.default.sign({
                            userId: user.id,
                        }, keys_1.JWT_SIGNATURE, {
                            expiresIn: days360,
                        });
                        return [2, {
                                errors: [],
                                token: token,
                            }];
                }
            });
        });
    },
    signIn: function (_, _a, _b) {
        var u = _a.user;
        var prisma = _b.prisma;
        return __awaiter(void 0, void 0, void 0, function () {
            var email, password, user, isPasswordMatches, days360, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        email = u.email, password = u.password;
                        return [4, prisma.user.findUnique({
                                where: {
                                    email: email,
                                },
                            })];
                    case 1:
                        user = _c.sent();
                        if (!email && !password) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid credentials.",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        if (!email) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid e-mail",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        if (!password) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid password",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        if (!user) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid credentials",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        return [4, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        isPasswordMatches = _c.sent();
                        if (!isPasswordMatches) {
                            return [2, {
                                    errors: [
                                        {
                                            message: "Invalid password",
                                        },
                                    ],
                                    token: null,
                                }];
                        }
                        days360 = 31104000;
                        token = jsonwebtoken_1.default.sign({
                            userId: user.id,
                        }, keys_1.JWT_SIGNATURE, {
                            expiresIn: days360,
                        });
                        return [2, {
                                errors: [],
                                token: token,
                            }];
                }
            });
        });
    },
};
