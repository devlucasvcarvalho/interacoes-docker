import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  private jsonUrl = 'assets/mocks/acoes.json'; // Caminho do JSON dentro de 'assets'

  constructor(private http: HttpClient) {}

  // Método para carregar os dados do JSON local
  getAcoes(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
