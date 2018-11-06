import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDUpTbP_14zmWcb5_uelBMZKClWHddk2SY',
      authDomain: 'ng-recipe-book-b7900.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-b7900.firebaseio.com',
      projectId: 'ng-recipe-book-b7900',
      storageBucket: 'ng-recipe-book-b7900.appspot.com',
      messagingSenderId: '507961845534'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
