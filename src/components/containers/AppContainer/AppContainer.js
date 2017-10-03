import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { App, Fetch, Loader } from 'components';
import styles from './AppContainer.scss';
import { connect } from 'react-redux';

class AppContainer extends Component {
    static propTypes = {
        appState: PropTypes.shape({
            title: PropTypes.string.isRequired,
            copy: PropTypes.string.isRequired,
        }),
    };

    render() {
        const { appState } = this.props;
        return (
            <Fetch endpoint="/breeds/list">
                {({ data }) =>
                    // wait for fetched data before rendering.
                    data ? (
                        <App breeds={data} appState={appState} />
                    ) : (
                        <Loader className={styles.rootLoader} />
                    )}
            </Fetch>
        );
    }
}

function mapStateToProps({ app }) {
    return {
        appState: app,
    };
}

export default connect(mapStateToProps)(AppContainer);
