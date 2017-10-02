import React, { Component } from 'react';
import { capitalize } from 'utils';
import { Fetch, BreedImage, Loader } from 'components';
import PropTypes from 'prop-types';
import styles from './BreedFetcher.scss';

export default class BreedFetcher extends Component {
    static propTypes = {
        breedsToFetch: PropTypes.array.isRequired,
    };

    render() {
        const { breedsToFetch } = this.props;
        const hasBreeds = breedsToFetch.length > 0;

        return (
            <section className={styles.breedFetcher}>
                {hasBreeds && (
                    <header className={styles.header}>
                        <h2>Displaying {breedsToFetch.length} breeds.</h2>
                    </header>
                )}
                {hasBreeds &&
                    breedsToFetch.map(breed => (
                        <Fetch
                            cache={false}
                            key={`${breed}`}
                            endpoint={`/breed/${breed}/images/random`}
                        >
                            {({ data: src }) =>
                                src ? (
                                    <BreedImage
                                        breed={capitalize(breed)}
                                        src={src}
                                    />
                                ) : (
                                    <Loader />
                                )}
                        </Fetch>
                    ))}
            </section>
        );
    }
}
