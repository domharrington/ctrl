var async = require('async')
  , validity = require('validity')
  , schemata = require('schemata')
  , genericCrudModel = require('../../generic/lib/genericCrudModel')
  ;

module.exports = function(serviceLocator) {

  var save = serviceLocator.saveFactory.role()
    , properties = serviceLocator.properties
    , schema = schemata({
        _id: {
        },
        name: {
          validators: {
            all: [validity.required]
          }
        },
        grants: {
          validators: {
            all: [validity.required]
          }
        },
        created: {
          defaultValue: function() { return new Date(); }
        }
      })
    , model = genericCrudModel('Role', save, schema);

  function createRootRole(callback) {
    save.create({ name: 'root', grants: {'*': ['*']} }, callback);
  }

  function ensureRootRoleExists(callback) {
    save.find({ name: 'root'}, {}, function(error, role) {
      if (error) {
        return callback(error);
      }
      if (role.length === 0) {
        createRootRole(callback);
      } else {
        callback();
      }
    });
  }

  function loadAcl(acl, callback) {

    function addRoleToAcl(role) {
      Object.keys(role.grants).forEach(function(resource) {
        role.grants[resource].forEach(function(action) {
          serviceLocator.logger.silly('Adding grant \'' + role.name + '\\' +  resource  + '\\' + action + '\' to ACL');
          acl.grant(role.name, resource, action);
        });
      });
    }

    save.find({}, {}, function(error, roles) {
      roles.forEach(addRoleToAcl);
    });
  }

  // Public methods
  model.ensureRootRoleExists = ensureRootRoleExists;
  model.loadAcl = loadAcl;

  return model;
};