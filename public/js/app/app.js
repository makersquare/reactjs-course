/** @jsx React.DOM */
var AwsumApp = {
  viewClasses: {},
  views : {},
  start : function() {
    this.initializeViews();
  },
  initializeViews : function() {
    var UserSelectBox = this.viewClasses.UserSelectBox;
    React.renderComponent(
      // Set props
      <UserSelectBox url="/users" />,
      document.getElementById('content')
    );
  }
};
