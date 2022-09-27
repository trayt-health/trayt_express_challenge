const {
    getRatedMovies,
    getRecommendationByDirector,
    getRecommendationByGenre,
    saveRecommendations,
    getSavedRecommendations,
  } = require('../../helperFunctions')

const favourableMovieMinScore = 7;

async function getUserRecommendations(userID) {
    const previouslySavedRecommendations = await getSavedRecommendations(userID);
    const hasSavedRecommendation = previouslySavedRecommendations !== null && previouslySavedRecommendations !== undefined;

    if (hasSavedRecommendation) {
        return previouslySavedRecommendations;
    }

    const newlyGeneratedUserRecommendations = await generateUserRecommendations(userID);
    try {
        await saveRecommendations(userID, newlyGeneratedUserRecommendations);
    } catch (e) {
        // do not let writing to cache failure prevent the user from getting recommendations
        console.error(e);
    }

    return newlyGeneratedUserRecommendations;
}

async function generateUserRecommendations(userID) {
    const ratedMovies = await getRatedMovies(userID);
    const favourableMovies = filterToFavourableMovies(ratedMovies);

    const favDirector = findFavouriteDirector(favourableMovies);
    const recByDirector = await getDirectorRecommendations(favDirector, ratedMovies);

    const favGenre = findFavouriteGenre(favourableMovies);
    const recByGenre = await getGenreRecommendations(favGenre, ratedMovies);

    return {
        recommendation: {
            favDirector: favDirector,
            favGenre: favGenre,
            byDirector: recByDirector,
            byGenre: recByGenre,
        }
    }
}

async function getDirectorRecommendations(favDirector, watchedMovies) {
    const moviesByDirector = await getRecommendationByDirector(favDirector);

    return filterToUnwatchedMovies(moviesByDirector, watchedMovies);
}

async function getGenreRecommendations(favGenre, watchedMovies) {
    const moviesByGenre = await getRecommendationByGenre(favGenre);

    return filterToUnwatchedMovies(moviesByGenre, watchedMovies);
}


function findFavouriteDirector(movies) {
    const directorCounter = new Map();

    for (const movie of movies) {
        incrementKey(directorCounter, movie.director);
    }

    if (directorCounter.size === 0) {
        return "";
    }

    return getHighestCountedKey(directorCounter);
}

function findFavouriteGenre(movies) {
    const genreCounter = new Map();

    for (const movie of movies) {
        for (const genre of movie.genres) {
            incrementKey(genreCounter, genre);
        }
    }

    if (genreCounter.size === 0) {
        return "";
    }

    return getHighestCountedKey(genreCounter);
}


function filterToUnwatchedMovies(allMovies, watchedMovies) {
    const unwatchedFilter = (movie) => {
        const isSameMovie = (item) => item.id === movie.id;
        const hasNotWatched = watchedMovies.find(isSameMovie) === undefined;
        return hasNotWatched;
    }

    return allMovies.filter(unwatchedFilter);
}

function filterToFavourableMovies(movies) {
    const favourableMovieFilter = (movie) => {
        return movie.userRating >= favourableMovieMinScore;
    };

    return movies.filter(favourableMovieFilter);
}

function incrementKey(map, key) {
    if (!map.has(key)) {
        map.set(key, 0);
    }

    const currentCount = map.get(key);
    map.set(key, currentCount + 1);
}

function getHighestCountedKey(map) {
    if (map.size === 0) {
        throw new Error("getHighestCountedKey should be called with a nonempty map");
    }

    let highestCount = 0;
    let highestKey = "";

    for (const item of map) {
        const key = item[0];
        const count = item[1];

        if (count > highestCount) {
            highestKey = key;
            highestCount = count;
        }
    }

    return highestKey;
}

module.exports = {
    getUserRecommendations
};