import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: "",
            users: this.props.users
        }
    }

    render() {
        return (
            <div>
                ค้นหา : <input 
                            type="text" 
                            value={this.state.searchInput} 
                            onChange={(event) => {
                                this.setState({
                                    searchInput: event.target.value
                                }, () => { console.log(this.state.searchInput) })
                            }}
                        />
            </div>
        )
    }
}

export default SearchBar