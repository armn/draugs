import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animal } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit, OnDestroy {

  animals: Array<any>;
  filterForm: FormGroup;
  searchQuery: string;
  noMore: any;
  showFilters: any;
  searchResults: any;
  subscription: Subscription;
  searching: Boolean;
  filters: Boolean;
  cat: Boolean;
  dog: Boolean;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.subscription = this.firebaseService.getAllAnimals().subscribe(res => {
      this.animals = res;
    });

    this.dog = true;
    this.cat = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchAnimals() {
    if (this.searchQuery) {
      this.searching = true;
      this.searchResults = this.animals.filter(animal => {
        if (animal.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || animal.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) {
          return true;
        }
        else {
          return false;
        }
      });
    }
    else {
      this.searching = false;
    }

  }

  applyFilter() {
    if (this.dog && this.cat) {
      this.subscription.add(this.firebaseService.getAllAnimals().subscribe(res => {
        this.animals = res;
      }));
    }
    else if (this.dog && !this.cat) {
      this.subscription.add(this.firebaseService.getAnimalsByType("dog").subscribe(res => {
        this.animals = res;
      }));
    }
    else if (!this.dog && this.cat) {
      this.subscription.add(this.firebaseService.getAnimalsByType("cat").subscribe(res => {
        this.animals = res;
      }));
    }
    else {
      this.animals = null;
    }
  }

}
