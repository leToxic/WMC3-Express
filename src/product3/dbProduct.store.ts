import {ProductStore} from "./product.store";
import {Product} from "./product";
import {DBPool} from "./dbPool";
import {Decimal, Int, VarChar} from "mssql";

export class DbProductStore implements ProductStore {

    async delete(id: number): Promise<void> {
        try {
            (await DBPool.getInstance().request()
                .input('id', Decimal(5,2), id)
                .query<Product>('delete from wmc.product where id = @id ;'));
            ;
        } catch (e) {
            console.log(e)
        }
    }

    async find(sid: number): Promise<Product> {
        try {
            return (await DBPool.getInstance().request()
                .input('sid', Decimal(5,2), sid)
                .query<Product>('select * from wmc.product where id = @sid')).recordset[0];
        } catch (e) {
            console.log(e)
            throw new Error("failed to find")
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return (await DBPool.getInstance().request()
                .query<Product[]>('select * from wmc.product')).recordset;
        } catch (e) {
            console.log(e)
            throw new Error("failed to find")
        }
    }

    async overrideAProduct(product: Product): Promise<void> {
        try {
            (await DBPool.getInstance().request()
                .input('id', Decimal(5,2), product.id)
                .input("name", VarChar(50), product.name)
                .input('price', Decimal(5,2), product.price)
                .query<Product>('update wmc.product set name = @name, price = @price where id = @id'));
            ;
        } catch (e) {
            console.log(e)
            throw new Error("failed to find")
        }
    }

    async put(product: Product): Promise<void> {
        try {
            (await DBPool.getInstance().request()
                .input("name", VarChar(50), product.name)
                .input('price', Decimal(5,2), product.price)
                .query<Product>('insert into wmc.product (name, price)values (@name, @price);'));
            ;
        } catch (e) {
            console.log(e)
            throw new Error("failed to find")
        }
    }

}