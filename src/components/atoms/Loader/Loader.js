import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Loader.scss';

export default function Loader({ className }) {
    return (
        <span className={cx(styles.loader, { [className]: className })}>
            🐶
        </span>
    );
}

Loader.propTypes = {
    className: PropTypes.string,
};
