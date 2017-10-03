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

        // an array of selects to map over filled with objects and
        // a corresponding id that will be associated with the select
        const selects = Array.from(
            Array(props.selectorAmount)
        ).map((select, i) => ({ id: `breed-${i}`, value: null }));

        this.state = {
            breeds: props.breeds,
            selects,
        };
    }

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
        const { breeds, selects } = this.state;
        const { selectorAmount } = this.props;
        const showClear = this.shouldShowClear();
        const hasBreeds = this.hasSelectedBreeds();

        return (
            <section className={styles.breedSelector}>
                <header className={styles.header}>
                    <h3>Select {selectorAmount} breeds:</h3>
                </header>

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
                <div className={styles.buttonContainer}>
                    {hasBreeds && (
                        <Button onClick={this.handleFindBreeds}>
                            Find Breeds
                        </Button>
                    )}
                    {showClear && (
                        <Button onClick={this.handleClear} secondary>
                            Clear Selected
                        </Button>
                    )}
                </div>
            </section>
        );
    }
}
