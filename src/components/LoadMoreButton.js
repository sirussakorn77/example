import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class LoadMoreButton extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    handleButtonClick = () => {
        this.props.onLoadMore(this.props.limit + 5)
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleButtonClick} bsStyle="primary">Load More</Button>
            </div>
        )
    }
}

export default LoadMoreButton