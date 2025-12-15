import { Injectable } from "@angular/core";
import { db } from "./db.service";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    add(product: Product){
        return db.products.add(product);
    }

    getAll(){
        return db.products.toArray();
    }

    getById(id: number){
        return db.products.get(id);
    }

    update(product: Product){
        return db.products.put(product);
    }

    delete(id: number){
        return db.products.delete(id);
    }
}