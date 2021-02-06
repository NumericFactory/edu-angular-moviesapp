import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  movieId: number;
  type: string;
  movie: MovieModel;
  trailerId: string;
  isLoadingVideo: boolean;
  /*
    injecter un objet de la class ActivatedRoute
    permet de récupérer le paramètre id de l'url
    ** avec .snapshot.params.id
  */
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private sanitize: DomSanitizer
  ) { }

  ngOnInit(): void {
    // 1 recuperer l'ID du film ET le type ('movies', ou 'results')
    this.movieId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;
    this.isLoadingVideo = true;

    // 2 récupérer les informations du film
    if (this.type == 'movies') {
      this.movie = this.movieService.movies$.getValue()
        .find(movie => movie.id == this.movieId);
    }
    else {
      this.movie = this.movieService.search$.getValue()
        .find(movie => movie.id == this.movieId);
    }
    // 3 récupérer le trailer.key du film (video Youtube)
    this.movieService.getTrailer(this.movieId).subscribe(
      trailers => {
        console.log('trailers', trailers)
        trailers.length > 0 ? this.trailerId = trailers[0].key : this.trailerId = null;
        this.isLoadingVideo = false;
      }
    )

  } // fin ngOnInit()


  /**
   * Return url of movie on Youtube
   * 
   * on utilise une instance de DomSanitizer
   * et la méthode bypassSecurityTrustResourceUrl()
   * 
   * (https://angular.io/api/platform-browser/DomSanitizer)
   * @returns url: SafeResourceUrl
   */
  getSafeUrl(): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/' + this.trailerId
    );
  }

  /**
   * Go back to listPage
   */
  goToRootPage() {
    this.movieService.search$.next([]);
    this.router.navigate(['/']);
  }

}
