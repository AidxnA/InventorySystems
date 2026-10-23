'use server';
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
var db_1 = require("./db");
var enums_1 = require("./generated/prisma/enums");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var customer, laptop, washingMachine, sale, purchases, products, _a, saleItems;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("=== DATABASE TEST START ===\n");
                    return [4 /*yield*/, db_1.prisma.customer.create({
                            data: {
                                name: "John Doe",
                                phone: "+233540000001",
                                email: "john@example.com",
                            },
                        })];
                case 1:
                    customer = _b.sent();
                    console.log("✅ Customer Created");
                    console.log(customer);
                    return [4 /*yield*/, db_1.prisma.product.create({
                            data: {
                                name: "MacBook Air M3",
                                brand: "Apple",
                                category: enums_1.Category.LAPTOPS,
                                description: "13-inch Apple Laptop",
                                quantity: 20,
                            },
                        })];
                case 2:
                    laptop = _b.sent();
                    return [4 /*yield*/, db_1.prisma.product.create({
                            data: {
                                name: "Washing Machine",
                                brand: "Samsung",
                                category: enums_1.Category.HOME_APPLIANCE,
                                description: "10kg Smart Washer",
                                quantity: 10,
                            },
                        })];
                case 3:
                    washingMachine = _b.sent();
                    console.log("\n✅ Products Created");
                    return [4 /*yield*/, db_1.prisma.sale.create({
                            data: {
                                customerId: customer.id,
                                discount: 100,
                                subtotal: 2100,
                            },
                        })];
                case 4:
                    sale = _b.sent();
                    console.log("\n✅ Sale Created");
                    // -----------------------------
                    // 4. Create Sale Items
                    // -----------------------------
                    return [4 /*yield*/, db_1.prisma.saleItem.createMany({
                            data: [
                                {
                                    saleId: sale.id,
                                    productId: laptop.id,
                                    quantity: 1,
                                    unitPrice: 1800,
                                },
                                {
                                    saleId: sale.id,
                                    productId: washingMachine.id,
                                    quantity: 1,
                                    unitPrice: 300,
                                },
                            ],
                        })];
                case 5:
                    // -----------------------------
                    // 4. Create Sale Items
                    // -----------------------------
                    _b.sent();
                    console.log("✅ Sale Items Added");
                    return [4 /*yield*/, db_1.prisma.customer.findUnique({
                            where: {
                                id: customer.id,
                            },
                            include: {
                                sales: {
                                    include: {
                                        items: {
                                            include: {
                                                product: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 6:
                    purchases = _b.sent();
                    console.log("\n✅ Customer Purchase History");
                    console.dir(purchases, { depth: null });
                    // -----------------------------
                    // 6. Update Inventory
                    // -----------------------------
                    return [4 /*yield*/, db_1.prisma.product.update({
                            where: {
                                id: laptop.id,
                            },
                            data: {
                                quantity: {
                                    decrement: 1,
                                },
                            },
                        })];
                case 7:
                    // -----------------------------
                    // 6. Update Inventory
                    // -----------------------------
                    _b.sent();
                    return [4 /*yield*/, db_1.prisma.product.update({
                            where: {
                                id: washingMachine.id,
                            },
                            data: {
                                quantity: {
                                    decrement: 1,
                                },
                            },
                        })];
                case 8:
                    _b.sent();
                    console.log("\n✅ Inventory Updated");
                    return [4 /*yield*/, db_1.prisma.product.findMany()];
                case 9:
                    products = _b.sent();
                    console.log("\nCurrent Inventory");
                    console.table(products.map(function (p) { return ({
                        Name: p.name,
                        Quantity: p.quantity,
                    }); }));
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, db_1.prisma.customer.create({
                            data: {
                                name: "Duplicate User",
                                phone: "+233540000001",
                                email: "john@example.com",
                            },
                        })];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    _a = _b.sent();
                    console.log("\n✅ Unique Constraint Working");
                    return [3 /*break*/, 13];
                case 13: 
                // -----------------------------
                // 9. Delete Sale
                // -----------------------------
                return [4 /*yield*/, db_1.prisma.sale.delete({
                        where: {
                            id: sale.id,
                        },
                    })];
                case 14:
                    // -----------------------------
                    // 9. Delete Sale
                    // -----------------------------
                    _b.sent();
                    console.log("\n✅ Sale Deleted");
                    return [4 /*yield*/, db_1.prisma.saleItem.findMany()];
                case 15:
                    saleItems = _b.sent();
                    console.log("Sale Items Remaining After Delete: ".concat(saleItems.length));
                    console.log("\n=== DATABASE TEST COMPLETE ===");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (err) {
    console.error(err);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
