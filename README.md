# Trayt express.js coding challenge

To start the express server, run:

`npm install`

and then

`npm start`

# Coding Challenge

Please read through this document before you start

## Requirements

A simple express.js app already exists to save you some time. You should **fork** this repo and build on top of it.

You should allocate about 2 hours to work on this project. Although it is okay to exceed that time, we do encourage you
to limit yourself. We appreciate that this is a significant investment of your time.

### Build a route to recommend movies for users based on user's rated movies

`GET localhost:9000/recommendations`
Expected json response example
```json
{
    "recommendation": {
        "favDirector": "Christopher Nolan",
        "favGenre": "Adventure",
        "byDirector": [
            {
                "id": "tt6723592",
                "name": "Tenet",
                "director": "Christopher Nolan",
                "genres": [ "Action", "Sci-Fi" ]
            },
            {
                "id": "tt5013056",
                "name": "Dunkirk",
                "director": "Christopher Nolan",
                "genres": [ "Action", "Drama", "History", "Thriller", "War" ]
            },
            // ...
        ],
        "byGenre": [
            {
                "id": "tt1345836",
                "name": "The Dark Knight Rises",
                "director": "Christopher Nolan",
                "genres": [ "Action", "Adventure" ]
            },
            {
                "id": "tt1375666",
                "name": "Inception",
                "director": "Christopher Nolan",
                "genres": [ "Action", "Adventure", "Sci-Fi", "Thriller" ]
            },
            // ...
        ]
    }
}
```

1. The route should have a middleware where it uses the user's `Bearer Token` to get the user's `userId`
(which you will hard code to `9aaec1fc-ea13-4783-81f8-a998c1e0d648`)
2. First you should get a list of movies a user has rated, `ratedMovies`. Using `getRatedMovies(userId)`
3. Figure out what is the name of a user's favorite director, `favDirector`. By counting the most popular director in `ratedMovies` list that have `userRating` larger or equal to 7 (1~10 scale)
4. Figure out what is a user's favorite genre, `favGenre`. By counting the most popular genre in `ratedMovies` list that have `userRating` larger or equal to 7 (1~10 scale)
5. Use `favDirector` to get a list of recommended movies made by this director (`byDirector`)
6. Use `favGenre` to get a list of recommended movies in the genre (`byGenre`)
7. Filter out movies in `byDirector` and `byGenre` that's already in the user's `ratedMovies`. (Because that means the user already watched it)
8. Use `getSavedRecommendations(userId)` to see if the user already have saved recommendation available. If it is the case, return saved recommendation. It not, get recommendation using the steps above and use `saveRecommendations(userId, recommendation)` to save the user's recommendation.

### Helper functions

5 helper functions are available to mock the function of a database.

#### Get user's movie rating
A helper function `getRatedMovies(userId)` in `helperFunctions.js` is available to get a list of movies that user already rated. `userRating` have a scale of 1 to 10
```js
// example output
[
  {
    id: 'tt0816692',
    name: 'Interstellar',
    director: 'Christopher Nolan',
    genres: [ 'Adventure', 'Drama', 'Sci-Fi', 'Thriller' ],
    userRating: 9
  },
  {
    id: 'tt0414993',
    name: 'The Fountain',
    director: 'Darren Aronofsky',
    genres: [ 'Drama', 'Mystery', 'Romance', 'Sci-Fi' ],
    userRating: 5
  },
  ...
]
```

#### Get Recommendation by director
A helper function `getRecommendationByDirector(director)` in `helperFunctions.js` is available to get a list of recommendated movies made by the same director
```js
// getRecommendationByDirector('Christopher Nolan')
// example output
[
  {
    id: 'tt6723592',
    name: 'Tenet',
    director: 'Christopher Nolan',
    genres: [ 'Action', 'Sci-Fi' ]
  },
  {
    id: 'tt5013056',
    name: 'Dunkirk',
    director: 'Christopher Nolan',
    genres: [ 'Action', 'Drama', 'History', 'Thriller', 'War' ]
  },
  ...
]
```

#### Get Recommendation by genre
A helper function `getRecommendationByGenre(genre)` in `helperFunctions.js` is available to get a list of recommendation movies that's in the same genre
```js
// getRecommendationByGenre('Adventure')
// example output
[
  {
    id: 'tt5104604',
    name: 'Isle of Dogs',
    director: 'Wes Anderson',
    genres: [ 'Animation', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi']
  },
  {
    id: 'tt2278388',
    name: 'The Grand Budapest Hotel',
    director: 'Wes Anderson',
    genres: [ 'Adventure', 'Comedy', 'Crime' ]
  },
  ...
]
```

#### Save/get Recommendations
A helper function `saveRecommendations(userId, recommendation)` should be used to save the user's `recommendation` the first time user uses that route. (use's saved `recommendation` will be wiped after 10 seconds in this test. Realistically it should be something like a day or more)

A helper function `getSavedRecommendations(userId)` should be used to get user's `recommendation` if it is already saved.


## Github branch
There are a couple of options on how to share the code with us:- 
1. Please fork the repository on your local machine, make your changes and then commit to **your** github repository.
Once complete, please send us the link of your repository. 

2. If you do not want to upload in you private repo, please email us the zip file of the code. 

## What we are looking for in this coding challenge
1. Able to understand requirements and build basic routes in express.js
2. Know how to deal with *promises* and use ES2017 *async/await syntax*
3. Know how to write *easy to understand* and *easy to change* code
4. Able to write efficient code that *minimize response time*
5. Able to make clean commits and make meaningful commit messages. (you should make small commits that shows how you progress in this project)
