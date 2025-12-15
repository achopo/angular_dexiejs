import Dexie, {Table} from "dexie";
import { Client } from "../models/client.model";
import { Product } from "../models/product.model";
import { Facture } from "../models/facture.model";
import { FactureProduct } from "../models/facture_product.model";

export class dao extends Dexie {
    clients !: Table<Client,string>;
    products !: Table<Product, number>;
    factures !: Table<Facture, number>;
    factureProducts !: Table<FactureProduct, [number,number]>;

    constructor(){
        super('FacturationDB');
        this.version(1).stores({
            clients : 'cin',
            products : '++id',
            factures : '++numFacture, clientCin',
            factureProducts: '[factureId+productId], factureId, productId'
        })
    }
}
export const db = new dao();