// Create an Angular module for this plugin
var module = require('ui/modules').get('plugin-eskid3');

// Minimum and maximum font size tags should have.
var maxFontSize = 32,
	minFontSize = 12;

var d3 = require('d3v4');   // requires latest d3 library that has been stored in d3v4 folder in kibana to allow both d3 versions to coexist

module.controller('plugin-eskid3-Controller', function($scope, $element, $rootScope, Private) {

	var filterManager = Private(require('ui/filter_manager'));

	// visualisation factory
    var vsFactory = Private(require('./lib/vis_d3'));
    // create bar visualisation and initialise
    var vs = vsFactory.createVis("vis_d3");


	$scope.filter = function(tag) {
		// Añadir un nuevo filtro a través del gestor de filtros
		filterManager.add(
			// El campo para filtrar, podemos obtenerlo desde la configuración
			$scope.vis.aggs.bySchemaName['tags'][0].params.field,
			// The value to filter for, we will read out the bucket key from the tag
			// El valor para filtrar, leeremos la clave del cubo de la etiqueta
			tag.label,
			// Whether the filter is negated. If you want to create a negated filter pass '-' here
			null,
			// The index pattern for the filter
			$scope.vis.indexPattern.title
		);
	};

	$scope.$watch('esResponse', function(resp) {
		if (!resp) {
			$scope.tags = null;
			return;
		}

		// Retrieve the id of the configured tags aggregation
		var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
		// Retrieve the metrics aggregation configured
		var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
		// Get the buckets of that aggregation
		var buckets = resp.aggregations[tagsAggId].buckets;


		var min = Number.MAX_VALUE,
			max = - Number.MAX_VALUE;

		// Transform all buckets into tag objects
		/*$scope.tags*/ var data = buckets.map(function(bucket) {
			// Use the getValue function of the aggregation to get the value of a bucket
			var value = metricsAgg.getValue(bucket);
			// Finding the minimum and maximum value of all buckets
			min = Math.min(min, value);
			max = Math.max(max, value);
			return {
				label: bucket.key,
				value: value
			};
		});
		vs.updateData(data);
		vs.render(this);

		// Calculate the font size for each tag
		/*$scope.tags = $scope.tags.map(function(tag) {
			tag.fontSize = (tag.value - min) / (max - min) * (maxFontSize - minFontSize) + minFontSize;
			return tag;
		});*/
	});
});
