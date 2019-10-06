import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TaskService } from './service/tasks.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

data: any;
items;
listData;
taskTitle;

constructor(
  private route: ActivatedRoute, 
  private router: Router,
  private task: TaskService
  ) {
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.listData = this.router.getCurrentNavigation().extras.state;
    }
  });
}

  ngOnInit() {
    this.getTasks();
  }

  addTask() {
    this.task.addTask(this.listData.categoryId, this.listData.list.id, this.taskTitle).subscribe(response => {
      if(response.status === 201) {
        this.getTasks();
      }
    })
  }

  getTasks() {
    this.task.getTasks(this.listData.categoryId, this.listData.list.id).subscribe(response => {
      console.log(response, 'response')
      this.items = response.body;
    })
  }

  changeDone(item) {

    let done = item.done === true ? false : true;

    this.task.updateTask(this.listData.categoryId, this.listData.list.id, item.id, done).subscribe(response => {
      if(response.status === 200) {
        this.getTasks();
      }
    })
  }

  deleteTask(item) {

    this.task.deleteTask(this.listData.categoryId, this.listData.list.id, item.id).subscribe(response => {
      if(response.status === 200) {
        this.getTasks();
      }
    })
  }

}
