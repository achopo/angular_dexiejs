import { Injectable } from "@angular/core";
import { db } from "./db.service";
import { Client } from "../models/client.model";

@Injectable({
    providedIn :'root'
})
export class ClientService {

    add(client :Client){
        return db.clients.add(client);
    }

    getAll(){
        return db.clients.toArray();
    }

    getByCin(cin :string){
        return db.clients.get(cin);
    }

    update(client: Client){
        return db.clients.put(client);
    }

    async delete(cin :string){
        const numberFactures = await db.factures.where('clientCin').equals(cin).count();
        if (numberFactures>0) {
            throw new Error('You cannot delete client with existing factures, you must delete all his factures first')
        } else {
            return db.clients.delete(cin);
        }
    }

}