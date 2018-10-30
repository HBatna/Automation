(function () {
    'use strict';

    angular
        .module('listManageModule', ['adminFactoryModule', 'ui.bootstrap', 'uiSwitch', 'commonNotificationModule'])
        .controller('listManageController', listManageController)

    listManageController.$inject = ['adminFactory', '$http', '$state', '$window', 'notificationFactory'];

    function listManageController(adminFactory, $http, $state, $window, notificationFactory) {
        var vm = this;
        adminFactory.parameters.currentPage = 'Clinical Interventions - Manage Lists';
        vm.parameters = adminFactory.parameters;

        vm.submit = submit;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;
        vm.add = add;
        vm.toggleIsActive = toggleIsActive;
        vm.returnToOverview = returnToOverview;

        clinicalLookupTypesGet();

        function clinicalLookupTypesGet() {
            vm.pageLoaded = false;
            return $http({ method: 'GET', url: "../api/Admin/ClinicalInterventionListsGet" }).then(
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
        }

        function cancel(lookup) {
            lookup.editing = false;
            lookup.editorDescription = null;
            lookup.editorCode = null;
            lookup.editorActive = null;
        }

        function save(lookup) {
            lookup.editing = false;

            var updatedlookup = {
                Id: lookup.Id,
                Description: lookup.editorDescription,
                ForeignKeyCode: lookup.editorCode,
                ClinicalLookupTypeId: lookup.ClinicalLookupTypeId,
                IsActive: lookup.editorActive
            };

            submit(updatedlookup);
        }

        function toggleIsActive(lookup) {

        };

        function returnToOverview() {
            $state.go('admin.overview');
        };

        function add() {
            var lookup = { Id: 0, ClinicalLookupTypeId: vm.selectedCategory.Id, Description: vm.newDescription, ForeignKeyCode: vm.newCode, IsActive: true };
            vm.newDescription = '';
            vm.newCode = '';
            submit(lookup);
        };

        function submit(lookup) { 
            $http.post('../api/admin/ClinicalLookupUpdate', lookup,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(
                function (response) {
                    vm.selectedCategory.Children = response.data;
                    notificationFactory.successNotification('Clinical Lookup saved to database!');
                },
                function () {
                    notificationFactory.failureNotification('Lookup could not be updated!');
                }
            );
        };
    };
})();