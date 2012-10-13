module.exports = function createRoutes (serviceLocator, bundleViewPath) {

  serviceLocator.admin.routes(
    serviceLocator,
    require('./admin-view-config')(serviceLocator),
    serviceLocator.administratorModel,
    {
      updateTag: 'update',
      requiredAccess: 'Administrator',
      renderFn: serviceLocator.admin.viewRender()
    }
  );
};