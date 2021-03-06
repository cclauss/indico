// This file is part of Indico.
// Copyright (C) 2002 - 2019 CERN
//
// Indico is free software; you can redistribute it and/or
// modify it under the terms of the MIT License; see the
// LICENSE file for more details.

import React from 'react';
import PropTypes from 'prop-types';

import './DimmableImage.module.scss';


export default class DimmableImage extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        content: PropTypes.node,
        hoverContent: PropTypes.node,
    };

    static defaultProps = {
        content: null,
        hoverContent: null,
    };

    render() {
        const {children, content, hoverContent} = this.props;

        return (
            <div styleName="dimmable-image">
                {children}
                <div styleName="content">
                    {content}
                </div>
                <div styleName="hover-content">
                    {hoverContent}
                </div>
            </div>
        );
    }
}
