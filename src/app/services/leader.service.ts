import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-http.service';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  leader: Leader;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders.json')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL +'leaders/'+ id +'.json')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders.json?orderBy="featured"&equalTo="true"').pipe(map(leaders => leaders[3]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}