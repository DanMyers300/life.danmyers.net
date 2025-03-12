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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var wasm_game_of_life_1 = require("wasm-game-of-life");
var wasm_game_of_life_bg_1 = require("wasm-game-of-life/wasm_game_of_life_bg");
var CELL_SIZE = 5;
var GRID_COLOR = "#CCCCCC";
var DEAD_COLOR = "#FFFFFF";
var ALIVE_COLOR = "#000000";
// In order to use width/height we need to up the memory
var width = 64; //Math.floor((window.innerWidth - 1) / (CELL_SIZE + 1));
var height = 64; //Math.floor((window.innerHeight - 1) / (CELL_SIZE + 1));
// Construct the universe, and get its width and height.
var universe = wasm_game_of_life_1.Universe.new(width, height);
//universe.width = width;
//universe.width = height;
// Give the canvas room for all of our cells and a 1px border
// around each of them.
var canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
var ctx = canvas.getContext('2d');
var sleep = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
var renderLoop = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                universe.tick();
                return [4 /*yield*/, sleep(75)];
            case 1:
                _a.sent();
                drawGrid();
                drawCells();
                requestAnimationFrame(renderLoop);
                return [2 /*return*/];
        }
    });
}); };
var drawGrid = function () {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
    // Vertical lines
    for (var i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }
    // Horizontal lines
    for (var j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }
    ctx.stroke();
};
var getIndex = function (row, column) {
    return row * width + column;
};
var bitIsSet = function (n, arr) {
    var byte = Math.floor(n / 8);
    var mask = 1 << (n % 8);
    return (arr[byte] & mask) === mask;
};
var drawCells = function () {
    var cellsPtr = universe.cells();
    var cells = new Uint8Array(wasm_game_of_life_bg_1.memory.buffer, cellsPtr, width * height / 8);
    ctx.beginPath();
    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            var idx = getIndex(row, col);
            ctx.fillStyle = bitIsSet(idx, cells)
                ? ALIVE_COLOR
                : DEAD_COLOR;
            ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
        }
    }
    ctx.stroke();
};
drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
