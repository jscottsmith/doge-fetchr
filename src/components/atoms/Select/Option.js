import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Options.scss';
import cx from 'classnames';

export default class Option extends Component {
    static propTypes = {
        allowFocus: PropTypes.bool.isRequired, // allows focus of option
        id: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
        handleFocus: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        selectId: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired, // current selected value
        focused: PropTypes.bool.isRequired, // current focused value
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    constructor(props) {
        super(props);
        this.bindHandlerValues();
    }

    componentDidUpdate(prevProps) {
        const { value, label, selectId, index, focused } = this.props;

        // set focus
        if (prevProps.focused !== focused && focused) {
            this.option.focus();
        }

        // update handler with new values
        if (
            value !== prevProps.value ||
            label !== prevProps.label ||
            selectId !== prevProps.selectId ||
            index !== prevProps.index
        ) {
            this.bindHandlerValues();
        }
    }

    bindHandlerValues() {
        // bind the value to the click handler

        this.handleClick = this.props.handleClick.bind(this, {
            id: this.props.selectId,
            index: this.props.index,
            label: this.props.label,
            value: this.props.value,
        });
    }

    render() {
        const {
            id,
            allowFocus,
            handleFocus,
            index,
            label,
            selected,
            value,
        } = this.props;
        const { handleClick } = this;
        const className = cx(styles.option, {
            [styles.selected]: selected,
        });
        return (
            <button
                id={`${id}-option-${index}-${value}`}
                ref={ref => (this.option = ref)}
                aria-label={label}
                aria-selected={selected}
                className={className}
                onClick={handleClick}
                onFocus={handleFocus}
                role="option"
                tabIndex={allowFocus ? 0 : -1}
            >
                {label}
            </button>
        );
    }
}
