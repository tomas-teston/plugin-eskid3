// Include the angular controller
require('plugins/plugin-eskid3/plugin-eskid3-Controller');
require('plugins/plugin-eskid3/plugin-eskid3.css');

// THe provider function, which must return our new visualization type
function Eskid3Provider(Private) {
	var TemplateVisType = Private(require('ui/template_vis_type/template_vis_type'));
	// Include the Schemas class, which will be used to define schemas
	var Schemas = Private(require('ui/vis/schemas'));

	// Describe our visualization
	return new TemplateVisType({
		name: 'plugin-eskid3', // The internal id of the visualization (must be unique)
		title: 'Plugin ESKID3', // The title of the visualization, shown to the user
		description: 'Basic plugin using ElasticSearch, Kibana and D3.JS', // The description of this vis
		icon: 'fa-database', // The font awesome icon of this visualization
		template: require('plugins/plugin-eskid3/plugin-eskid3.html'), // The template, that will be rendered for this visualization
		// Define the aggregation your visualization accepts
		schemas: new Schemas([
			{
				group: 'metrics',
				name: 'tagsize',
				title: 'Tagsize',
				min: 1,
				max: 1,
				aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
			},
			{
				group: 'buckets',
				name: 'tags',
				title: 'Tags',
				min: 1,
				max: 3,
				aggFilter: '!geohash_grid'
			}
		])
	});
}

require('ui/registry/vis_types').register(Eskid3Provider);



