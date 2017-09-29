import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch as fetchAction } from '../../actions';

// This component is meant to wrap a component that
// requires data from an api. It gets requests from
// the store then checks to see whether the request
// being made already exists. If it does not it will
// dispatch an action that fetches the appropriate
// endpoint, then the data is passed to the children
// via a render callback.
//
// This would be more useful in an app with routing
// but should also be a helpful pattern with a simple
// app too.

class Fetch extends Component {
    static propTypes = {
        api: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        endpoint: PropTypes.string.isRequired,
        fetchAction: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
    };

    static defaultProps = {
        api: 'https://dog.ceo/api',
        endpoint: '',
    };

    componentWillMount() {
        const { api, endpoint, requests } = this.props;

        // Dispatch our action with the endpoint to fetch from.
        const url = `${api}${endpoint}`;

        // check to see if the request has
        // already been made during this session
        // if it has return early and don't fetch
        if (requests[url]) {
            console.warn('Cached request from', url);
            return;
        }

        this.props.fetchAction(url);
    }

    getRequest() {
        const { api, endpoint, requests } = this.props;
        const url = `${api}${endpoint}`;

        return requests[url] || false;
    }

    render() {
        return this.props.children({ data: this.getRequest() });
    }
}

const mapStateToProps = ({ requests }) => {
    return {
        requests,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAction: url => dispatch(fetchAction(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);
