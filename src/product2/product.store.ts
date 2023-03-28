import {Product} from "./product";

export interface ProductStore {
    findAll(): Promise<Product[]>;

    find(sid: number): Promise<Product>;

    put(product: Product): Promise<void>;

    overrideAProduct(product: Product): Promise<void>;

    delete(id: number): Promise<void>;
}