import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map, switchMap } from "rxjs/operators";
import { Observable, of, from } from "rxjs";
import { NavController } from "@ionic/angular";
import {
  AngularFireStorageReference,
  AngularFireStorage
} from "@angular/fire/storage";
import { Animal } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private storage: AngularFireStorage
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signIn(credentials): Observable<any> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signUp(credentials) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        return this.db.doc(`users/${data.user.uid}`).set({
          name: credentials.name,
          email: credentials.email,
          created: Date.now(),
          identifier: credentials.email.split("@")[0],
          about: credentials.about,
          //bank: credentials.bank,
          location: credentials.location,
          phone: credentials.phone,
          web: credentials.web,
          logo: ""
        });
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot("/");
    });
  }

  getAllAnimals() {
    return this.db
      .collection("animals", ref => ref.where("active", "==", true))
      .valueChanges({ idField: "id" })
      .pipe(
        map(actions =>
          actions.map(animal => {
            return animal as Animal;
          })
        )
      );
  }

  getAnimalsByType(type) {
    return this.db
      .collection("animals", ref =>
        ref.where("active", "==", true).where("type", "==", type)
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map(actions =>
          actions.map(animal => {
            return animal as Animal;
          })
        )
      );
  }
  getMyAnimals() {
    return this.db
      .collection("animals", ref =>
        ref.where("shelter", "==", this.afAuth.auth.currentUser.uid)
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map(actions =>
          actions.map(animal => {
            return animal as Animal;
          })
        )
      );
  }

  getAnimal(id) {
    return this.db.doc(`animals/${id}`).valueChanges();
  }

  addAnimal(animal) {
    animal.shelter = this.afAuth.auth.currentUser.uid;
    animal.active = true;
    const imageData = animal.image;
    delete animal.image;

    let documentId = null;
    let storageRef: AngularFireStorageReference = null;

    return this.db
      .collection("animals")
      .add(animal)
      .then(ref => {
        documentId = ref.id;
        storageRef = this.storage.ref(`animals/${documentId}`);
        const uploadTask = storageRef.putString(imageData, "data_url");
        return uploadTask;
      })
      .then(task => {
        return storageRef.getDownloadURL().toPromise();
      })
      .then(imageUrl => {
        return this.db.doc(`animals/${documentId}`).update({ image: imageUrl });
      });
  }

  updateAnimal(id, animal) {
    return this.db.doc(`animals/${id}`).update(animal);
  }

  adoptAnimal(id) {
    return this.db.doc(`animals/${id}`).update({ active: false });
  }

  deleteAnimal(id) {
    return this.db.doc(`animals/${id}`).delete();
  }

  getShelter(id) {
    return this.db.doc(`users/${id}`).valueChanges();
  }
}
