import {Injectable, Inject} from '@angular/core'; 
import {Observable} from 'rxjs'; 
import {map, catchError} from 'rxjs/operators'; 
import {HttpClient} from '@angular/common/http'; 

///data models
import {Leader} from '../shared/leader'; 
import {baseURL} from '../shared/baseurl'; 

///services
import {ProcessHTTPMsgService} from '../services/process-http.service'; 
import { Promotion } from '../shared/promotion';


@Injectable({
    providedIn: 'root'
})

export class PromotionService{

    constructor (
        private http: HttpClient, 
        private processHttpMsgService: ProcessHTTPMsgService){}

    getPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(baseURL + 'promotions.json')
               .pipe(catchError(this.processHttpMsgService.handleError)); 
    }

    getPromotion(id: number): Observable<Leader>{
        return this.http.get<Leader>(baseURL + 'promotions/' + id + '.json')
               .pipe(catchError(this.processHttpMsgService.handleError)); 
    }

    getFeaturedPromotion(): Observable<Promotion>{
        return this.http.get<Promotion>(baseURL + 'promotions.json?orderBy="featured"&equalTo="true"')
               .pipe(map(leader=> leader[0]))
               .pipe(catchError(this.processHttpMsgService.handleError)); 
    }
}
