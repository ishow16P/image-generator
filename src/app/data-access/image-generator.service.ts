import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ImageGeneratorService {
  private readonly API = "http://localhost:5000/api/v1/";

  private readonly httpClient = inject(HttpClient);

  public getImages(data: any): Observable<string[]> {
    return this.httpClient.post<string[]>(this.API + "images", data);
  }
}
