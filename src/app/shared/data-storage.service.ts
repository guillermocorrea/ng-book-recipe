import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeServices: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-b7900.firebaseio.com/recipes.json', this.recipeServices.getRecipes());
  }

  async getRecipes() {
    const token = await this.authService.getToken();
    this.http.get<Recipe[]>('https://ng-recipe-book-b7900.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          // const recipes: Recipe[] = response.json(); old client
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeServices.setRecipes(recipes);
      });
  }
}
