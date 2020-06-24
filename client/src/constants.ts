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

export const COLORS = {
    PASTEL_PINK: '#ffd5e5',
    PASTEL_YELLOW: '#ffffdd',
    PASTEL_GREEN: '#a0ffe6',
    PASTEL_BLUE: '#81f5ff',
};

export const GAMEBOARD_CELL_DATA_TYPES = {
    POKEMON: 'POKEMON',
    POWER_UP: 'POWER_UP',
    BLOCKER: 'BLOCKER', // can't go through it
};

export const POKEBALL_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
