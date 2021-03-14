import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Travel} from "../last-travels/last-travels.component";
import {map, single} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LastTravelsService implements OnInit {

    constructor(private db: AngularFirestore) {
    }


    ngOnInit(): void {
        console.log("ciao");
    }


    getAllTravels(): Observable<Travel[]> {
        return this.db.collection('travels', ref => ref.orderBy('country', 'desc')).snapshotChanges()
            .pipe(
                map(snaps => {
                        return snaps.map(snap => {
                            return <Travel>{
                                id: snap.payload.doc.id,
                                ...snap.payload.doc.data() as Object
                            }
                        })
                    },
                    single())
            );
    }
}

