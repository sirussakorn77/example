import React, { Component } from 'react'
import axios from 'axios'
import { CircleLoader } from 'react-spinners'
import UserList from '../components/UserList'
import SearchBar from '../components/SearchBar'

const styles = {
    spinner: {
        justifyContent: 'center'
    }
}

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            usersNotFilter: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('https://api.github.com/users')
        .then(res => {
            if (res.data.length > 0)
                return res.data
        })
        .then(data => {
            this.GetAllUserDetails(data)
        })
    }

    GetAllUserDetails = (users) => {
        users.forEach(user => {
            axios.get('https://api.github.com/users/' + user.login)
            .then(res => {
                if (res.data)
                    return res.data
            })
            .then(data => {
                this.state.usersNotFilter.push(data)
                
                this.setState({
                    users: this.state.usersNotFilter
                })

                setTimeout(() => {
                        this.setState({ loading: false })
                    }, 1000
                )
            })
        })
    }

    handleSearch = (inputSearch) => {
        this.setState({
            users: []
        }, () => {
            if(inputSearch === "")
            {
                this.setState({users: this.state.usersNotFilter})
                return
            }

            var usersFilter = this.state.usersNotFilter
            usersFilter = usersFilter.filter((user) => {
                return user.name && (user.name.toLowerCase()).search(inputSearch.toLowerCase()) !== -1
            });

            this.setState({users: usersFilter})
        })
    }

    render() {
        if (this.state.loading)
            return (
                <div className='sweet-loading' style={styles.spinner}>
                    <CircleLoader
                    color={'#123abc'}
                    loading={this.state.loading}
                /></div>
            )

        if (this.state.users.length > 0) {
            return (
                <div>
                    <SearchBar handleSearch={this.handleSearch}/>
                
                    <div align="left">
                        <UserList users={this.state.users} />
                    </div>
                </div>
            )
        }

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch}/>
                <div>ไม่พบข้อมูล</div>
            </div>
        )
    }
}

export default Users