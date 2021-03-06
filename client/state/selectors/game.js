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

export const getPeggingCards = ( state ) => {
    return get( state, 'game.peggingCards' );
};

export const isPegging = ( state ) => {
    return (
        ! isEmpty( state.game.peggingCards ) ||
        ! isEmpty( state.player.peggingHand ) ||
        ! isEmpty( state.opponent.peggingHand )
    );
};

export const getPlayValue = ( state ) => {
    return getPeggingCards( state ).reduce( ( sum, card ) => {
        if ( card ) {
            return sum + card.value;
        }
        return sum;
    }, 0 );
};

export const getPlaySequence = ( state ) => {
    return getPeggingCards( state ).filter( ( card ) => {
        return !!( card );
    } );
};

export const getLastCardPlayed = ( state ) => {
    const sequence = getPlaySequence( state );
    if ( sequence.length === 0 ) {
        return null;
    }
    return sequence[ 0 ];
};

export const getPreviousPlayer = ( state ) => {
    return get( state, 'game.previousPlayer' );
};

export const getPreviousPlay = ( state ) => {
    return get( state, 'game.previousPlay' );
};

export const canPersonPlay = ( state, person ) => {
    const peggingCards = get( state, person + '.peggingHand' ),
        playValue = getPlayValue( state );
    if ( isEmpty( peggingCards ) ) {
        return false;
    }
    return peggingCards.some( ( card ) => {
        return card.value + playValue <= 31;
    } );
};

export const isPlayComplete = ( state ) => {
    return ( getPeggingCards( state ).length === 8 );
};