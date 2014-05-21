/** @jsx React.DOM */
(function(AwsumApp) {
  var UserPage,
      UserPageControlPanel,
      UserPageListBox,
      UserPageList,
      UserPageListItem,
      SelectUserBox,
      SelectUserListItem;

  // Utility function; makes an AJAX request and returns the data
  // to the component, setting a key on its properties to the data object
  function setPropsWithAJAXData(desiredKey, url) {
    if (!desiredKey) desiredKey = "data";
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        var props = {};
        props[desiredKey] = data;
        this.setProps(props);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  // Page for /user/:id
  AwsumApp.viewClasses.UserPage = React.createClass({
    // Get our user's data with AJAX
    componentWillMount: function() {
      setPropsWithAJAXData.call(this, 'data', this.props.url);
    },
    render: function() {
      var listsData = null;
      if (this.props && this.props.data) {
        listsData = this.props.data.lists;
      }

      // need loop inside this one

      return (
        <h1 className="user-title">{this.props.username}</h1>,
        <UserPageListBox lists={listsData} />
      )
    }
  });

  // Box that holds individual lists for users
  AwsumApp.viewClasses.UserPageListBox = React.createClass({
    render : function() {
      var listNodes;
      if (this.props && this.props.lists) {
        listNodes = this.props.lists.map(function (list) {
          return <UserPageList url={"/list/" + list.id} name={list.name} id={list.id} />;
        });
      }

      return (
        <div className="user-list-box">
          {listNodes}
        </div>
      )
    }
  });

  // Individual lists that hold links, inside of UserPageListBox
  AwsumApp.viewClasses.UserPageList = React.createClass({
    // Get this list's links
    componentWillMount: function() {
      setPropsWithAJAXData.call(this, 'data', this.props.url);
    },
    render : function() {
      var linkNodes = null;
      if (this.props && this.props.data) {
        linkNodes = this.props.data.links.map(function (link) {
          return <UserPageLink id={data.id} url={data.url} name={data.name} description={data.description} />;
        });
      }

      return (
        <div className="user-list">
          <h2>List Name: {this.props.name}</h2>
          {linkNodes}
        </div>
      )
    }
  });

  AwsumApp.viewClasses.UserPageLink = React.createClass({
    render : function() {
      return (
        <div className="user-link">
          <a href={this.props.url}>
            {this.props.name}
          </a>
        </div>
      )
    }
  })

  AwsumApp.viewClasses.SelectUserListItem = React.createClass({
    handleClick : function() {
      AwsumApp.loadUserPage(this.props.id);
    },
    render: function() {
      return (
        <li onClick={this.handleClick}>{this.props.username}</li>
      )
    }
  });

  // Select box where we will choose a user's page to view.
  // We first make a call to the server to get all users
  // which is passed to this.props.url when the component is defined
  AwsumApp.viewClasses.SelectUserBox = React.createClass({
    componentWillMount: function() {
      setPropsWithAJAXData.call(this, 'data', this.props.url);
    },
    render: function() {
      var userNodes;
      if (this.props && this.props.data) {
        userNodes = this.props.data.map(function (user) {
          return <SelectUserListItem id={user.id} username={user.username} />;
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

  // Make React Components available to global render() methods.
  // These will be available to render() because they are assigned
  // before any component calls render().
  SelectUserBox        = AwsumApp.viewClasses.SelectUserBox;
  SelectUserListItem   = AwsumApp.viewClasses.SelectUserListItem;
  UserPage             = AwsumApp.viewClasses.UserPage;
  UserPageControlPanel = AwsumApp.viewClasses.UserPageControlPanel;
  UserPageListBox      = AwsumApp.viewClasses.UserPageListBox;
  UserPageList         = AwsumApp.viewClasses.UserPageList;
  UserPageListItem     = AwsumApp.viewClasses.UserPageListItem;
})(AwsumApp);
