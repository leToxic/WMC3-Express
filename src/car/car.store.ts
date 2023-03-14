import {Car} from "./car";

const defaultCars: Car[] = [
    {
        id: 1,
        producer: 'BMW',
        model: '335i',
        price: 250000,
        ps: 305,
        color: 'grey',
        buildYear: '25-01-2018'
    },
    {
        id: 2,
        producer: 'Mazda',
        model: 'MX3',
        price: 12000,
        ps: 120,
        color: 'yellow',
        buildYear: '12-02-2012'
    }
]


export class CarStore {
    private readonly cars: { [id: number]: Car } = {}

    constructor() {
        this.initWithDefault();
    }

    private initWithDefault() {
        defaultCars.forEach(car => {
            this.put(car);
        })
    }

    public reset() {
        this.initWithDefault();
    }

    public findAll(): Car[] {
        return Object.values(this.cars)
    }

    public find(id: number): Car {
        return this.cars[id];
    }

    public put(car: Car) {
        this.cars[car.id] = car;
    }

    public delete(id: number) {
        delete this.cars[id];
    }
}