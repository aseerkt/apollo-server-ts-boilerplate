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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const graphql_request_1 = require("graphql-request");
const constants_1 = require("../constants");
const User_1 = require("../entity/User");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.startServer();
}));
const email = 'test@jest.com';
const password = 'jest_pwd';
const REGISTER_MUTATION = `
  mutation {
    register(email: ${email}, password: ${password}) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;
test('Register User', () => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({ email });
    if (user) {
        yield user.remove();
    }
    const res = yield graphql_request_1.request(constants_1.__host__, REGISTER_MUTATION);
    console.log('GraphQL Res', res);
    expect(res).toMatchObject({
        register: { user: { email: email }, errors: null },
    });
    user = yield User_1.User.findOne({ email });
    expect(user).not.toBeNull();
    expect(user === null || user === void 0 ? void 0 : user.email).toBe(email);
    expect(user === null || user === void 0 ? void 0 : user.password).not.toEqual(password);
}));
//# sourceMappingURL=register.test.js.map