// On crée un model de data pour nos movies côté front
// Afin de s'affranchir du résultat donné par l'API 
// Et conserver une cohérence dans toute notre applicaction

/*
   On instancie des MovieModel 
   pour transformer la réponse de l'API TMDB dans notre service movie.service.ts
*/
export class MovieModel {
   id: number;
   title: string;
   desc: string;
   image: string;
   date: Date;
   score: number;

   constructor(id: number, title: string, overview: string, backdrop: string, release_date: string, vote_average: number) {
      this.id = id;
      this.title = title;
      this.desc = overview;
      this.image = backdrop;
      this.date = new Date(release_date);
      this.score = vote_average;
   }
}