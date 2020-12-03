"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractErrors = void 0;
const extractErrors = (errors) => {
    let formatedErrors = [];
    errors.map(({ property, constraints }) => {
        formatedErrors.push({
            path: property,
            message: Object.values(constraints)[0],
        });
    });
    return formatedErrors;
};
exports.extractErrors = extractErrors;
//# sourceMappingURL=extractErrors.js.map