


  d3.json("us.json", function(error,data){
    console.log(data);
    var geoJSON = topojson.feature(data, data.objects.states);
    console.log(geoJSON);

    var proj = d3.geoAlbersUsa()
      .fitSize([window.innerWidth, window.innerHeight], geoJSON);

    var path = d3.geoPath()
      .projection(proj);


      var svg = d3.select("#mysvg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

      var states = svg.selectAll("path")
        .data(geoJSON.features);

        states.enter().append("path")
          .attr("d", function(d) {
            return path(d);
          })
          // .attr("fill", "lightblue")
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .on("mouseover", function(d,i) {
            d3.select(this)
            .style("fill", "#f8f6d7");
        })
      .on("mouseout", function(d,i) {
          d3.select(this).interrupt();
          d3.select(this)
          .style("fill", "#aca");
        });


          // .on("mouseover", function(d,i) {
          //      states.select(this)
          //        .style("fill", "red");
          //      })
          //    .on("mouseout", function(d,i) {
          //      states.select(this).interrupt();
          //      states.select(this)
          //        .style("fill", "#aca");
          //      });

          //  .attr("fill", function(d){
          //   if (d.id == "04000US04") {
          //     return "green";
          //   }
          //   else {
          //     return "#ccc";
          //   }
          // });


  var points = [
  {"name": "MA", "coords": [-71.3824,42.4072]},
];

var points = svg.selectAll("circle")
  .data(points);

points.enter().append("circle")
  .attr("fill", "white")
  .attr("r", 10)
  .attr("transform", function(d){
    return "translate(" + proj(d.coords) + ")";
  })


  });



  d3.queue()
    .defer(d3.csv, "nation.csv")
    .defer(d3.csv, "StatesIndex.csv")
    .defer(d3.csv, "ChangesInComposition.csv")


    .awaitAll(function(error, data) {

      var nationData = data[0];

      for (var i = 0; i < nationData.length; i++) {
        console.log(nationData[i]);
      }

      nationData.forEach(function(d, i) {

        for (var poop in d) {
          var num = +d[poop];
          var indexOfYR = poop.indexOf("[YR");
          if (isNaN(num) == false) {
            d[poop] = num;
          }

        }

      });

      console.log(nationData);


      var stateData = data[1];

      for (var i = 0; i < stateData.length; i++) {
        console.log(stateData[i]);
      }

      stateData.forEach(function(d, i) {

        for (var poop in d) {
          var num = +d[poop];
          var indexOfYR = poop.indexOf("[VA");
          if (isNaN(num) == false) {
            d[poop] = num;
          }

        }

      });

      console.log(nationData);




      var changeData = data[2];

      for (var i = 0; i < changeData.length; i++) {
        console.log(changeData[i]);
      }

      changeData.forEach(function(d, i) {

        for (var poop in d) {
          var num = +d[poop];
          var indexOfYR = poop.indexOf("[YR");
          if (isNaN(num) == false) {
            d[poop] = num;
          }

        }

      });

      console.log(changeData);

    });
