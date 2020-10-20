import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Vehicle } from './interfaces/vehicle';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) { }

  private baseUrl = environment.BASE_URL;

  private log(message: string) {
    console.log(message);
  }

  searchVehicles(term: string): Observable<Vehicle[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Vehicle[]>(`${this.baseUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Vehicles matching "${term}"`)
          : this.log(`no Vehicles matching "${term}"`)
      ),
      catchError(this.handleError<Vehicle[]>('searchVehicles', []))
    );
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl).pipe(
      tap((_) => this.log('fetched Vehicles')),
      catchError(this.handleError<Vehicle[]>('getVehicles', []))
    );
  }

  getVehicle(id: number): Observable<Vehicle> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Vehicle>(url).pipe(
      tap((_) => this.log(`fetched Vehicle id=${id}`)),
      catchError(this.handleError<Vehicle>(`getVehicle id=${id}`))
    );
  }



  /** POST: add a new Vehicle to the server */
  async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    try {
      return await this.http.post<Vehicle>(this.baseUrl, vehicle, this.httpOptions).toPromise();
    } catch (error) {

    }
  }

  async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const url = `${this.baseUrl}/${vehicle._id}`;
    try {
      return await this.http.put<Vehicle>(url, vehicle, this.httpOptions).toPromise();
      
    } catch (error) {
      
    }
  }

  async deleteVehicle(id: string): Promise<string> {
    const url = `${this.baseUrl}/${id}`;
    try {
      return await this.http.delete<string>(url, this.httpOptions).toPromise();
    } catch (error) {
    }   
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
