define(function (require) {

    // one Factory is created and used, even on second module load attempt
    return function visFactory() {
        
        // singleton visualisations of each type can be created (mini dashboards could be created)
        // if only one type can be instatiated, allow for only one vis handle to be stored and assigned
        var visD3;
        var d3 = require("d3v4");
        
        this.createVis = function(type, init) {
            
            if (type === "vis_d3") {
                // singleton d3 visualisation is created
                //if (bar === undefined) bar = new bar(init);
                visD3 = new vis_d3(init);
                return visD3;
            }
            else
                return undefined;
        };
        
        /*
         * d3 visualisation;
         */
        var vis_d3 = function (init) {
            //Width and height
            var svgRoot = init;
            var svg;
             
            // functions
            this.updateData = function(data) {
                if (data !== null) {
                   this.dataset = data;
                };
            };
            
            this.render = function (vis) {

                /* Data Elasticsearch */
                var dataset = this.dataset;

               
                /* D3 visualisation */

            };

            return this;
        }
    };
});