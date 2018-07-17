import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
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
                <div key={user.id} >
                    <Row className="show-grid">
                        <Col xs={3}>
                            <img src={user.avatar_url} alt="" height="100" width="100" />
                        </Col>
                        <Col xs={9}>
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
                        </Col>
                    </Row>
                    <br/>
                </div>
            )

            return userList
        }
    }
}

export default UserList