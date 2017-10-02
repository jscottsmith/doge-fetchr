import React, { Component } from 'react';
import { App, Fetch, Loader } from 'components';
import styles from './AppContainer.scss';

export default class AppContainer extends Component {
    render() {
        return (
            <Fetch endpoint="/breeds/list">
                {({ data }) =>
                    // wait for data before rendering.
                    // should show a loader or something here
                    data ? (
                        <App breeds={data} />
                    ) : (
                        <Loader className={styles.rootLoader} />
                    )}
            </Fetch>
        );
    }
}
