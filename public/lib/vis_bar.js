define(function (require) {

    // one Factory is created and used, even on second module load attempt
    return function visFactory() {
        
        // singleton visualisations of each type can be created (mini dashboards could be created)
        // if only one type can be instatiated, allow for only one vis handle to be stored and assigned
        var visBar;
        var d3 = require("d3v4");
        
        this.createVis = function(type, init) {
            
            if (type === "bar") {
                // singleton bar visualisation is created
                //if (bar === undefined) bar = new bar(init);
                visBar = new bar(init);
                return visBar;
            }
            else
                return undefined;
        };
        
        /*
         * bar visualisation;
         */
        var bar = function (init) {
            //Width and height
            var w = 500;
            var h = 100;
            var barPadding = 1;
            var svgRoot = init;
            var svg;
            
            var dataset = null;/*[5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                            11, 12, 15, 20, 18, 17, 16, 18, 23, 25];*/    
            // functions
            this.updateData = function(data) {
                if (data !== null) {
                   this.dataset = data;
                };
            };

            this.getW = function(){
                return w;
            };
            
            this.render = function (vis) {

                console.log(this.dataset);

                this.dataset = this.dataset.map(function(datos){
                    return ({
                        "value": (Number(datos.value)/100).toFixed(),
                        "label": datos.label
                    });
                });

                console.log("A imprimir");
                console.log(this.dataset);

                var dataset = this.dataset;

                /*if (svg === undefined){
                    svg = d3.select("#grafica")
                            .append("svg")
                            .attr("width", w)
                            .attr("height", h);
                }*/
                $('#grafica svg').remove();
                //d3.select("#grafica").remove();
                svg = d3.select("#grafica")
                            .append("svg")
                            .attr("width", w)
                            .attr("height", h);
                //Create SVG element
                
                svg.selectAll("rect")
                   .data(dataset)
                   .enter()
                   .append("rect")
                   .attr("x", function(d, i) {
                        return i * (w / dataset.length);
                   })
                   .attr("y", function(d) {
                        console.log(d.value);
                        return h - (d.value * 4);
                   })
                   .attr("width", w / dataset.length - barPadding)
                   .attr("height", function(d) {
                        return d.value * 4;
                   })
                   .attr("fill", function(d) {
                        return "rgb(0, 0, " + (d.value * 10) + ")";
                    });
                
                //Etiquetas.
                svg.selectAll("text")
                    .data(dataset)
                    .enter()
                    .append("text")
                    .text(function(d) {
                        return d.label;
                    })
                    .attr("x", function(d, i) {
                        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                    })
                    .attr("y", function(d) {
                        return h - (d.value * 4) + 15;              // +15
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("fill", "white")
                    .attr("text-anchor", "middle");
            };

            return this;
        }
    };
});