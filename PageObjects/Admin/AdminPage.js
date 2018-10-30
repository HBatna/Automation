var AdminPage = function () {
	var self = this;

    self.Menu = {
        AdviceRequest: {
            GetElement: function() { return self.GetMenuItem(0); },
            GetSubItems: function () { return self.GetSubMenuItems(0); },
            SubItems: {
                TypeDetails: {
                    GetElement: function () { return self.GetMenu().get(0).all(by.repeater('c in m.children')).get(0); }
                }
            }
        },
        Broadcasts: {
            GetElement: function() { return self.GetMenuItem(1); },
            GetSubItems: function () { return self.GetSubMenuItems(1); },
            SubItems: {
                Create: {
                    GetElement: function () { return self.GetMenu().get(1).all(by.repeater('c in m.children')).get(0); }
                },
                Remove: {
                    GetElement: function () { return self.GetMenu().get(1).all(by.repeater('c in m.children')).get(1); }
                }
            }
        },
        Caseloads: {
            GetElement: function () { return self.GetMenuItem(2); },
            GetSubItems: function () { return self.GetSubMenuItems(2); },
            SubItems: {
                Create: {
                    GetElement: function () { return self.GetMenu().get(2).all(by.repeater('c in m.children')).get(0); }
                },
                Alter: {
                    GetElement: function () { return self.GetMenu().get(2).all(by.repeater('c in m.children')).get(1); }
                }
            }
        },
        ClinicalInterventions: {
            GetElement: function () { return self.GetMenuItem(3); },
            GetSubItems: function () { return self.GetSubMenuItems(3); },
			SubItems: {
                Lists: {
                    GetElement: function () { return self.GetMenu().get(3).all(by.repeater('c in m.children')).get(0); }
                },
				ServiceProviders: {
                    GetElement: function () { return self.GetMenu().get(3).all(by.repeater('c in m.children')).get(1); }
                },
				Staff: {
                    GetElement: function () { return self.GetMenu().get(3).all(by.repeater('c in m.children')).get(2); }
                }
            }
        },
        CommunityWork: {
            GetElement: function () { return self.GetMenuItem(4); },
            GetSubItems: function () { return self.GetSubMenuItems(4); }
        },
        Documents: {
            GetElement: function () { return self.GetMenuItem(5); },
            GetSubItems: function () { return self.GetSubMenuItems(5); }
        },
        Events: {
            GetElement: function () { return self.GetMenuItem(6); },
            GetSubItems: function () { return self.GetSubMenuItems(6); },
            SubItems: {
                Alter: {
                    GetElement: function () { return self.GetMenu().get(6).all(by.repeater('c in m.children')).get(0); }
                },
                LinkUnlinkAssignment: {
                    GetElement: function () { return self.GetMenu().get(6).all(by.repeater('c in m.children')).get(1); }
                },
                UpdateCourtAdvicePresentationType: {
                    GetElement: function () { return self.GetMenu().get(6).all(by.repeater('c in m.children')).get(2); }
                }
            }
        },
        Interfaces: {
            GetElement: function () { return self.GetMenuItem(7); },
            GetSubItems: function () { return self.GetSubMenuItems(7); },
            SubItems: {
                SearchReceivedInterface: {
                    GetElement: function () { return self.GetMenu().get(7).all(by.repeater('c in m.children')).get(0); }
                },
                Remove: {
                    GetElement: function () { return self.GetMenu().get(7).all(by.repeater('c in m.children')).get(3); }
                }
            }
        },
        Offenders: {
            GetElement: function () { return self.GetMenuItem(8); },
            GetSubItems: function () { return self.GetSubMenuItems(8); }
        },
        Officers: {
            GetElement: function () { return self.GetMenuItem(9); },
            GetSubItems: function () { return self.GetSubMenuItems(9); }
        },
        Orders: {
            GetElement: function () { return self.GetMenuItem(10); },
            GetSubItems: function () { return self.GetSubMenuItems(10); },
            SubItems: {
                UpdateEndDate: {
                    GetElement: function () { return self.GetMenu().get(10).all(by.repeater('c in m.children')).get(0); }
                },
                TypesDetail: {
                    GetElement: function () { return self.GetMenu().get(10).all(by.repeater('c in m.children')).get(1); }
                }
            }
        },
        Permissions: {
            GetElement: function () { return self.GetMenuItem(11); },
            GetSubItems: function () { return self.GetSubMenuItems(11); }
        }
    };
    self.Labels = {
        PageTitle: element(by.binding('admin.parameters.currentPage'))
    };
    self.GetMenu = function() {
        return element.all(by.repeater('m in admin.menu'));
    };

	self.GetMenuItem = function(index) {
		return self.GetMenu().get(index);
	};
	self.GetSubMenuItems = function(index) {
		return self.GetMenu().get(index).all(by.repeater('c in m.children')).map(function(elem, index) {
			return {
				index: index,
				text: elem.all(by.css('a')).first().getAttribute('textContent')
			};
		});
	};
}
module.exports = AdminPage;