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
                        <div>
                            Name: {user.name? user.name : "-"}
                        </div>
                        <div>
                            URL: <a href={user.url}>{user.url}</a>
                        </div>
                        <div>
                            Public_Repos: {user.public_repos}
                        </div>
                        <div>
                            Company: {user.company? user.company : "-"}
                        </div>
                        <div>
                            Bio: {user.bio? user.bio : "-"}
                        </div>followers
                        <div>
                            Followers: {user.followers? user.followers : "-"}
                        </div>
                    </div>
                    <br/>
                </div>
            )

            return userList
        }
    }
}

export default UserList