import {ProductService} from "./product.service";
import {Product} from "./product";
import {Router} from "express";

export class ProductRouter {
    private readonly productService: ProductService;
    private readonly _router: Router;

    constructor() {
        this.productService = new ProductService();
        this._router = Router();

        this.router.get("/", (req, res) => {
            const products: Product[] = this.productService.findAll();
            res.status(200).send(products);
        });

        this.router.get("/:sid", (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);

            const product: Product = this.productService.find(sid);

            if (product) {
                return res.status(200).send(product);
            } else {

                res.status(404).send("item not found");
            }
        });

        this.router.delete("/:sid", (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            this.productService.delete(sid);
            res.status(201).send('Erfolg')
        });

        this.router.post("/update/", (req, res) => {
            const product: Product = req.body;
            const updated = this.productService.update(product);

            if (updated == null) {
                res.status(400).send("Konnte nicht updaten")
            } else {
                res.status(201).json(updated);
            }
        })

        this.router.post("/", (req, res) => {
            const product: Product = req.body;

            const newProduct = this.productService.create(product);
            if (newProduct == null) {
                res.status(400).send("Ein Wert falsch!")
            } else {
                res.status(201).json(newProduct);
            }
        });

        this.router.post("/:sid", (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const product: Product = req.body;

            const newProduct = this.productService.createWithId(product, sid);
            if (newProduct == null) {
                res.status(400).send("Ein Wert falsch!")
            } else {
                res.status(201).json(newProduct);
            }
        });

        this.router.post("/addBulk/", (req, res) => {
            const products: Product[] = req.body;
            const isBulked = this.productService.addBulk(products);
            if (isBulked == null) {
                res.status(400).send("Ein Wert falsch!")
            } else {
                res.status(201).json(products);
            }
        });

        /** Add new Sub-Routes for Main-Route 'api/product' here (i.e. delete, update, search) */
    }

    public get router(): Router {
        return this._router;
    }
}