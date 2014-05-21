/** @jsx React.DOM */
(function(AwsumApp) {
  AwsumApp.viewClasses.UserListItem  = React.createClass({
    render: function() {
      return (
        <li>{this.props.user}</li>
      )
    }
  });

  // Select box where we will choose a user's page to view.
  // We first make a call to the server to get all users
  // which is passed to this.props.url when the component is defined
  AwsumApp.viewClasses.UserSelectBox = React.createClass({
    componentWillMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
      var userNodes;
      if (this.state && this.state.data) {
        userNodes = this.state.data.map(function (user) {
          var UserListItem = AwsumApp.viewClasses.UserListItem;
          return <UserListItem user={user.username} />;
        });
      } else {
        userNodes = null;
      }

      return (
        <div className="user-select-box">
          <h1>Select a user</h1>
          <ul className="user-list">
            {userNodes}
          </ul>
        </div>
      )
    }
  });
})(AwsumApp);
