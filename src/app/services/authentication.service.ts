import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticateUser(data) {
    return this.httpClient.post("http://localhost:3000/auth/v1/", data);
  }

  setBearerToken(token) {
    localStorage.setItem("bearerToken", token);
  }

  getBearerToken() {
    return localStorage.getItem("bearerToken");
  }

  isUserAuthenticated = (token: any): Promise<boolean> => {
    return this.httpClient
      .post(
        "http://localhost:3000/auth/v1/isAuthenticated",
        {},
        {
          headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
        }
      )
      .map((res: { isAuthenticated: boolean }) => res.isAuthenticated)
      .toPromise();
  };
}
