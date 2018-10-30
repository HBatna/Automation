(function () {
    'use strict';

    angular
        .module('staffManageModule', ['adminFactoryModule', 'ui.bootstrap', 'uiSwitch', 'commonNotificationModule'])
        .controller('staffManageController', staffManageController)

    staffManageController.$inject = ['adminFactory', '$http', '$state', '$window', 'notificationFactory'];

    function staffManageController(adminFactory, $http, $state, $window, notificationFactory) {
        var vm = this;
        adminFactory.parameters.currentPage = 'Clinical Interventions - Manage Staff';
        vm.parameters = adminFactory.parameters;
        vm.newLogon = '';


        vm.submit = submit;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;
        vm.add = add;
        vm.toggleIsActive = toggleIsActive;
        vm.returnToOverview = returnToOverview;

        serviceProvidersGet();

        function serviceProvidersGet() {
            vm.pageLoaded = false;
            return $http({ method: 'GET', url: "../api/Admin/ClinicalInterventionStaffGet" }).then(
                function (response) {
                    vm.model = response.data;
                },
                function (response) {
                    $state.go('error', { error: response });
                }
            );
        };

        function edit(staff) {
            staff.editing = true;
            staff.editorDescription = staff.Description;
            staff.editorLogon = staff.Logon;
            staff.editorActive = staff.IsActive;
        }

        function cancel(staff) {
            staff.editing = false;
            staff.editorDescription = null;
            staff.editorLogon = null;
            staff.editorActive = null;
        }

        function save(staff) {
            staff.editing = false;
            staff.Description = staff.editorDescription;
            staff.Logon = staff.editorLogon;
            staff.IsActive = staff.editorActive;
            submit(staff);
        }

        function toggleIsActive(lookup) {

        };


        function returnToOverview() {
            $state.go('admin.overview');
        };

        function add() {
            var staff = { Id: 0, ServiceProviderId: vm.selectedServiceProvider.Id, Description: vm.newDescription, Logon: vm.newLogon, IsActive: true };
            vm.newDescription = '';
            vm.newLogon = '';
            submit(staff);
        };

        function submit(staff) {
            staff.ServiceProviderId = vm.selectedServiceProvider.Id;
            $http.post('../api/admin/ClinicalStaffUpdate', staff,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(
                function (response) {
                    vm.selectedServiceProvider.Staff = response.data;
                    notificationFactory.successNotification('Service Provider Staff saved to database!');
                },
                function () {
                    notificationFactory.failureNotification('Service Provider Staff could not be updated!');
                }
                );
        };
    };
})();