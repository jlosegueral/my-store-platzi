import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { File } from '../../models/index.models'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _apiUrl = `${environment.API_URL}/api/files`;
  

  constructor(
    private http: HttpClient
  ){}



  getFile(name: string, url: string, type: string) {

    return this.http.get(url, {responseType: 'blob'})
          .pipe(
            tap(content => {
              const blob = new Blob([content], {type});
              saveAs(blob, name);
            }),
            map(() => true)
          );
  }

  uploadFile(file: Blob): Observable<File> {
      
    const dto = new FormData();
    dto.append('file', file);

    return this.http.post<File>(`${this._apiUrl}/upload`, dto,
    {
      // headers: {
      //   'Content-type': "multipart/form-data"
      // }
    });

  }



}
