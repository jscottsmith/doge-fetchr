import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.scss';

export default function Button({
    primary,
    secondary,
    onClick,
    children,
    className,
}) {
    return (
        <button
            onClick={onClick}
            className={cx(styles.button, {
                [className]: className,
                [styles.primary]: primary,
                [styles.secondary]: secondary,
            })}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
};
