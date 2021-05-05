import React from 'react';
import { FaStar } from 'react-icons/fa';
import { request, gql } from 'graphql-request'

class ViewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewingFavorites: false,
            gists: [],
        };

        this.viewFavorites = this.viewFavorites.bind(this);
    }

    componentDidMount() {
        this.getSummaries();
    }

    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            console.log('componentDidUpdate');
            this.getSummaries();
        }
    }

    async getSummaries() {
        console.log(this.props);
        const query = gql`
          {
              summaries(username: "${ this.props.username }") {
                  summaries {
                    description
                    created_at
                    gist_id
                    is_favorite
                  }
              }
          }
        `
          
          const data = await request('http://localhost:3001/gists/', query);
        //   this.props.onListChange(data.summaries.summaries);
          this.setState({gists: data.summaries.summaries});
    }

    viewFavorites () {
        this.setState({viewingFavorites: !this.state.viewingFavorites});
    }

    render() {
        console.log(this.props);
        let gists = this.state.gists;
        let back = '';
        if (this.state.viewingFavorites) {
            gists = gists.filter((item) => {
                return item.is_favorite;
            });
            back = <button onClick={this.props.backClicked}>
                Back
            </button>
        }
        const buttons = gists.map((item, idx) => {
            let star = '';
            if (item.is_favorite) {
                star = <span><FaStar /> </span>
            }
            return (
                <li key={item.gist_id} onClick={() => this.props.viewDetails(item)}>
                    {star}
                    {item.gist_id}<br/>
                    {item.created_at}<br/>
                    {item.description}
                </li>
            );
        });

        return (
            <div>
                <button onClick={this.viewFavorites}>
                    Toggle Favorites
                </button>
                <ul>{buttons}</ul>
            </div>
        );
    }
}

export default ViewList;
