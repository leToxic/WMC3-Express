import {Product} from "./product";
import {ProductStore} from "./product.store";

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
export class InMemoryProductStore implements ProductStore {
    private readonly productIndex: { [id: number]: Product } = {}

    constructor() {
        this.initWithDefaultValues();
    }

    private initWithDefaultValues() {
        defaultValues.forEach(defaultValue => {
            this.productIndex[defaultValue.id] = defaultValue;
        });
    }

    public async findAll(): Promise<Product[]> {
        return Object.values(this.productIndex)
    }

    public async find(sid: number): Promise<Product> {
        return this.productIndex[sid];
    }

    public async put(product: Product): Promise<void> {
        this.productIndex[product.id] = product;
    }

    public async overrideAProduct(product: Product): Promise<void> {
        this.productIndex[product.id] = product;
    }

    public async delete(id: number): Promise<void> {
        delete this.productIndex[id];
    }
}