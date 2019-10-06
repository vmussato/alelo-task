import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ListService } from './service/lists.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

data: any;
items;
category;
listTitle;

constructor(
  private route: ActivatedRoute, 
  private router: Router,
  private list: ListService
  ) {
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.category = this.router.getCurrentNavigation().extras.state.data.id;
    }
  });
}


  ngOnInit() {
    this.getLists(this.category);
  }

  addList() {
    if(this.listTitle !== '') {
      this.list.addList(this.category, this.listTitle).subscribe( response => {  
        if(response.status == 201) {
          this.getLists(this.category);
        }    
      })
    }
  }

  getLists(category) {
    this.list.getList(category).subscribe(response => {
      if(response.status === 200) {
        this.items = response.body;
      }
    })
  }

  navigate(item) {

    let navigationExtras: NavigationExtras = {
      state: {
        categoryId: this.category,
        list: item
      }
    };
    
    this.router.navigate(['/tasks'], navigationExtras);
  }

}
