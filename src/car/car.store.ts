import {Car} from "./car";

const defaultCars: Car[] = [
    {
        id: 1,
        producer: 'BMW',
        model: '335i',
        price: 250000,
        ps: 305,
        color: 'grey',
        buildDate: '25-01-2018'
    },
    {
        id: 2,
        producer: 'Mazda',
        model: 'MX3',
        price: 12000,
        ps: 120,
        color: 'yellow',
        buildDate: '12-02-2012'
    }
]


export class CarStore {
    private cars: { [id: number]: Car } = {}

    constructor() {
        this.initWithDefault();
    }

    private initWithDefault() {
        this.cars = {}
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