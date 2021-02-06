import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // movies:Array<Movieodel>
  movies: MovieModel[];
  results: MovieModel[];
  page: number;
  isLoading: boolean;

  constructor(private movieService: MovieService, private router: Router) {
    console.log('Je suis le constructor');
  }

  ngOnInit(): void {
    this.isLoading = true;

    // request à l'API theMovie
    this.movieService.getMoviesFromApi();
    // on s'abonne à notre source de données movies$
    this.movieService.movies$.subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
        this.isLoading = false;
      }
    );
    // on s'abonne à la source de données search$
    this.movieService.search$.subscribe(data => this.results = data)

  } // Fin ngOnInit()


  /**
   * Loads next movies on userClickEvent
   */
  loadNextMovies() {
    this.isLoading = true;
    this.movieService.getNextMoviesFromApi()
  }

  /**
   * Searchs movies on UserInputEvent
   * @param searchText 
   */
  searchMovies(searchText: string) {
    console.log(searchText);
    if (searchText.trim().length < 3) {
      this.movieService.search$.next([]);
    }
    else {
      this.movieService.searchMoviesFromApi(searchText);
    }
  }

  /**
   * Delete search text on userClickEvent
   * @param inputElt 
   */
  deleteSearchText(inputElt) {
    inputElt.value = '';
    this.movieService.search$.next([]);
  }


  printImageSrc(movie: MovieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + movie.image;
  }

  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }




}
