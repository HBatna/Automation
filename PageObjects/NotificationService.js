var NotificationService = function() {
	var self = this;
	
    self.GetErrorNotifications = function() {
        return element.all(by.className('alert-danger')).all(by.css('[data-notify="message"]'));
    };
	
    self.GetSuccessNotifications = function() {
        return element.all(by.className('alert-success')).all(by.css('[data-notify="message"]'));  
	};
	
	self.GetNotifications = function() {
		return element.all(by.className('alert'));
	};
	
	self.CloseNotification = function(index) {
		return self.GetNotifications().get(index).element(by.tagName('button')).click();
	};
}
module.exports = NotificationService;