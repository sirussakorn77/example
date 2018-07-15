import React, { Component } from 'react'

class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: this.props.users
        }
    }

    render() {
        if(this.state.users.length > 0)
        {
            const userList = this.state.users.map((user) => 
                <div key={user.id}>
                    <div>
                        <img src={user.avatar_url} alt="" height="42" width="42" />
                    </div>
                    <div>
                        <a href={user.url}>{user.url}</a>
                    </div>
                </div>
            )

            return userList
        }
    }
}

export default UserList