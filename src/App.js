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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const reactstrap_1 = require("reactstrap");
require("bootstrap/dist/css/bootstrap.min.css");
require("./App.css");
const App = () => {
    const [characterQuery, setCharacterQuery] = (0, react_1.useState)('');
    const [searchResult, setSearchResult] = (0, react_1.useState)([]);
    const searchForCharacter = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log('searching for character', characterQuery);
        try {
            const result = yield fetch(`https://swapi.dev/api/people/?search=${characterQuery}`);
            const json = yield result.json();
            // @ts-ignore
            const results = json.results;
            console.log('results', results);
            setSearchResult(results);
        }
        catch (e) {
            console.error(e);
        }
    });
    return (react_1.default.createElement(reactstrap_1.Container, { className: "Challenge" },
        react_1.default.createElement(reactstrap_1.Form, { onSubmit: searchForCharacter },
            react_1.default.createElement(reactstrap_1.Row, { className: "form-items", xs: "12" },
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Label, null, "Search for a Star Wars Character: ")),
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Input, { type: "text", placeholder: "Han Solo", onChange: (e) => setCharacterQuery(e.target.value) })),
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Button, null, "Search")))),
        react_1.default.createElement(reactstrap_1.Row, null,
            react_1.default.createElement(reactstrap_1.List, { className: "results" }, searchResult.map((character = {
                name: '',
                height: '',
                mass: '',
                url: ''
            }) => (react_1.default.createElement("li", { className: "result" },
                character.name,
                react_1.default.createElement(reactstrap_1.List, null,
                    react_1.default.createElement("li", null,
                        "Height: ",
                        character.height),
                    react_1.default.createElement("li", null,
                        "Mass: ",
                        character.mass),
                    react_1.default.createElement("li", null,
                        "Link: ",
                        react_1.default.createElement("a", { href: character.url }, character.name))))))))));
};
exports.default = App;
