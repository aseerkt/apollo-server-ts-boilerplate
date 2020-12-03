"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__host__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.__host__ = `http://localhost:5000/graphql`;
//# sourceMappingURL=constants.js.map