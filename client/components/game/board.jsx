/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import { imageDir } from '../constants';
import { getPegPositions } from 'state/selectors/board';
import { pegMatrix } from './peg-matrix';

class Board extends Component {
    getPosition( player, peg ) {
        const position = ( 'opponent' === player ) ? this.props.positions.opponent[ peg ] : this.props.positions.player[ peg ],
            style = { top: 0, left: 0 }
        if ( -1 === position ) {
            style.left = 34;
            style.top = ( 'opponent' === player ) ? 4 : 25;
        } else {
            const matrixPosition = pegMatrix[ player ][ position ];
            style.left = matrixPosition[0];
            style.top = matrixPosition[1];
        }
        return style;
    }

    render() {
        const boardSrc = imageDir + 'board.gif',
            pegPlayerSrc = imageDir + 'peg-player.gif',
            pegOpponentSrc = imageDir + 'peg-opponent.gif';
        return (
            <div className="board">
                <img src={ boardSrc } width="700" />
                <img
                    className="peg peg0 player"
                    src={ pegPlayerSrc }
                    style={ this.getPosition( 'player', 0 ) }
                />
                <img
                    className="peg peg1 player"
                    src={ pegPlayerSrc }
                    style={ this.getPosition( 'player', 1 ) }
                />
                <img
                    className="peg peg0 opponent"
                    src={ pegOpponentSrc }
                    style={ this.getPosition( 'opponent', 0 ) }
                />
                <img
                    className="peg peg1 opponent"
                    src={ pegOpponentSrc }
                    style={ this.getPosition( 'opponent', 1 ) }
                />
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            positions: getPegPositions( state )
        }
    }
)( Board );