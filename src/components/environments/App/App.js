import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';

export default class App extends Component {
    static propTypes = {
        breeds: PropTypes.array.isRequired,
    };

    render() {
        const { breeds } = this.props;
        return (
            <div className={styles.app}>
                <h1>Hello 👋🏻 Doge 🐶</h1>
                <h2>Breeds:</h2>
                <ul>
                    {breeds.map((breed, i) => (
                        <li key={`breed-${i}`}>{breed}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
