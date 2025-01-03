import { Injectable } from '@angular/core';
import { IProject } from '../models/IProject';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUri: string = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }
  addProject(project: IProject) {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, project);
  }
  //get All project
  getAllProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.baseUri);
  }


  getProjectsOfUser(userId: string) {
    let url = `${this.baseUri}/findProjectsOfUser/${userId}`;
    return this.http.get(url);
  }
  getOneProject(id: string | null) {
    let url = `${this.baseUri}/read/` + id;
    return this.http.get(url);
  }

  updateProject(id: string | null, obj: any) {
    let url = `${this.baseUri}/update/` + id;
    return this.http.put(url, obj);
  }

  updateBid(obj: any) {
    let url = `${this.baseUri}/updateBid/` + obj.id;
    return this.http.post(url, obj);
  }
  updateProjectStatus(obj: any) {
    let url = `${this.baseUri}/updateProjectStatus/` + obj.projectId;
    return this.http.post(url, obj);
  }
  getProjectsOfCategory(obj: any) {
    let url = `${this.baseUri}/getProjectOfCategory`;
    return this.http.post(url, obj);
  }
  downloadProjectFile(id: string | null) {
    let url = `${this.baseUri}/download/` + id;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadWorkFile(id: string | null) {
    let url = `${this.baseUri}/downloadWorkFile/` + id;
    return this.http.get(url, { responseType: 'blob' });
  }

  deleteProject(id: string | null) {
    let url = `${this.baseUri}/delete/` + id;
    return this.http.delete(url);
  }
  getAllHiredProject(id: string) {
    let url = `${this.baseUri}/getAllHiredProject/` + id;
    return this.http.get(url);
  }
  updateStatusOfProject(obj: any) {
    let url = `${this.baseUri}/updateStatusOfProject/` + obj.id;
    return this.http.post(url, obj);
  }
}
