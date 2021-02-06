import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from './shared/models/movie.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL = environment.TMDB_API_URL;
  private API_KEY = environment.TMDB_API_KEY;
  /*
   on crée un Subject movies$ et search$
   la particularité des objets de type Subject
      > On peut observer le changement avec .subscribe()
      > On peut pousser une nouvelle data avec .next()
    Nos components peuvent alors s'abonner à cette source
    et réagir au changement de données (programmation réactive)
  */
  movies$ = new BehaviorSubject<MovieModel[]>([]);
  search$ = new BehaviorSubject<MovieModel[]>([]);
  currentPage: number = 1;

  constructor(private http: HttpClient) { }


  /**
   * Load 20 movies from API (/discover/movie)
   */
  getMoviesFromApi(): void {
    // avec HttpParams : on forme la queryString 
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        page: this.currentPage.toString()
      }
    });
    // On fait la requête http.get(url, params) 
    this.http.get(this.API_URL + '/discover/movie', { params })
      .pipe(map(
        (apiResponse: any) =>
          apiResponse.results.map(movie => this.createMovie(movie))
      ))
      .subscribe(response => {
        console.log(response);
        let movies = this.movies$.getValue();
        this.movies$.next([...movies, ...response]);
      })
  }


  /**
   * Search movies from api (/search/movie/searchtext)
   * @param searchText:string 
   */
  searchMoviesFromApi(searchText: string): void {
    // avec HttpParams : on forme la queryString 
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        query: searchText
      }
    });
    // On fait la requête http.get(url, params) 
    this.http.get(this.API_URL + '/search/movie', { params })
      .pipe(map(
        (apiResponse: any) =>
          apiResponse.results.map(movie => this.createMovie(movie))
      ))
      .subscribe(response => {
        console.log(response);
        this.search$.next(response);
      })
  }


  /**
   * Get next movies from api
   */
  getNextMoviesFromApi(): void {
    this.currentPage++;
    this.getMoviesFromApi();
  }


  /**
   * Instanciate movie
   * @param movie:any 
   * @returns MovieModel 
   */
  createMovie(movie: any): MovieModel {
    return new MovieModel(
      movie.id,
      movie.title,
      movie.overview,
      movie.backdrop_path,
      movie.release_date,
      movie.vote_average
    )
  }

  /**
   * Gets trailer
   * @param movieId 
   */
  getTrailer(movieId: number): Observable<any> {
    // avec HttpParams : on forme la queryString 
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr'
      }
    });
    return this.http.get(this.API_URL + '/movie/' + movieId + '/videos', { params })
      .pipe(map((apiResponse: any) => apiResponse.results))
  }











}
