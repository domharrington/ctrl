var
	formHelper = require('../../lib/utils/formHelper'),
	generic = require('../generic'),
	viewRenderDelegate = require('../../lib/viewRenderDelegate');

var viewSchema = generic.createViewSchema({
	groups: [{
		name: 'Administrator Details',
		description: 'These are the details for an administrator',
		properties: {
			emailAddress: {
				list: true,
				view: true,
				createForm: true,
				updateForm: true,
				required: true
			},
			_id: {
				form: true,
				type: 'hidden'
			},
			firstName: {
				list: true,
				view: true,
				createForm: true,
				updateForm: true,
				searchField: 'text',
				required: true
			},
			lastName: {
				list: true,
				view: true,
				createForm: true,
				updateForm: true,
				searchField: 'text',
				required: true
			},
			password: {
				list: false,
				createForm: true,
				updateForm: false,
				view: true,
				type: 'password',
				required: true
			},
			roles: {
				list: false,
				view: true,
				createForm: true,
				updateForm: true
			},
			created: {
				list: true,
				view: true,
				createForm: false,
				type: 'dateTime'
			}
		}
	}],
	formPostHelper: function(req, res, next) {
		var proc = formHelper.processors;

		formHelper.process(req, {
			visible: proc.boolean
		});

		next();
	}
});

module.exports.createRoutes = function(app, properties, serviceLocator, bundleViewPath) {
	generic.createRoutes(
		app,
		generic.createViewRender('../../admin/views/layout'),
		viewSchema,
		serviceLocator.administratorModel,
		null,
		serviceLocator,
		{
			updateTag: 'update'
		}
	);
};