import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { CadastroDto, EditarPerfilDto, LoginDto, PerfilDto, RedefinirSenhaDto } from '../../shared/models/usuario.models';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  id: string;
  nome: string;
  role: string;
  exp: string;
}

interface EditarPerfilResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly url: string = environment.apiUrl + '/Usuario';
  private readonly keyToken: string = 'token';
  private readonly keyExpiration = 'token-expiration';

  loggedIn = signal(!!localStorage.getItem(this.keyToken));

  login(credenciais: LoginDto): Observable<string> {
    return this.http.post(`${this.url}/login`, credenciais, { responseType: 'text' })
    .pipe(
      tap(response => {
        localStorage.setItem(this.keyToken, response);
        this.loggedIn.set(true);
      })
    );
  }

  cadastrar(credenciais: CadastroDto) {
    return this.http.post(`${this.url}/cadastro`, credenciais);
  }

  getPerfil(): Observable<PerfilDto> {
    return this.http.get<PerfilDto>(`${this.url}/perfil`);
  }

  editarPerfil(dto: EditarPerfilDto): Observable<EditarPerfilResponse> {
    return this.http.put<EditarPerfilResponse>(`${this.url}/editar-perfil`,dto).pipe(
      tap(response => {
        localStorage.setItem(this.keyToken, response.token);
        this.loggedIn.set(true);
      })
    );
  }

  alterarSenha(dto: RedefinirSenhaDto) {
    return this.http.patch(`${this.url}/alterar-senha`, dto);
  }

  getJWTToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  getJWTClaim(field: keyof CustomJwtPayload): string {
    const token = this.getJWTToken();

    if(!token)
      return '';

    const dataToken = jwtDecode<CustomJwtPayload>(token)
    return dataToken[field];
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  isTokenExpired(): boolean {
    const token = this.getJWTToken();
    if (!token) return true;

    const payload = jwtDecode<CustomJwtPayload>(token);

    const expiration = Number(payload.exp) * 1000;

    return Date.now() > expiration;
  }

  logout() {
    localStorage.removeItem(this.keyExpiration);
    localStorage.removeItem(this.keyToken);
    this.loggedIn.set(false);
    this.router.navigate(['/']);
  }

  getNome(): string {
    const nome = this.getJWTClaim('nome');
    return nome;
  }

  getRole(): string {
    const isAdmin = this.getJWTClaim('role');

    if(isAdmin === 'admin')
      return 'admin';

    return 'user';
  }
}
