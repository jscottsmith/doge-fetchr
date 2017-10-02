import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Option } from 'components';
import { modulo } from 'utils';
import styles from './Select.scss';
import cx from 'classnames';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            })
        ),
        value: PropTypes.string,
    };

    static defaultProps = {
        label: 'Select',
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedOption: {
                value: props.value,
                label: props.value,
            },
            focusedIndex: 0, // index to manage focus
        };
    }

    componentWillReceiveProps(nextProps) {
        // update the selected option when
        // receiving a new value from props
        if (nextProps.value !== this.props.value) {
            let selectedOption = {
                value: null,
                label: null,
            };

            if (nextProps.value) {
                selectedOption = this.props.options.find(
                    option => option.value === nextProps.value
                );
            }
            this.setState(() => ({
                selectedOption,
            }));
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOffClick);
    }

    addListeners = () => {
        window.addEventListener('click', this.handleOffClick, false);
        window.addEventListener('keyup', this.handleKeyUp, false);
    };

    removeListeners = () => {
        window.removeEventListener('click', this.handleOffClick, false);
        window.removeEventListener('keyup', this.handleKeyUp, false);
    };

    handleClick = event => {
        event.stopPropagation();
        event.preventDefault();

        if (this.state.isOpen) {
            this.hideOptions();
        } else {
            this.showOptions();
        }
    };

    handleOffClick = event => {
        const isEventTargetSelect =
            event.target === this.select || this.select.contains(event.target);

        if (isEventTargetSelect) {
            return;
        }

        this.hideOptions();
    };

    handleSelect = (option, event) => {
        event.stopPropagation();
        event.preventDefault();

        // const { value, label, index } = option;

        this.setState({
            selectedOption: option,
            isOpen: false,
        });

        this.hideOptions();

        this.props.onChange(option);
    };

    showOptions = () => {
        if (!this.state.isOpen) {
            this.setState(
                {
                    isOpen: true,
                    focusedIndex: this.state.selectedOption.index || 0,
                },
                this.addListeners
            );
        }
    };

    hideOptions = () => {
        this.setState(
            {
                isOpen: false,
            },
            this.removeListeners
        );
    };

    handleKeyDown = event => {
        let focusedIndex = this.state.focusedIndex;

        switch (event.which) {
            case 27: // escape
                this.setState({
                    isOpen: false,
                });
                break;
            case 32: // space
                event.preventDefault();
                event.stopPropagation();

                if (this.state.isOpen) {
                    event.target.click();
                } else {
                    this.showOptions();
                }
                break;

            case 37: // left arrow
            case 38: // up arrow
                focusedIndex--;
                break;

            case 39: // right arrow
            case 40: // down arrow
                focusedIndex++;
                break;

            default:
            // no default
        }

        if (this.state.focusedIndex !== focusedIndex) {
            const actualIndex = modulo(focusedIndex, this.props.options.length);

            this.setState({
                focusedIndex: actualIndex,
            });

            event.preventDefault();
            event.stopPropagation();
        }
    };

    handleKeyUp = () => {
        // check if focused element is an option of the
        // current select box -- if not, close the select
        const activeEl = document.activeElement;

        const { id } = this.props;

        const isId = activeEl.id === id;
        const containsId = activeEl.id.indexOf(id) >= 0;

        if (!isId && !containsId) {
            this.hideOptions();
        }
    };

    get label() {
        const { isOpen, selectedOption } = this.state;

        if (isOpen || !selectedOption.value) {
            return this.props.label;
        }

        return selectedOption.label || this.props.label;
    }

    render() {
        const { label, options, id, className } = this.props;
        const { selectedOption, isOpen, focusedIndex } = this.state;
        const rootClass = cx(styles.select, {
            [styles.isOpen]: isOpen,
            [styles.hasValue]: selectedOption.value,
            [className]: className,
        });

        return (
            <div
                aria-activedescendant={selectedOption.value}
                aria-expanded={isOpen}
                aria-label={label}
                className={rootClass}
                id={id}
                onFocus={this.showOptions}
                onKeyDown={this.handleKeyDown}
                ref={ref => (this.select = ref)}
                role="listbox"
                tabIndex="0"
            >
                <button
                    aria-label={label}
                    className={styles.label}
                    onMouseDown={this.handleClick}
                    onTouchStart={this.handleClick}
                    tabIndex="-1"
                >
                    {this.label}
                </button>
                <div className={styles.options}>
                    {options.map(({ label, value }, i) => (
                        <Option
                            allowFocus={i === focusedIndex && isOpen}
                            focused={i === focusedIndex}
                            handleClick={this.handleSelect}
                            handleFocus={this.showOptions}
                            id={id}
                            index={i}
                            key={`option-${i}`}
                            label={label}
                            selected={selectedOption.value === value}
                            selectId={id}
                            value={value}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
