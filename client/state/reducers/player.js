/**
 * Internal Dependencies
 */
import {
    CONTROLLER_CUT_CARD,
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS,
    PLAYER_ACCEPTS_OWN_SCORE,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE,
    PLAYER_PLAYS,
    PLAYER_GO,
    CONTROLLER_COMPLETE_PLAY
} from '../action-types';

export const defaultState = {
    hand: [],
    peggingHand: [],
    crib: [],
    score: 0,
    initialDraw: []
};

const player = ( state = defaultState, action ) => {
    let newHand, newState, newCrib, newPeggingHand;
    switch ( action.type ) {
        case CONTROLLER_COMPLETE_PLAY:
            if ( action.person === 'Player' ) {
                return Object.assign( {}, state, { score: state.score + action.points } );
            }
            return state;
        case PLAYER_GO:
            return Object.assign( {}, state, { score: state.score + action.points } );
        case PLAYER_PLAYS:
            newPeggingHand = state.peggingHand.filter( ( card ) => {
                if ( card.name === action.card.name && card.suit === action.card.suit ) {
                    return false;
                }
                return true;
            } );
            return Object.assign( {}, state, { peggingHand: newPeggingHand, score: state.score + action.points } );
        case CONTROLLER_CUT_CARD:
            return Object.assign( {}, state, { peggingHand: state.hand.slice(0) } );
        case CONTROLLER_HIS_HEALS:
        case PLAYER_ACCEPTS_CRIB_SCORE:
            if ( action.person === 'Player' ) {
                return Object.assign( {}, state, { score: state.score + action.points } );
            }
            return state;
        case PLAYER_ACCEPTS_OWN_SCORE:
            return Object.assign( {}, state, { score: state.score + action.points } );
        case OPPONENT_DISCARDS:
            if ( 'Player' === action.dealer ) {
                newCrib = state.crib.slice();
                newCrib.splice( 0, 0, action.cards[0], action.cards[1] );
                return Object.assign( {}, state, { crib: newCrib } );
            }
            return state;
        case PLAYER_DISCARDS:
            newHand = state.hand.slice();
            newState = {
                hand: newHand.filter( ( card, index ) => {
                    return ! action.cardIndexes.includes( index );
                } )
            };
            if ( 'Player' === action.dealer ) {
                newState.crib = action.cards;
            }
            return Object.assign( {}, state, newState );
        case CONTROLLER_DEALS_CARD_TO_PLAYER:
            newHand = state.hand.slice();
            newHand.splice( 0, 0, action.card );
            return Object.assign( {}, state, { hand: newHand } );
        case CONNTROLLER_RESET_DECK:
            return Object.assign( {}, state, { initialDraw: [], hand: [], crib: [] } );
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { initialDraw: [ action.card ] } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default player;