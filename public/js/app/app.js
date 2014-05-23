/** @jsx React.DOM */
var AwsumApp = {
  viewClasses: {},
  views : {},
  currentUserId : null,
  start : function() {
    this.showSelectUserPage();
  },
  showSelectUserPage : function() {
    var SelectUserBox = this.viewClasses.SelectUserBox;
    this.views.SelectUserBox = React.renderComponent(
      // Set props
      <SelectUserBox url="/users" />,
      document.getElementById('content')
    );
  },
  showUserPage : function(user_id) {
    var UserPage = this.viewClasses.UserPage;

    this.currentUser    = user_id;
    this.views.UserPage = React.renderComponent(
      <UserPage url={"/user/" + user_id} />,
      document.getElementById('content')
    )
  },
  createList : function(userId, listName) {
    var me = this;
    $.ajax({
      url: '/list',
      type: 'POST',
      data: {
        'user_id': userId,
        'name': listName
      },
      success : function() {
        me.views.UserPage.updateProps();
      }
    });
  },
  deleteList : function(listId) {
    var me = this;
    $.ajax({
      url: '/list/' + listId,
      type: 'DELETE',
      success : function() {
        me.views.UserPage.updateProps();
      }
    });
  },
  deleteLink : function(linkId) {
    var me = this;
    $.ajax({
      url: '/link/' + linkId,
      type: 'DELETE',
      success : function() {
        me.views.UserPage.updateProps();
      }
    });
  },
  createLink : function(listId, linkUrl, linkName, linkDesc) {
    var me = this;
    $.ajax({
      url: '/link',
      type: 'POST',
      data: {
        'list_id': listId,
        'url': linkUrl,
        'name': linkName,
        'description': linkDesc
      },
      success : function() {
        me.views.UserPage.updateProps();
      }
    });
  }
};
