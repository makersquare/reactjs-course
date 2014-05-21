(function () {

  window.Robin = {};
  var Robin = window.Robin;

  Robin.extend = function (destination, source) {
    var property;
    for (property in source) {
      destination[property] = source[property];
    }
    return destination;
  };

  Robin.Events = {
    on: function (eventName, callbackFunction) {
      if (!this.events) {
        this.events = {};
      }
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callbackFunction);
    },
    trigger: function (eventName) {
      var i, l, args;
      args = Array.prototype.slice.call(arguments, 1);
      for (i = 0, l = this.events[eventName].length; i < l; i++) {
        this.events[eventName][i].apply(null, args);
      }
    }
  };

  Robin.render = function (template, data) {
    var renderedTemplate = template, property, regex;
    for (property in data) {
      regex = new RegExp("{{" + property + "}}", "g");
      renderedTemplate = renderedTemplate.replace(regex, data[property]);
    }
    return renderedTemplate;
  };

}());