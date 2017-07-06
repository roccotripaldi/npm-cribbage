/**
 * External Dependencies
 */
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export const getDeck = ( state ) => {
    return get( state, 'game.deck' );
};

export const isInitialized = ( state ) => {
    return ! isEmpty( get( state, 'game.deck' ) );
};

export const getDealer = ( state ) => {
    return get( state, 'game.dealer' );
};

export const getCutCard = ( state ) => {
    return get( state, 'game.cutCard' );
};

export const getScore = ( state, type ) => {
    return get( state, 'game.' + type );
};

export const getWinner = ( state ) => {
    return get( state, 'game.winner' );
}
