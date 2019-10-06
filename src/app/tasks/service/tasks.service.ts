import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://5cfa67ebf26e8c00146d0756.mockapi.io/categories/'

  options = { observe: 'response' as 'body' };

  

  getTasks(categoryId, listId) {
    return this.http.get<HttpResponse<Object>>(`${environment.apiUrl}categories/${categoryId}/lists/${listId}/items`, this.options);
  }

  addTask(categoryId, listId, taskTitle) {

    let taskObject = {
      "name": "",
      "done": false,
    }

    taskObject.name = taskTitle;
    return this.http.post<HttpResponse<Object>>(`${environment.apiUrl}categories/${categoryId}/lists/${listId}/items`, taskObject, this.options);
  }

  updateTask(categoryId, listId, taskId, done) {

    let taskObject = {
      "done": ""
    }

    taskObject.done = done;
    return this.http.put<HttpResponse<Object>>(`${environment.apiUrl}categories/${categoryId}/lists/${listId}/items/${taskId}`, taskObject, this.options);
  }

  deleteTask(categoryId, listId, taskId) {
    return this.http.delete<HttpResponse<Object>>(`${environment.apiUrl}categories/${categoryId}/lists/${listId}/items/${taskId}`, this.options);
  }
} 
