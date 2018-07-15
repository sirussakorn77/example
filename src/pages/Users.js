import React, { Component } from 'react'
import axios from 'axios'
import UserList from '../components/UserList'
import SearchBar from '../components/SearchBar'

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('https://api.github.com/users')
        .then(res => {
            if (res.data.length > 0)
                return res.data
        })
        .then(data => {
            this.setState({
                users: data
            })
        })
    }

    handleSearch = () => {

    }

    render() {
        if (this.state.users.length > 0) {
            return (
                <div>
                    <SearchBar />
                
                    <div align="left">
                        <UserList users={this.state.users} />
                    </div>
                </div>
            )
        }

        return (<div>ไม่พบข้อมูล</div>)
    }
}

export default Users