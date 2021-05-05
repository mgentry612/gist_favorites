import React from 'react';
import { FaStar } from 'react-icons/fa';
import { request, gql } from 'graphql-request'

class ViewDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gist: null
        };

        this.getDetails = this.getDetails.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setFavorite = this.setFavorite.bind(this);
    }

    componentDidMount() {
        this.getDetails();
    }

    async getDetails() {
      const query = gql`
        {
            details(gist_id: "${ this.props.gist_id }") {
                description
                created_at
                gist_id
                is_favorite
                files
            }
        }
      `
        
        const data = await request('http://localhost:3001/gists/', query);
        this.setState({gist:data.details});
    }

    async setFavorite() {

        if (this.state.gist) {
            const is_favorite = !this.state.gist.is_favorite;
            const query = gql`
                mutation {
                    favorite(gist_id: "${ this.props.gist_id }", is_favorite: ${ is_favorite })
              }
            `
            const success = await request('http://localhost:3001/gists/', query);

            if (!success) {
                return;
            }

            const gist = this.state.gist;
            gist.is_favorite = is_favorite;
            this.setState({gist});
        }

    }

    render() {
        const gist = this.state.gist;
        let display;
        if (gist !== null) {

            // Favorite
            let star = '';
            if (gist.is_favorite) {
                star = <span><FaStar /> </span>
            }

            // Files
            let files = '';
            if (gist.files) {
                files = gist.files.map((item, idx) => {
                    return (
                        <li key={item}>
                            {item}
                        </li>
                    );
                });
                files = <ul>
                    {files}
                </ul>
            }

            display = <div>
                    {star}
                    <div>ID:</div>
                    {gist.gist_id}
                    <div>Created Date:</div>
                    {gist.created_at}
                    <div>Description:</div>
                    {gist.description}
                    <div>Files:</div>
                    {files}
                </div>
        } else {
            display = <div>
                    Loading...
                </div>
        }

        return (
            <div>
                <button onClick={this.props.backClicked}>
                    Back
                </button>
                <button onClick={this.setFavorite}>
                    Set Favorite
                </button>
                {display}
            </div>
        );
    }
}

export default ViewDetails;
