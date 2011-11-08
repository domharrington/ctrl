module.exports = {
	name: 'Roles',
	description: 'Manage the user who administer the site',
	adminNav: [{
			label: 'Roles',
			url: '/admin/role'
		}
	],
	bootstrap: function(app, properties, serviceLocator) {

		// Register the bundles models
		serviceLocator.register('roleModel',
			require('./lib/roleModel').createModel(properties, serviceLocator));
	},
	configure: function(app, properties, serviceLocator) {
		// The resource you need access of see the admin bundles
		serviceLocator.adminAccessControlList.addResource('role');

		// This should be controlled in the database
		serviceLocator.adminAccessControlList.grant('admin', 'role', 'read');
		serviceLocator.adminAccessControlList.grant('admin', 'role', 'update');
		serviceLocator.adminAccessControlList.grant('admin', 'role', 'write');
		serviceLocator.adminAccessControlList.grant('admin', 'role', 'delete');
	},
	finalise: function(app, properties, serviceLocator) {
		// Create controllers
		require('./controller').createRoutes(app, properties, serviceLocator, __dirname + '/views');
	}
};