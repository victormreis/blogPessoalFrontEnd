import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root',
})
export class PostagensService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      'https://blogpessoalspring.herokuapp.com/postagens',
      this.token
    );
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(
      `https://blogpessoalspring.herokuapp.com/postagens/${id}`,
      this.token
    );
  }

  getByTitulo(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      `https://blogpessoalspring.herokuapp.com/postagens/titulo/${titulo}`,
      this.token
    );
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      'https://blogpessoalspring.herokuapp.com/postagens',
      postagem,
      this.token
    );
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(
      'https://blogpessoalspring.herokuapp.com/postagens',
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(
      `https://blogpessoalspring.herokuapp.com/postagens/${id}`,
      this.token
    );
  }
}
