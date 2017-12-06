
d3.queue()
  .defer(d3.csv, "nationRate.csv")
  .await(function(error, RateData) {

    var ageSvg = d3.select("#ageSvg"),
        agemargin = {top: 20, right: 150, bottom: 30, left: 160},
        width = +ageSvg.attr("width") - agemargin.left - agemargin.right,
        height = +ageSvg.attr("height") - agemargin.top - agemargin.bottom,
        Ag = ageSvg.append("g").attr("transform", "translate(" + agemargin.left + "," + agemargin.top + ")");

    var RparseTime = d3.timeParse("%Y [YR%Y]");


    RateData.forEach(function(d) {
        d.Year = RparseTime(d.Year);
    });
    console.log(RateData);

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var Az = d3.scaleOrdinal(d3.schemeRdBu[6]);


    var Aline = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.value); });

//AGEDATA
    var ageData = [];
    ageData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "20to34",
        value: d["20to34"]
      }
    }));
    ageData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "35to44",
        value: d["35to44"]
      }
    }));
    ageData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "45to54",
        value: d["45to54"]
      }
    }));
    ageData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "55to64",
        value: d["55to64"]
      }
    }));
console.log(ageData);

//////
//RACEDATA
var raceData = [];
raceData.push(RateData.map(function(d) {
   return {
     Year: d.Year.getFullYear(),
     key: "White",
     value: d.White
   }
  }));
raceData.push(RateData.map(function(d) {
     return {
       Year: d.Year.getFullYear(),
       key: "Black",
       value: d.Black
     }
    }));
 raceData.push(RateData.map(function(d) {
       return {
         Year: d.Year.getFullYear(),
         key: "Latino",
         value: d.Latino
       }
      }));
  raceData.push(RateData.map(function(d) {
         return {
           Year: d.Year.getFullYear(),
           key: "Asian",
           value: d.Asian
         }
        }));

//////VETERANDATA

var veteranData = [];
veteranData.push(RateData.map(function(d) {
   return {
     Year: d.Year.getFullYear(),
     key: "Veterans",
     value: d.Veterans
   }
  }));
veteranData.push(RateData.map(function(d) {
    return {
      Year: d.Year.getFullYear(),
      key: "Non_Veterans",
      value: d.Non_Veterans
     }
    }));

//////NATIVITYDATA

var nativityData = [];
nativityData.push(RateData.map(function(d) {
   return {
     Year: d.Year.getFullYear(),
     key: "Native",
     value: d.Native
   }
  }));
nativityData.push(RateData.map(function(d) {
    return {
      Year: d.Year.getFullYear(),
      key: "Immigrant",
      value: d.Immigrant
     }
    }));

//////GENDERDATA

var genderData = [];
genderData.push(RateData.map(function(d) {
   return {
     Year: d.Year.getFullYear(),
     key: "Male",
     value: d.Male
   }
  }));
genderData.push(RateData.map(function(d) {
    return {
      Year: d.Year.getFullYear(),
      key: "Female",
      value: d.Female
     }
    }));

//////EDUCATIONDATA

    var educationData = [];
    educationData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "Low",
        value: d.Low
      }
    }));
    educationData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "HighSchool",
        value: d.HighSchool
      }
    }));
    educationData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "College",
        value: d.College
      }
    }));
    educationData.push(RateData.map(function(d) {
      return {
        Year: d.Year.getFullYear(),
        key: "Graduate",
        value: d.Graduate
      }
    }));


    // console.log(ageData);



    drawLines(ageData);
    d3.select('#agebtn').on('click', function(){
      drawLines(ageData);
    });

    d3.select('#racebtn').on('click', function(){
      drawLines(raceData);
    });


    d3.select('#educationbtn').on('click', function(){
      drawLines(educationData);
    });


      d3.select('#nativitybtn').on('click', function(){
        drawLines(nativityData);
      });


    function drawLines(data) {

      x.domain(d3.extent(RateData, function(d) { return d.Year.getFullYear(); }));
      y.domain([0.1 , 0.7]);
      // Az.domain(RateData.map(function(d){return d[0].key}));

      console.log(data);
      console.log('drawLines');
      var lines = Ag.selectAll(".linePath")
        .data(data);

      //
      var linesEnter = lines
        .enter()
        .append("path")
        .attr('class','linePath');

      linesEnter.merge(lines)
            .attr("d", Aline)
            .attr("fill", "none")
            .style("stroke", function(d) { return Az(d[0].key); })
            // .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 9)
            .attr("opacity", 0)

            .on("mouseover", function(d){
                d3.select(this)
                  .transition()
                  .duration(500)
                  .attr("stroke-width", 20)
                  var tooltip= d3.select('.tooltip');
                  tooltip.transition()
                     .style('opacity',0.7)
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY) + "px")
                     .style("display", "block");

                     d3.select(this)
                  .transition()
                  .duration(500)

                     tooltip
                             .select('.tipName')
                             .text(d[0].key);
                })

            .on("mouseout", function(d,i){
                d3.select(this)
                .transition()
                .duration(500)
                .attr("stroke-width", 9)
                .style("stroke", function(d) { return Az(d[0].key); });
                var tooltip= d3.select('.tooltip');
                tooltip.transition()
                 .style('opacity',0);
                // .attr("stroke", "steelblue");
              })
                .transition()
                .duration(2000)
                .attr("opacity",1);
                //
                lines.exit()
                  .remove();



  //    var linesText = Ag.selectAll("text")
  //     .data(data);
  //
  // var linePath = Ag.selectAll("text")
  //   .data(data);
  //       linePath. append("text")
  //               .datum(function(d) { return {key: d[0].key, value: d.value[d.value.length - 1]}; })
  //               .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.value) + ")"; })
  //               .attr("x", 3)
  //               .attr("dy", "0.35em")
  //               .style("font", "10px sans-serif")
  //               .text(function(d) { return d[0].key; });


    }



    x.domain(d3.extent(RateData, function(d) { return d.Year.getFullYear(); }));
    y.domain([0.1 , 0.7]);
    // Az.domain(RateData.map(function(d){return d[0].key}));

    Ag.append("g")
          .attr("class", "axis axis-x")
          .attr("transform", "translate(0," + height + ")")
          .attr("fill", "#000")
          .select(".domain")
          .call(d3.axisBottom(x));
      // Ag.append("g")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(d3.axisBottom(x))

      //     .remove();


      Ag.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Rate of New Entrepreneurs (%)");




          // x.domain(d3.extent(RateData, function(d) { return d.Year.getFullYear(); }));
          // y.domain([0.1 , 0.7]);
          // Az.domain(RateData.map(function(d){return d[0].key}));
  });
