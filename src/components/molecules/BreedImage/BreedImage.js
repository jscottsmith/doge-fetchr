import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'components';
import styles from './BreedImage.scss';
export default function BreedImage({ src, breed }) {
    return (
        <figure className={styles.breedImage}>
            <Image src={src} alt={`Random doge image of a ${breed}.`} />
            <figcaption>{`${breed} doge.`}</figcaption>
        </figure>
    );
}

BreedImage.propTypes = {
    breed: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};
