import React, { Component } from 'react'
import axios from 'axios'
import { CircleLoader } from 'react-spinners'
import UserList from '../components/UserList'
import SearchBar from '../components/SearchBar'
import LoadMoreButton from '../components/LoadMoreButton'
import { Grid } from 'react-bootstrap'

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
            loading: true,
            limit: 5,
            inputSearch: ""
        }
    }

    componentDidMount() {
        axios.get('https://api.github.com/users')
        .then(res => {
            if (res.data.length > 0)
                return res.data
        })
        .then(data => {
            this.getAllUserDetails(data)
        })
    }

    getAllUserDetails = (users) => {
        users.forEach(user => {
            axios.get('https://api.github.com/users/' + user.login)
            .then(res => {
                if (res.data)
                    return res.data
            })
            .then(data => {
                this.state.usersNotFilter.push(data)
                
                this.initUserList()
            })
        })
    }

    initUserList = () => {
        this.setState({
            users: []
        }, () => {
            var usersLimited = this.state.usersNotFilter.slice(0, this.state.limit).map((user) => {
                return user
            })
    
            this.setState({
                users: usersLimited
            })
    
            setTimeout(() => {
                    this.setState({ loading: false })
                }, 2000
            )
        })
       
    }

    initLoadMoreButton = () => {
        if(this.isEmpty(this.state.inputSearch) && this.isLimitLessThanLengthUsersNotFilter)
            return <LoadMoreButton onLoadMore={this.onLoadMore} limit={this.state.limit} />
    }

    isLimitLessThanLengthUsersNotFilter = () => {
        if(this.state.limit < this.state.usersNotFilter.length)
            return true
        
        return false
    }

    isEmpty = (value) => {
        if(value === "")
            return true
        
        return false
    }

    onLoadMore = (limit) => {
        this.setState({
            limit: limit
        }, () => {
            this.initUserList()
        })
    }

    handleSearch = (inputSearch) => {
        const users = this.state.users

        this.setState({
            users: [],
            inputSearch: inputSearch
        }, () => {
            if(inputSearch === "")
            {
                this.onLoadMore(this.state.limit)
                return
            }

            var usersFilter = users
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
                
                    <Grid align="left">
                        <UserList users={this.state.users} />
                    </Grid>

                    {this.initLoadMoreButton()}
                </div>
            )
        }

        return (
            <Grid>
                <SearchBar handleSearch={this.handleSearch}/>
                <div>ไม่พบข้อมูล</div>
            </Grid>
        )
    }
}

export default Users