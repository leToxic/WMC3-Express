import {ProductStore} from "./product.store";
import {Product} from "./product";

export class ProductService {
    private productStore: ProductStore;

    constructor() {
        this.productStore = new ProductStore();
    }

    public findAll(): Product[] {
        return this.productStore.findAll();
    }

    public find(sid: number): Product {
        return this.productStore.find(sid);
    }

    public create(product: Product): Product | null {

        if (product.name == '' || product.price < 0 || product.name == null || product.price == null) {
            return null;
        }

        product.id = this.productStore.findAll().length + 1;
        this.productStore.put(product);

        return product;
    }

    public update(product: Product): Product | null {
        if (product.name == '' || product.price < 0 || product.name == null || product.price == null) {
            return null;
        }
        this.productStore.overrideAProduct(product);
        return product;
    }

    public delete(id: number) {
        this.productStore.delete(id);
    }

    public addBulk(products: Product[]) {
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