import {InMemoryProductStore} from "./inMemoryProduct.store";
import {Product} from "./product";

export class ProductService {
    private productStore: InMemoryProductStore;

    constructor() {
        this.productStore = new InMemoryProductStore();
    }

    public async findAll(): Promise<Product[]> {
        return this.productStore.findAll();
    }

    public async find(sid: number): Promise<Product> {
        return this.productStore.find(sid);
    }

    public async create(product: Product): Promise<Product | null> {
        if (product.name == '' || product.price < 0 || product.name == null || product.price == null) {
            return null;
        }

        product.id = (await this.productStore.find((await this.productStore.findAll()).length)).id + 1;
        await this.productStore.put(product);

        return product;
    }

    public async createWithId(product: Product, id: number): Promise<Product | null> {

        if (product.name == '' || product.price < 0 || product.name == null || product.price == null) {
            return null;
        }

        product.id = id;
        await this.productStore.put(product);

        return product;
    }

    public async update(product: Product): Promise<Product | null> {
        if (product.name == '' || product.price < 0 || product.name == null || product.price == null) {
            return null;
        }
        await this.productStore.overrideAProduct(product);
        return product;
    }

    public async delete(id: number) {
        await this.productStore.delete(id);
    }

    public async addBulk(products: Product[]) {
        let newProduct;
        for (let product of products) {
            newProduct = this.create(product);
            if (newProduct == null) {
                break;
            }
        }
        return newProduct;
    }

    /** add new application logic here */
}