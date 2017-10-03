import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BreedSelector, BreedFetcher } from 'components';
import styles from './App.scss';

export default class App extends Component {
    static propTypes = {
        breeds: PropTypes.array.isRequired,
        appState: PropTypes.object.isRequired,
    };

    state = {
        breedsToFetch: [],
    };

    handleSeach = (breedsToFetch = []) => {
        // takes the array of breeds provided by the
        // BreedSelector and sets the values to state
        // for the BreedFetchr to create each request

        this.setState(() => ({
            breedsToFetch,
        }));
    };

    render() {
        const { breedsToFetch } = this.state;
        const { breeds, appState } = this.props;
        const { title, copy } = appState;

        return (
            <main className={styles.app}>
                <header className={styles.header}>
                    <h1>{title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: copy }} />
                </header>
                <BreedSelector
                    breeds={breeds}
                    handleSearch={this.handleSeach}
                />
                <BreedFetcher breedsToFetch={breedsToFetch} />
            </main>
        );
    }
}
