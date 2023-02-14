import {Product} from "./product";

const defaultValues: Product[] = [
    {
        id: 1,
        name: "McLaren F1 New Era Cap 'Lando Norris'",
        price: 42.46
    },
    {
        id: 2,
        name: "Triumph Bonneville T100 Meriden Blue/Tangerine",
        price: 11885
    }
]

/** Only for testing; real application would use a DB instead of this store object */
export class ProductStore {
    private readonly productIndex: { [id: number]: Product } = {}

    constructor() {
        this.initWithDefaultValues();
    }

    private initWithDefaultValues() {
        defaultValues.forEach(defaultValue => {
            this.productIndex[defaultValue.id] = defaultValue;
        });
    }

    public findAll(): Product[] {
        return Object.values(this.productIndex)
    }

    public find(sid: number): Product {
        return this.productIndex[sid];
    }

    public put(product: Product) {
        this.productIndex[product.id] = product;
    }

    public overrideAProduct(product: Product) {
        this.productIndex[product.id] = product;
    }

    public delete(id: number) {
        delete this.productIndex[id];
    }
}