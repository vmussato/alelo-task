import { Component } from '@angular/core';
import { CategoryService } from './service/category.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items;

  constructor(
    private category: CategoryService,
    private router: Router
    ) {}

  ngOnInit() {
    this.category.getCategories().subscribe( response => {
      if (response.status === 200) {
        this.items = response.body;
      }
    })
  }

  navigate(item) {

    let navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    
    this.router.navigate(['/lists'], navigationExtras);
  }

}
