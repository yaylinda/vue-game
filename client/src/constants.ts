export const VUE_GAME_SESSION_COOKIE_STR: string = 'Vue-Game-Session-Cookie';
export const VUE_GAME_SESSION_DATA_STR: string = 'Vue-Game-Session-Data';

export const FIRESTORE_COLLECTIONS = {
    SESSION_COOKIES: 'sessionCookies',
    SWIPES: 'swipes', 

    PLAYERS: 'players',
    GAMES: 'games',
    
    POKEMON_SWIPES: 'pokemonSwipes', // pokemonName -> sessionCookie -> count
    SESSION_COOKIE_SWIPES: 'sessionCookieSwipes', // sessionCookie -> pokemonName -> count
};

export const POKEAPI_BASE_URL: string = 'https://pokeapi.co/api/v2/pokemon';

export const MAX_POKEMON_INDEX: number = 808; // 807 + 1