import React from 'react';
import { Loader } from 'components';
import PropTypes from 'prop-types';

export default function Image({ src, alt }) {
    return <img src={src} alt={alt} />;
}

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};
