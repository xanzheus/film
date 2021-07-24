import RequestService from './request.service';

const requestServise = new RequestService();

const searchQuery = 'Titanic';

requestServise.query = searchQuery;

requestServise.getTrendingMovies().then(console.log);
requestServise.getSearchMovies().then(console.log);
requestServise.getDescriptionMovie(334455).then(console.log);
requestServise.getGenresMovies().then(console.log);

console.log(requestServise.getPrefixUrlImg('/wob7xUAJS85zf6OtQaHZQUvVWjX.jpg'));
