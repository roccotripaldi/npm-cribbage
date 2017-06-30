/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import { isInitialized } from 'state/selectors/game';
import { isPaused } from 'state/selectors/controller';
import { resetGame, toggleTimer } from 'state/actions/controller';

class Menu extends Component {

    handleReset = ( event ) => {
        event.preventDefault();
        this.props.resetGame();
    };

    handlePauseToggle = ( event ) => {
        event.preventDefault();
        this.props.toggleTimer();
    };

    renderPauseButton() {
        const label = ( this.props.paused ) ? 'Resume' : 'Pause'
        return <a className="menu__debug" onClick={ this.handlePauseToggle }>{ label }</a>;
    }
    renderResetButton() {
        if ( ! this.props.isInitialized ) {
            return null;
        }
        return <a className="menu__reset" onClick={ this.handleReset }>Reset Game</a>;
    }
    render() {
        return (
            <div className="menu">
                { this.renderPauseButton() }
                { this.renderResetButton() }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            isInitialized: isInitialized( state ),
            paused:  isPaused( state )
        }
    },
    {
        toggleTimer,
        resetGame
    }
)( Menu );