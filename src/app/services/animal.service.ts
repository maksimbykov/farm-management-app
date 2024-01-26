import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'https://localhost:7170/api/animals';

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  addAnimal(name: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { name });
  }

  deleteAnimal(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${name}`);
  }
}
