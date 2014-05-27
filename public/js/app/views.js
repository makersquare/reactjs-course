/** @jsx React.DOM */
(function(AwsumApp) {
  var UserPage,
      UserPageControlPanel,
      UserPageListBox,
      UserPageList,
      UserPageLink,
      SelectUserBox,
      SelectUserListItem;

  // Utility function; makes an AJAX request and returns the data
  // to the component, setting a key on its properties to the data object
  function setPropsWithAJAXData(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        var props = {
          data: data
        };
        this.setProps(props);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  // Select box where we will choose a user's page to view.
  // We first make a call to the server to get all users
  // which is passed to this.props.url when the component is defined
  AwsumApp.viewClasses.SelectUserBox = React.createClass({
    componentWillMount: function() {
      setPropsWithAJAXData.call(this, this.props.url);
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
          <div className="page-title">
            <h1>Select a user</h1>
          </div>
          <ul className="user-list">
            {userNodes}
          </ul>
        </div>
      )
    }
  });

  // Individual clickable list item to choose a user
  AwsumApp.viewClasses.SelectUserListItem = React.createClass({
    handleClick : function() {
      AwsumApp.showUserPage(this.props.id);
    },
    render: function() {
      return (
        <li onClick={this.handleClick}>{this.props.username}</li>
      )
    }
  });

  // Page for /user/:id
  AwsumApp.viewClasses.UserPage = React.createClass({
    // Get our user's data with AJAX
    componentWillMount: function() {
      setPropsWithAJAXData.call(this, this.props.url);
    },
    updateProps : function() {
      setPropsWithAJAXData.call(this, this.props.url);
    },
    render: function() {
      var listsData = null;
      if (this.props && this.props.data) {
        listsData = this.props.data.lists;
      }

      return (
        <div className="user-page">
          <div className="page-title">
            <h1 className="user-title">{ this.props.data ? this.props.data.username + '\'s Links' : '' }</h1>
            <a href="#" className="user-back" onClick={AwsumApp.showSelectUserPage.bind(AwsumApp)}>(back to users)</a>
          </div>
          <UserPageControlPanel userPageProps={this.props} />
          <UserPageListBox lists={listsData} />
        </div>
      )
    }
  });

  // Control panel
  AwsumApp.viewClasses.UserPageControlPanel = React.createClass({
    createList : function() {
      var listName = $('#input-create-list', this.getDOMNode()).val();
      AwsumApp.createList(AwsumApp.currentUser, listName);
    },
    // Get our user's data with AJAX
    render: function() {
      return (
        <div className="user-control-panel">
          <h2>Control Panel</h2>
          <h3>Create List</h3>
          <input type="text" id="input-create-list" />
          <button type="button" onClick={this.createList}>Create List</button>
        </div>
      )
    }
  });

  // Box that holds individual lists for users
  AwsumApp.viewClasses.UserPageListBox = React.createClass({
    render : function() {
      var listNodes;
      if (this.props && this.props.lists) {
        listNodes = this.props.lists.map(function (list) {
          return <UserPageList name={list.name} id={list.id} links={list.links} />;
        });
      }

      return (
        <div className="user-list-box">
          <h2>Lists</h2>
          {listNodes}
        </div>
      )
    }
  });

  // Individual lists that hold links, inside of UserPageListBox
  AwsumApp.viewClasses.UserPageList = React.createClass({
    showAddLink : function() {
      $('.create-link', this.getDOMNode()).toggle();
    },
    addLink : function() {
      var el = this.getDOMNode();
      var linkUrlEl  = $('#input-create-link-url', el);
      var linkNameEl = $('#input-create-link-name', el);
      var linkDescEl = $('#input-create-link-desc', el);
      var linkUrl  = linkUrlEl.val();
      var linkName = linkNameEl.val();
      var linkDesc = linkDescEl.val();
      AwsumApp.createLink(this.props.id, linkUrl, linkName, linkDesc);
      // Empty fields after creating
      linkUrlEl.val('');
      linkNameEl.val('');
      linkDescEl.val('');
    },
    deleteList : function() {
      AwsumApp.deleteList(this.props.id);
    },
    render : function() {
      var linkNodes = null;
      if (this.props && this.props.links) {
        linkNodes = this.props.links.map(function (link) {
          return <UserPageLink id={link.id} url={link.url} name={link.name} description={link.description} />;
        });
      }

      return (
        <div className="user-list">
          <h3>{this.props.name}</h3>
          <div className="list-actions">
            <button type="button" onClick={this.deleteList}>Delete List</button>
            <button type="button" onClick={this.showAddLink}>Add Link</button>
          </div>
          <div className="create-link" style={{"display":"none"}}>
            <div className="cf">
              <label className="create-link-label" for="input-create-link-url">URL</label>
              <input className="input-create-link-field" id="input-create-link-url" type="text" />
            </div>
            <div className="cf">
              <label className="create-link-label" for="input-create-link-name">Name</label>
              <input className="input-create-link-field" id="input-create-link-name" type="text" />
            </div>
            <label for="input-create-link-desc">Description</label>
            <textarea className="input-create-link-desc" id="input-create-link-desc" type="text" />
            <button type="button" onClick={this.addLink}>Add Link</button>
          </div>
          {linkNodes}
        </div>
      )
    }
  });

  // Individual clickable link items
  AwsumApp.viewClasses.UserPageLink = React.createClass({
    deleteLink : function() {
      AwsumApp.deleteLink(this.props.id);
    },
    render : function() {
      return (
        <div className="user-link">
          <a href={this.props.url}>
            <h4 className="user-link-name">{this.props.name}</h4>
          </a>
          <p className="user-link-desc">{this.props.description}</p>
          <button type="button" value="delete" onClick={this.deleteLink}>Delete</button>
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
  UserPageLink         = AwsumApp.viewClasses.UserPageLink;
})(AwsumApp);
