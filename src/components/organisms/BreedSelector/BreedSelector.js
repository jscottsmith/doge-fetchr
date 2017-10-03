import React, { Component } from 'react';
import { Select, Button } from 'components';
import { toOrdinalNumber } from 'utils';
import PropTypes from 'prop-types';
import styles from './BreedSelector.scss';

export default class BreedSelector extends Component {
    static propTypes = {
        breeds: PropTypes.array.isRequired,
        selectorAmount: PropTypes.number.isRequired,
        handleSearch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selectorAmount: 3,
    };

    constructor(props) {
        super(props);

        const { selectorAmount, breeds } = props;

        this.state = {
            breeds,
            selectorAmount,
            selects: this.getInitialSelectState(selectorAmount),
        };
    }

    getInitialSelectState(selectorAmount) {
        // an array of selects to map over filled with objects and
        // a corresponding id that will be associated with the select
        const selects = Array.from(Array(selectorAmount)).map((select, i) => ({
            id: `breed-${i}`,
            value: null,
        }));

        return selects;
    }

    getAmountOptions() {
        const MAX = 10;

        const options = Array.from(Array(MAX)).map((x, i) => {
            const value = i + 1;
            return {
                label: value.toString(),
                value,
            };
        });

        return options;
    }

    handleAmountChange = ({ value: selectorAmount }) => {
        this.setState(() => ({
            selectorAmount,
            selects: this.getInitialSelectState(selectorAmount),
        }));
    };

    handleFindBreeds = () => {
        const { selects } = this.state;

        // reduce selects into all currently selected values
        const values = selects.reduce((a, b) => [...a, b.value], []);

        this.props.handleSearch(values);
    };

    handleClear = () => {
        const { selects } = this.state;
        const { breeds } = this.props;

        const nextSelects = selects.map(select => {
            select.value = null;
            return select;
        });

        this.setState(() => ({ selects: nextSelects, breeds }));

        // clears any searched values as well
        this.props.handleSearch();
    };

    handleSelectChange = ({ value, id }) => {
        const { selects } = this.state;

        // get the index of the select id
        const index = selects.findIndex(select => select.id === id);

        // copy then replace select object with updated select
        const nextSelects = [...selects];
        nextSelects.splice(index, 1, {
            id,
            value,
        });

        this.setState(
            () => ({
                selects: nextSelects,
            }),
            this.filterActiveBreeds
        );
    };

    filterActiveBreeds() {
        const { selects } = this.state;
        const { breeds } = this.props;

        // filter ALL selected breed values from initial breed
        // list so that they cannot be selected again
        const nextBreeds = breeds.filter(
            breed => !selects.find(select => select.value === breed)
        );

        this.setState(() => ({
            breeds: nextBreeds,
        }));
    }

    shouldShowClear() {
        const { selects } = this.state;

        // check for any existing values
        const showClear = selects.some(select => select.value !== null);

        return showClear;
    }

    hasSelectedBreeds() {
        const { selects } = this.state;

        // check for any missing select values
        const missingValues = selects.some(select => select.value === null);
        const hasBreeds = !missingValues;

        return hasBreeds;
    }

    render() {
        const { breeds, selects, selectorAmount } = this.state;

        const showClear = this.shouldShowClear();
        const hasBreeds = this.hasSelectedBreeds();

        return (
            <section className={styles.breedSelector}>
                <div className={styles.container}>
                    <h3 className={styles.header}>
                        How many breeds would you like to find?
                    </h3>
                    <Select
                        id="number-of-breeds"
                        label="Number of Breeds to find"
                        value={selectorAmount}
                        onChange={this.handleAmountChange}
                        className={styles.select}
                        options={this.getAmountOptions()}
                    />
                </div>

                <div className={styles.container}>
                    <h3 className={styles.header}>
                        Ok, select {selectorAmount} breeds:
                    </h3>
                    {selects.map(({ id, value }, i) => (
                        <Select
                            key={id}
                            id={id}
                            label={`Select ${toOrdinalNumber(i + 1)} breed`}
                            value={value}
                            onChange={this.handleSelectChange}
                            className={styles.select}
                            options={breeds.map(breed => ({
                                label: breed,
                                value: breed,
                            }))}
                        />
                    ))}
                </div>

                <div className={styles.container}>
                    {hasBreeds && (
                        <Button
                            onClick={this.handleFindBreeds}
                            className={styles.button}
                        >
                            Find Breeds
                        </Button>
                    )}
                    {showClear && (
                        <Button
                            onClick={this.handleClear}
                            className={styles.button}
                            secondary
                        >
                            Clear Selected
                        </Button>
                    )}
                </div>
            </section>
        );
    }
}
