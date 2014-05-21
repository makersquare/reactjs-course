/** @jsx React.DOM */
var AwsumApp = {
  viewClasses: {},
  views : {},
  start : function() {
    this.selectUser();
  },
  selectUser : function() {
    var SelectUserBox = this.viewClasses.SelectUserBox;
    React.renderComponent(
      // Set props
      <SelectUserBox url="/users" />,
      document.getElementById('content')
    );
  },
  loadUserPage : function(user_id) {
    var UserPage = this.viewClasses.UserPage;
    React.renderComponent(
      <UserPage url={"/user/" + user_id} />,
      document.getElementById('content')
    )
  }
};
