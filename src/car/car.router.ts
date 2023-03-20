import {CarService} from "./car.service";
import {Router} from "express";
import {Car} from "./car";
import {Product} from "../product/product";

export class CarRouter {
    private readonly carService: CarService;
    private readonly _router: Router;

    constructor() {
        this.carService = new CarService();
        this._router = Router();

        this.router.get("/", (req, res) => {
            const ret: Car[] = this.carService.findAll();
            res.status(200).send(ret);
        });

        this.router.get("/:sid", (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);

            const car: Car = this.carService.find(sid);

            if (car) {
                return res.status(200).send(car);
            } else {

                res.status(404).send("item not found");
            }
        });

        this.router.delete("/:sid", (req, res) => {
            const id: number = parseInt(req.params.sid, 10);
            this.carService.delete(id);
            res.status(201).send()
        });

        this.router.post("/reset/", (req, res) => {
            this.carService.reset()
            res.status(201).send();
        })


        this.router.put("/", (req, res) => {
            const car: Car = req.body;
            const updated: Car | null = this.carService.update(car);

            if (updated) {
                res.status(201).send(updated);
            } else {
                res.status(400).send("Konnte nicht updaten")
            }
        })

        this.router.post("/", (req, res) => {
            const car: Car = req.body;
            const newProduct = this.carService.create(car);

            if (newProduct) {
                res.status(201).send(newProduct);
            } else {
                res.status(400).send("Ein Wert falsch!")
            }
        });

        this.router.post("/:sid", (req, res) => {
            const id: number = parseInt(req.params.sid, 10);
            const car: Car = req.body;

            const newProduct = this.carService.createWithId(car, id);
            if (newProduct == null) {
                res.status(400).send("Ein Wert falsch!")
            } else {
                res.status(201).json(newProduct);
            }
        })
    }

    public get router(): Router {
        return this._router;
    }
}