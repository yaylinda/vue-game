export const VUE_GAME_SESSION_COOKIE_STR: string = 'Vue-Game-Session-Cookie';

export const FIRESTORE_COLLECTIONS = {
    SESSION_COOKIES: 'sessionCookies',
    PLAYERS: 'players',
    GAMES: 'games',

    POKEMON_REGISTRY: 'pokemonRegistry', // pokemonName -> imageUrl
    POKEMON_SWIPES: 'pokemonSwipes', // pokemonName -> sessionCookie -> count
    SESSION_COOKIE_SWIPES: 'sessionCookieSwipes', // sessionCookie -> pokemonName -> count
};