import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patent } from '../model/patent';

const  API_URL = '/PatentProvider/';

@Injectable({
  providedIn: 'root'
})

export class PatentAppService {

    responseData: any;

    constructor(public http: HttpClient) { }

    getYearCount(requestService: String): Observable<any[]> {
        return this.http.get<any[]>(API_URL + requestService);
    }

    getDocumentTypeData(requestService: String): Observable<any[]> {
        return this.http.get<any[]>(API_URL + requestService);
    }

    getAllPatentRecords(requestService: String): Observable<Patent[]> {
        return this.http.get<Patent[]>(API_URL + requestService);
    }

    searchForPatent(requestService: string): Observable<Patent[]> {
        return this.http.get<Patent[]>(API_URL + requestService);
    }
}
