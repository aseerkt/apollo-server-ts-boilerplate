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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const ormConn_1 = require("./utils/ormConn");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ormConn_1.createTypeOrmConnection();
    const app = express_1.default();
    app.get('/', (_, res) => res.send('API is running'));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({ resolvers: [UserResolver_1.UserResolver], validate: false }),
    });
    apolloServer.applyMiddleware({ app });
    const PORT = process.env.PORT || process.env.NODE_ENV === 'test' ? 4000 : 5000;
    app.listen(PORT, () => {
        console.log(`GraphQL Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
});
exports.startServer = startServer;
exports.startServer().catch((err) => console.log('Catched Error: ', err));
//# sourceMappingURL=index.js.map