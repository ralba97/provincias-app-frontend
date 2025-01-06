import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomBaseService {

  baseUrl!: string;

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response'
  };

  /**
   * Construct method.
   */
  constructor(protected http: HttpClient) {
  }

  /**
   * metodo GET
   */
  get(url: string, responseType?: string, body?:any, headers?: any): Observable<any | Blob> {
    if (responseType === 'blob') {
      return this.http.get(`${this.baseUrl}${url}`, {
        responseType: responseType,
        params: body,
        withCredentials: true
      })
        .pipe(
          catchError(this.handleErrorGet()));
    }
    return this.http.get<any>(`${this.baseUrl}${url}`, { headers })
      .pipe(
        catchError(this.handleErrorGet())
      );
  }

  /**
   * Method to handle problems.
   */
  private handleErrorGet() {
    return this.handleError('method get');
  }

  /**
   * metodo GET,
   */
  getWithoutBaseUrl(url: string, responseType?: string, body?:any, headers?: any): Observable<any | Blob> {
    if (responseType === 'blob') {
      return this.http.get(`${url}`, { headers: headers.headers, responseType: 'blob', withCredentials: true })
        .pipe(
          catchError(this.handleErrorGet()));
    }
    return this.http.get<any>(`${url}`, headers)
      .pipe(
        catchError(this.handleErrorGet())
      );
  }

  /**
   * metodo POST.
   */
  post(url: string, body?: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${url}`, body, { withCredentials: true }).pipe(
      map(resp => resp)
    ).pipe(
      catchError(this.handleError('method post'))
    );
  }

  /**
   * Metodo POST sin baseUrl.
   * @param url url del post
   * @param body datos
   * @param headers cabecera
   */
  postWithoutBaseUrl(url: string, body?: any): Observable<any> {
    return this.http.post<any>(`${url}`, body, { withCredentials: true })
      .pipe(
        map(resp => resp)
      ).pipe(
        catchError(this.handleError('method post without base'))
      );
  }

  /**
   * Meodo post que retorna con headers
   */
  postWithHeader(url: string, body?: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${url}`, body, { observe: 'response' })
      .pipe(
        catchError(this.handleError('method post'))
      );
  }

  /**
   * metodo DELETE
   */
  delete(url: string, body?: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${url}`, body)
      .pipe(
        catchError(this.handleError('method delete'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      window.console.error(error.error);
      this.log(`${operation} failed: ${error.error}`);
      const err = new Error('test');
      return throwError(() => err);
    };
  }

  /**
   * Log a message
   */
  protected log(message: string) {
    console.log(`${this.constructor.name}:${message}`);
  }

}
