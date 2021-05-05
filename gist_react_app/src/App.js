import React from 'react';
import Form from './Form';
import ViewList from './ViewList';
import ViewDetails from './ViewDetails';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        gists: [],
        currentPage: null,
        currentGist: null,
        username: null,
      };

      this.onListChange = this.onListChange.bind(this);
      this.backClicked = this.backClicked.bind(this);
      this.viewDetails = this.viewDetails.bind(this);
      this.viewSummaries = this.viewSummaries.bind(this);
  }

  onListChange (username) {
    this.setState({
      username: username,
      currentPage: 'viewList',
    });
  }

  backClicked () {
    this.setState({currentPage: 'viewList'});
  }

  viewDetails (item) {
    console.log(item);
    this.setState({
      currentGist: item.gist_id,
      currentPage: 'viewDetails'
    });
  }

  viewSummaries (username) {
    console.log(username);
    this.setState({
      username: username,
      currentPage: 'viewList',
    });
  }

  render() {
      const currentPage = this.state.currentPage;
      let display = '';
      if (currentPage == 'viewList') {
        display = <ViewList currentPage={'viewList'} username={this.state.username} viewDetails={this.viewDetails}/>
      } else if (currentPage == 'viewDetails') {
        display = <ViewDetails gist_id={this.state.currentGist} backClicked={this.backClicked}/>
      }
      return (
        <div className="App">
          <header className="App-header">
          </header>
          <Form onListChange={this.onListChange} viewSummaries={this.viewSummaries}/>
          {display}
        </div>
      );
  }
}

export default App;
