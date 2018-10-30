(function () {
    'use strict';

    angular
        .module('serviceProviderManageModule', ['adminFactoryModule', 'ui.bootstrap', 'uiSwitch', 'commonNotificationModule'])
        .controller('serviceProviderManageController', serviceProviderManageController)

    serviceProviderManageController.$inject = ['adminFactory', '$http', '$state', '$window', 'notificationFactory'];

    function serviceProviderManageController(adminFactory, $http, $state, $window, notificationFactory) {
        var vm = this;
        adminFactory.parameters.currentPage = 'Clinical Interventions - Manage Service Providers';
        vm.parameters = adminFactory.parameters;

        vm.submit = submit;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;
        vm.add = add;
        vm.toggleIsActive = toggleIsActive;
        vm.returnToOverview = returnToOverview;

        clinicalServiceProviders();

        function clinicalServiceProviders() {
            vm.pageLoaded = false;
            return $http({ method: 'GET', url: "../api/Admin/ClinicalInterventionServiceProvidersGet" }).then(
                function (response) {
                    vm.model = response.data;
                },
                function (response) {
                    $state.go('error', { error: response });
                }
            );
        };

        function edit(lookup) {
            lookup.editing = true;
            lookup.editorDescription = lookup.Description;
            lookup.editorCode = lookup.ForeignKeyCode;
            lookup.editorActive = lookup.IsActive;
            vm.model.InternalIndicators.map(function (i) {
                if (i.Id == lookup.ParentId) {
                    lookup.editorIndicator = i;
                }
            });
        }

        function cancel(lookup) {
            lookup.editing = false;
            lookup.editorDescription = null;
            lookup.editorCode = null;
            lookup.editorActive = null;
            lookup.editorIndicator = null;
        }

        function save(lookup) {
            lookup.editing = false;
            lookup.Description = lookup.editorDescription;
            lookup.ForeignKeyCode = lookup.editorCode;
            lookup.IsActive = lookup.editorActive;
            lookup.ParentId = lookup.editorIndicator.Id;
            lookup.Parent = lookup.editorIndicator.Description;
            submit(lookup);
        }

        function toggleIsActive(lookup) {

        };


        function returnToOverview() {
            $state.go('admin.overview');
        };

        function add() {
            var lookup = { Id: 0, ParentId: vm.newIndicator.Id, Parent: vm.newIndicator.Description, Description: vm.newDescription, ForeignKeyCode: vm.newCode, IsActive: true };
            vm.newDescription = '';
            vm.newCode = '';
            vm.newIndicator = null;
            submit(lookup);
        };

        function submit(lookup) {
            $http.post('../api/admin/ClinicalInterventionServiceProvidersUpdate', lookup,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(
                function (response) {
                    vm.model.ServiceProviders = response.data;
                    notificationFactory.successNotification('Service Provider saved to database!');
                },
                function () {
                    notificationFactory.failureNotification('Service Provider could not be updated!');
                }
            );
        };
    };
})();