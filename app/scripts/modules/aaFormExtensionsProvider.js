'use strict';

var validationModule = angular.module('validationModule', ['aa.formExtensions']);

validationModule.config(['aaFormExtensionsProvider',
  function config(aaFormExtensionsProvider) {

    aaFormExtensionsProvider.validationMessages = {
      required: 'El campo "{0}" es requerido.',
      email: '{0} debe ser una dirección válida.',
      minlength: '{0} debe tener por lo menos {1} caracter(es).',
      maxlength: '{0} debe ser menor o igual que {1} caracteres.',
      min: 'El campo "{0}" debe ser mayor o igual que {1}.',
      max: 'El campo "{0}" debe ser menor o igual que {1}.',
      pattern: 'El campo "{0}" no es válido.',
      url: '{0} debe ser una URL válida.',
      number: 'El campo "{0}" debe ser numérico.',
      match: 'El campo "{0}" no coincide.',
      unknown: '{0} no es válido.'
    };

    aaFormExtensionsProvider.registerLabelStrategy = function(name, strategy) {
      this.labelStrategies[name] = strategy;
    };

    aaFormExtensionsProvider.registerLabelStrategy('none', function() {
    });

    aaFormExtensionsProvider.registerLabelStrategy('topSpan', function(ele, labelText, isRequired) {
      var label = angular.element('<strong>').html(labelText + (isRequired ? ':' : ':'));
      label.insertBefore(ele);
    });

    aaFormExtensionsProvider.registerLabelStrategy('bottomSpan', function(ele, labelText, isRequired) {
      var label = angular.element('<span>').attr('for', ele[0].id).html(labelText + (isRequired ? ':' : ':'));
      label.insertAfter(ele);
    });

    aaFormExtensionsProvider.defaultLabelStrategy = 'none';

    aaFormExtensionsProvider.defaultOnNavigateAwayStrategy = 'none';

  }
]);
