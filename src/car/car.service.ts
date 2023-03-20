import {CarStore} from "./car.store";
import {Car} from "./car";

export class CarService {
    private carStore: CarStore;

    constructor() {
        this.carStore = new CarStore();
    }

    public findAll(): Car[] {
        return this.carStore.findAll();
    }

    public find(id: number): Car {
        return this.carStore.find(id);
    }

    private checkIsValid(car: Car): boolean {
        return car.price >= 0 && car.ps >= 0;
    }

    public create(car: Car): Car | null {
        car.id = this.carStore.find(this.carStore.findAll().length).id + 1;
        this.carStore.put(car);

        return car;
    }

    public reset() {
        this.carStore.reset();
    }

    public createWithId(car: Car, id: number): Car | null {
        if (this.checkIsValid(car)) {
            car.id = id;
            this.carStore.put(car)
            return car;
        }
        return null
    }

    public update(car: Car): Car | null {
        if (this.carStore.find(car.id) && this.checkIsValid(car)) {
            this.carStore.put(car);
            return car;
        }
        return null;
    }

    public delete(id: number): number | null {
        if (this.carStore.find(id)) {
            this.carStore.delete(id);
            return id;
        }
        return null;
    }

    // AddBulk?
}