

// get data
d3.queue()
  .defer(d3.csv, "nationRate.csv")
  // line data
  .defer(d3.csv, "StatesIndex.csv")
  // map data
  .defer(d3.csv, "ChangesInComposition.csv")
  .defer(d3.csv, "index.csv")
  // first line data


  .awaitAll(function(error, data) {

    var RateData = data[0];

    RateData.forEach(function(d, i) {

      for (var poop in d) {
        var num = +d[poop];
        var indexOfYR = poop.indexOf("[YR");
        if (isNaN(num) == false) {
          d[poop] = num;
        }

      }

    });

    console.log(RateData);


    var stateData = data[1];

    stateData.forEach(function(d, i) {

      for (var poop in d) {
        var num = +d[poop];
        var indexOfYR = poop.indexOf("[VA");
        if (isNaN(num) == false) {
          d[poop] = num;
        }

      }

    });

    console.log(stateData);





    var changeData = data[2];

    for (var i = 0; i < changeData.length; i++) {
      // console.log(changeData[i]);
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

    // console.log(changeData);

    //nation line chart
    // var nationWidth = d3.select("#nationSvg")
    //                   .attr("width", window.innerWidth)


    var nationSvg = d3.select("#nationSvg"),
        nationMargin = {top: 20, right: 200, bottom: 30, left: 160},
        width = +nationSvg.attr("width") - nationMargin.left - nationMargin.right,
        height = +nationSvg.attr("height") - nationMargin.top - nationMargin.bottom,
        Ng = nationSvg.append("g").attr("transform", "translate(" + nationMargin.left + "," + nationMargin.top + ")");

    var parseTime = d3.timeParse("%Y [YR%Y]");

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.nationIndex); });


        var IndexData = data[3];

        for (var i = 0; i < IndexData.length; i++) {
          // console.log(IndexData[i]);
        }

        IndexData.forEach(function(d, i) {

          for (var poop in d) {
            var num = +d[poop];
            var indexOfYR = poop.indexOf("[YR");
            if (isNaN(num) == false) {
              d[poop] = num;
            }

          }

        });


        // format the data
        IndexData.forEach(function(d) {
            d.year = parseTime(d.year);
            d.nationIndex = +d.nationIndex;
        });
        // console.log(IndexData);


      x.domain(d3.extent(IndexData, function(d) { return d.year; }));
      // y.domain(d3.extent(IndexData, function(d) { return d.nationIndex; }));
      y.domain([-1.2 , 1.2]);

      Ng.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + height + ")")
            .attr("fill", "#000")
            // .select(".domain")
            .call(d3.axisBottom(x));
      // Ng.append("g")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(d3.axisBottom(x))
      //   .select(".domain")
      //     .remove();

      Ng.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Nation Index");

      Ng.append("path")
          .datum(IndexData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 3)
          .attr("d", line)
          .attr("opacity",0)
          .transition()
            .duration(2000)
            .attr("opacity",1);

            var points = Ng.selectAll(".MyCircle")
                   .data(IndexData)
                   .enter()
                   .append("circle")
                   .attr("class","MyCircle")
                   .attr("transform","translate(0,0)")
                   .attr("r", 5)
                   .attr("fill","#E2C93F")
                   .attr("cx", function(d){ return x(d.year); })
                   .attr("cy", function(d){ return y(d.nationIndex); })

                   .on("mouseover", function(d){
                     var mydata= IndexData;
                     d3.select(this)
                       .transition()
                       .duration(500)
                       .attr("r", 20)
                      //  nationSvg.select(".tip")
                //       .transition()
                //  .style("opacity", "1")
                //  .attr("transform", "translate(" + (x(d.year) + nationMargin.left) + ", " + (y(d.nationIndex)- nationMargin.bottom) + ")")
                //  .select("text")
                //    .text('Startup Activity Index of ' + d.year.getFullYear() + ':' + d.nationIndex)

                        d3.select(".tip")
                              .transition()
                         .style("opacity", "1")
                         .style("position","absolute")
                         .style("left", (d3.event.pageX)+ (nationMargin.left/2) + "px")
                         .style("top", (d3.event.pageY) + "px")
                        //  .style('top',((y(d.nationIndex)-nationMargin.bottom+950)+'px'))
                        //  .style('left',((x(d.year + nationMargin.left)+'px')))
                         .text('Startup Activity Index of ' + d.year.getFullYear() + ':' + d.nationIndex)
                      //     //  .text(d.year.getFullYear());
                     })



                   .on("mouseout", function(){
                     d3.select(this).transition().duration(500).attr("r", 5);
                     d3.select(".tip")
                            .transition()
                       .style("opacity", "0")
                   });



// // Age line chart by age
//
//     var ageSvg = d3.select("#ageSvg"),
//         agemargin = {top: 20, right: 150, bottom: 30, left: 160},
//         width = +ageSvg.attr("width") - agemargin.left - agemargin.right,
//         height = +ageSvg.attr("height") - agemargin.top - agemargin.bottom,
//         Ag = ageSvg.append("g").attr("transform", "translate(" + agemargin.left + "," + agemargin.top + ")");
//
//     var RparseTime = d3.timeParse("%Y [YR%Y]");
//
//     RateData.forEach(function(d) {
//         d.Year = RparseTime(d.Year);
//     });
//
//     var Ax = d3.scaleTime()
//         .rangeRound([0, width]);
//
//     var Ay = d3.scaleLinear()
//         .rangeRound([height, 0]);
//
//     // var Az = d3.scaleOrdinal(d3.schemeGnBu[5]);
//     // var Az = d3.scaleOrdinal(d3.schemeRdYlBu[6]);
//     // var Az = d3.scaleOrdinal(d3.schemePastel2);
//     var Az = d3.scaleOrdinal(d3.schemeRdBu[6]);
//
//
//     var Aline = d3.line()
//         .x(function(d) { return x(d.Year); })
//         .y(function(d) { return y(d.value); });
//
//     var ageData = [];
//     ageData.push(RateData.map(function(d) {
//       return {
//         Year: d.Year,
//         key: "20to34",
//         value: d["20to34"]
//       }
//     }));
//     ageData.push(RateData.map(function(d) {
//       return {
//         Year: d.Year,
//         key: "35to44",
//         value: d["35to44"]
//       }
//     }));
//     ageData.push(RateData.map(function(d) {
//       return {
//         Year: d.Year,
//         key: "45to54",
//         value: d["45to54"]
//       }
//     }));
//     ageData.push(RateData.map(function(d) {
//       return {
//         Year: d.Year,
//         key: "55to64",
//         value: d["55to64"]
//       }
//     }));
//
//
//     // console.log(ageData);
//
//     x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//     y.domain([0.1 , 0.45]);
//     Az.domain(RateData.map(function(d){return d.id}))
//
//     var lines = Ag.selectAll("path")
//       .data(ageData);
//
//
//     lines.enter().append("path")
//           .attr("d", Aline)
//           .attr("fill", "none")
//           .style("stroke", function(d) { return Az(d[0].key); })
//           // .attr("stroke", "steelblue")
//           .attr("stroke-linejoin", "round")
//           .attr("stroke-linecap", "round")
//           .attr("stroke-width", 4)
//           .attr("opacity", 0)
//           .on("mouseover", function(d){
//               d3.select(this)
//                 .transition()
//                 .duration(500)
//                 .attr("stroke-width", 10)
//                 .attr("stroke", "#E2C93F")
//               })
//
//           .on("mouseout", function(){
//               d3.select(this)
//               .transition()
//               .duration(500)
//               .attr("stroke-width", 4)
//               .style("stroke", function(d) { return Az(d[0].key); })
//               // .attr("stroke", "steelblue");
//             })
//               .transition()
//               .duration(2000)
//               .attr("opacity",1);
//
//           // var lines = Ag.selectAll("path")
//           //               .data(ageData);
//           //          lines. append("text")
//           //               // .attr("transform", function(d) { return "translate(" + x(d.Year) + "," + y(d.value) + ")"; })
//           //               .attr("x", 3)
//           //               .attr("dy", "0.35em")
//           //               .style("font", "10px sans-serif")
//           //               .text(function(d) { return d[0].key; })
//           //               console.log(lines);
//
//
//       Ag.append("g")
//           .attr("transform", "translate(0," + height + ")")
//           .call(d3.axisBottom(x))
//           .select(".domain")
//           .remove();
//
//       Ag.append("g")
//           .call(d3.axisLeft(y))
//           .append("text")
//           .attr("fill", "#000")
//           .attr("transform", "rotate(-90)")
//           .attr("y", 6)
//           .attr("dy", "0.71em")
//           .attr("text-anchor", "end")
//           .text("Rate of New Entrepreneurs by age");
//
//
//     // enducation line chart by enducation
//               var enducationSvg = d3.select("#enducationSvg"),
//                   enducationmargin = {top: 20, right: 150, bottom: 30, left: 160},
//                   width = +enducationSvg.attr("width") - enducationmargin.left - enducationmargin.right,
//                   height = +enducationSvg.attr("height") - enducationmargin.top - enducationmargin.bottom,
//                   Eg = enducationSvg.append("g").attr("transform", "translate(" + enducationmargin.left + "," + enducationmargin.top + ")");
//
//
//               var Ex = d3.scaleTime()
//                   .rangeRound([0, width]);
//
//               var Ey = d3.scaleLinear()
//                   .rangeRound([height, 0]);
//
//               var Eline = d3.line()
//                   .x(function(d) { return x(d.Year); })
//                   .y(function(d) { return y(d.value); });
//
//               var enducationData = [];
//               enducationData.push(RateData.map(function(d) {
//                 return {
//                   Year: d.Year,
//                   key: "20to34",
//                   value: d["20to34"]
//                 }
//               }));
//               enducationData.push(RateData.map(function(d) {
//                 return {
//                   Year: d.Year,
//                   key: "Low",
//                   value: d.Low
//                 }
//               }));
//               enducationData.push(RateData.map(function(d) {
//                 return {
//                   Year: d.Year,
//                   key: "HighSchool",
//                   value: d.HighSchool
//                 }
//               }));
//               enducationData.push(RateData.map(function(d) {
//                 return {
//                   Year: d.Year,
//                   key: "College",
//                   value: d.College
//                 }
//               }));
//               enducationData.push(RateData.map(function(d) {
//                 return {
//                   Year: d.Year,
//                   key: "Graduate",
//                   value: d.Graduate
//                 }
//               }));
//
//
//               // console.log(enducationData);
//
//               x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//               y.domain([0.1,0.7]);
//
//               var Elines = Eg.selectAll("path")
//                 .data(enducationData);
//
//               Elines.enter().append("path")
//                 .attr("d", Eline)
//                     .attr("fill", "none")
//                     .attr("stroke", "steelblue")
//                     .attr("stroke-linejoin", "round")
//                     .attr("stroke-linecap", "round")
//                     .attr("stroke-width", 3)
//                     .attr("opacity",0)
//                     .on("mouseover", function(d){
//                         d3.select(this)
//                           .transition()
//                           .duration(500)
//                           .attr("stroke-width", 10)
//                           .attr("stroke", "#E2C93F")
//                         })
//
//                     .on("mouseout", function(){
//                         d3.select(this)
//                         .transition()
//                         .duration(500)
//                         .attr("stroke-width", 3)
//                         .attr("stroke", "steelblue");
//                       })
//                     .transition()
//                       .duration(2000)
//                       .attr("opacity",1);
//
//                 Eg.append("g")
//                     .attr("transform", "translate(0," + height + ")")
//                     .call(d3.axisBottom(x))
//                     .select(".domain")
//                     .remove();
//
//                 Eg.append("g")
//                     .call(d3.axisLeft(y))
//                     .append("text")
//                     .attr("fill", "#000")
//                     .attr("transform", "rotate(-90)")
//                     .attr("y", 6)
//                     .attr("dy", "0.71em")
//                     .attr("text-anchor", "end")
//                     .text("Rate of New Entrepreneurs by Enducation");
//
//         // gender line chart by gender
//                 var genderSvg = d3.select("#genderSvg"),
//                     gendermargin = {top: 20, right: 150, bottom: 30, left: 160},
//                     width = +genderSvg.attr("width") - gendermargin.left - gendermargin.right,
//                     height = +genderSvg.attr("height") - gendermargin.top - gendermargin.bottom,
//                     Gg = genderSvg.append("g").attr("transform", "translate(" + gendermargin.left + "," + gendermargin.top + ")");
//
//
//                 var Gx = d3.scaleTime()
//                     .rangeRound([0, width]);
//
//                 var Gy = d3.scaleLinear()
//                     .rangeRound([height, 0]);
//
//                 var Gline = d3.line()
//                     .x(function(d) { return x(d.Year); })
//                     .y(function(d) { return y(d.value); });
//
//                 var genderData = [];
//                     genderData.push(RateData.map(function(d) {
//                        return {
//                          Year: d.Year,
//                          key: "Male",
//                          value: d.Male
//                        }
//                       }));
//                     genderData.push(RateData.map(function(d) {
//                         return {
//                           Year: d.Year,
//                           key: "Female",
//                           value: d.Female
//                          }
//                         }));
//
//
//                 //  console.log(genderData);
//
//                  x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//                  y.domain([0.1,0.5]);
//
//                  var Glines = Gg.selectAll("path")
//                     .data(genderData);
//
//                   Glines.enter().append("path")
//                         .attr("d", Gline)
//                         .attr("fill", "none")
//                         .attr("stroke", "steelblue")
//                         .attr("stroke-linejoin", "round")
//                         .attr("stroke-linecap", "round")
//                         .attr("stroke-width", 3)
//                         .attr("opacity",0)
//                         .on("mouseover", function(d){
//                             d3.select(this)
//                               .transition()
//                               .duration(500)
//                               .attr("stroke-width", 10)
//                               .attr("stroke", "#E2C93F")
//                             })
//                         .on("mouseout", function(){
//                             d3.select(this)
//                             .transition()
//                             .duration(500)
//                             .attr("stroke-width", 3)
//                             .attr("stroke", "steelblue");
//                           })
//                         .transition()
//                           .duration(2000)
//                           .attr("opacity",1);
//                  Gg.append("g")
//                         .attr("transform", "translate(0," + height + ")")
//                         .call(d3.axisBottom(x))
//                         .select(".domain")
//                         .remove();
//
//                   Gg.append("g")
//                         .call(d3.axisLeft(y))
//                         .append("text")
//                         .attr("fill", "#000")
//                         .attr("transform", "rotate(-90)")
//                         .attr("y", 6)
//                         .attr("dy", "0.71em")
//                         .attr("text-anchor", "end")
//                         .text("Rate of New Entrepreneurs by Gender");
//
//     // nativity line chart by nativity
//                 var nativitySvg = d3.select("#nativitySvg"),
//                     nativitymargin = {top: 20, right: 150, bottom: 30, left: 160},
//                     width = +nativitySvg.attr("width") - nativitymargin.left - nativitymargin.right,
//                     height = +nativitySvg.attr("height") - nativitymargin.top - nativitymargin.bottom,
//                     nativityG = nativitySvg.append("g").attr("transform", "translate(" + nativitymargin.left + "," + nativitymargin.top + ")");
//
//
//                 var nativityX = d3.scaleTime()
//                     .rangeRound([0, width]);
//
//                 var nativityyY = d3.scaleLinear()
//                     .rangeRound([height, 0]);
//
//                 var nativityLine = d3.line()
//                     .x(function(d) { return x(d.Year); })
//                     .y(function(d) { return y(d.value); });
//
//                 var nativityData = [];
//                     nativityData.push(RateData.map(function(d) {
//                        return {
//                          Year: d.Year,
//                          key: "Native",
//                          value: d.Native
//                        }
//                       }));
//                     nativityData.push(RateData.map(function(d) {
//                         return {
//                           Year: d.Year,
//                           key: "Immigrant",
//                           value: d.Immigrant
//                          }
//                         }));
//
//
//                 //  console.log(nativityData);
//
//                  x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//                  y.domain([0.1,0.7]);
//
//                  var nativityLines = nativityG.selectAll("path")
//                     .data(nativityData);
//
//                   nativityLines.enter().append("path")
//                         .attr("d", nativityLine)
//                         .attr("fill", "none")
//                         .attr("stroke", "steelblue")
//                         .attr("stroke-linejoin", "round")
//                         .attr("stroke-linecap", "round")
//                         .attr("stroke-width", 3)
//                         .attr("opacity",0)
//                         .on("mouseover", function(d){
//                             d3.select(this)
//                               .transition()
//                               .duration(500)
//                               .attr("stroke-width", 10)
//                               .attr("stroke", "#E2C93F")
//                             })
//
//                         .on("mouseout", function(){
//                             d3.select(this)
//                             .transition()
//                             .duration(500)
//                             .attr("stroke-width", 3)
//                             .attr("stroke", "steelblue");
//                           })
//                         .transition()
//                           .duration(2000)
//                           .attr("opacity",1);
//                  nativityG.append("g")
//                         .attr("transform", "translate(0," + height + ")")
//                         .call(d3.axisBottom(x))
//                         .select(".domain")
//                         .remove();
//
//                   nativityG.append("g")
//                         .call(d3.axisLeft(y))
//                         .append("text")
//                         .attr("fill", "#000")
//                         .attr("transform", "rotate(-90)")
//                         .attr("y", 6)
//                         .attr("dy", "0.71em")
//                         .attr("text-anchor", "end")
//                         .text("Rate of New Entrepreneurs by Nativity");
//
//  // race line chart by race
//                 var raceSvg = d3.select("#raceSvg"),
//                     racemargin = {top: 20, right: 150, bottom: 30, left: 160},
//                     width = +raceSvg.attr("width") - racemargin.left - racemargin.right,
//                     height = +raceSvg.attr("height") - racemargin.top - racemargin.bottom,
//                     Rg = raceSvg.append("g").attr("transform", "translate(" + racemargin.left + "," + racemargin.top + ")");
//
//
//                 var Rx = d3.scaleTime()
//                     .rangeRound([0, width]);
//
//                 var Ry = d3.scaleLinear()
//                     .rangeRound([height, 0]);
//
//                 var Rline = d3.line()
//                     .x(function(d) { return x(d.Year); })
//                     .y(function(d) { return y(d.value); });
//
//                 var raceData = [];
//                     raceData.push(RateData.map(function(d) {
//                        return {
//                          Year: d.Year,
//                          key: "White",
//                          value: d.White
//                        }
//                       }));
//                     raceData.push(RateData.map(function(d) {
//                          return {
//                            Year: d.Year,
//                            key: "Black",
//                            value: d.Black
//                          }
//                         }));
//                      raceData.push(RateData.map(function(d) {
//                            return {
//                              Year: d.Year,
//                              key: "Latino",
//                              value: d.Latino
//                            }
//                           }));
//                       raceData.push(RateData.map(function(d) {
//                              return {
//                                Year: d.Year,
//                                key: "Asian",
//                                value: d.Asian
//                              }
//                             }));
//
//
//
//                 //  console.log(raceData);
//
//                  x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//                  y.domain([0.1,0.6]);
//
//                  var Rlines = Rg.selectAll("path")
//                     .data(raceData);
//
//                   Rlines.enter().append("path")
//                         .attr("d", Rline)
//                         .attr("fill", "none")
//                         .attr("stroke", "steelblue")
//                         .attr("stroke-linejoin", "round")
//                         .attr("stroke-linecap", "round")
//                         .attr("stroke-width", 3)
//                         .attr("opacity",0)
//                         .on("mouseover", function(d){
//                             d3.select(this)
//                               .transition()
//                               .duration(500)
//                               .attr("stroke-width", 10)
//                               .attr("stroke", "#E2C93F")
//                             })
//
//                         .on("mouseout", function(){
//                             d3.select(this)
//                             .transition()
//                             .duration(500)
//                             .attr("stroke-width", 3)
//                             .attr("stroke", "steelblue");
//                           })
//                         .transition()
//                           .duration(2000)
//                           .attr("opacity",1);
//                  Rg.append("g")
//                         .attr("transform", "translate(0," + height + ")")
//                         .call(d3.axisBottom(x))
//                         .select(".domain")
//                         .remove();
//
//                   Rg.append("g")
//                         .call(d3.axisLeft(y))
//                         .append("text")
//                         .attr("fill", "#000")
//                         .attr("transform", "rotate(-90)")
//                         .attr("y", 6)
//                         .attr("dy", "0.71em")
//                         .attr("text-anchor", "end")
//                         .text("Rate of New Entrepreneurs by Race");
//
//
// // Veterans line chart by Veterans
//                 var veteranSvg = d3.select("#veteranSvg"),
//                     veteranmargin = {top: 20, right: 150, bottom: 30, left: 160},
//                     width = +veteranSvg.attr("width") - veteranmargin.left - veteranmargin.right,
//                     height = +veteranSvg.attr("height") - veteranmargin.top - veteranmargin.bottom,
//                     Vg = veteranSvg.append("g").attr("transform", "translate(" + veteranmargin.left + "," + veteranmargin.top + ")");
//
//
//                 var Vx = d3.scaleTime()
//                     .rangeRound([0, width]);
//
//                 var Vy = d3.scaleLinear()
//                     .rangeRound([height, 0]);
//
//                 var Vline = d3.line()
//                     .x(function(d) { return x(d.Year); })
//                     .y(function(d) { return y(d.value); });
//
//                 var veteranData = [];
//                     veteranData.push(RateData.map(function(d) {
//                        return {
//                          Year: d.Year,
//                          key: "Veterans",
//                          value: d.Veterans
//                        }
//                       }));
//                     veteranData.push(RateData.map(function(d) {
//                         return {
//                           Year: d.Year,
//                           key: "Non_Veterans",
//                           value: d.Non_Veterans
//                          }
//                         }));
//
//
//                 //  console.log(veteranData);
//
//                  x.domain(d3.extent(RateData, function(d) { return d.Year; }));
//                  y.domain([0.1,0.5]);
//
//                  var Vlines = Vg.selectAll("path")
//                     .data(veteranData);
//
//                   Vlines.enter().append("path")
//                         .attr("d", Vline)
//                         .attr("fill", "none")
//                         .attr("stroke", "steelblue")
//                         .attr("stroke-linejoin", "round")
//                         .attr("stroke-linecap", "round")
//                         .attr("stroke-width", 3)
//                         .attr("opacity",0)
//                         .on("mouseover", function(d){
//                             d3.select(this)
//                               .transition()
//                               .duration(500)
//                               .attr("stroke-width", 10)
//                               .attr("stroke", "#E2C93F")
//                             })
//
//                         .on("mouseout", function(){
//                             d3.select(this)
//                             .transition()
//                             .duration(500)
//                             .attr("stroke-width", 3)
//                             .attr("stroke", "steelblue");
//                           })
//                         .transition()
//                           .duration(2000)
//                           .attr("opacity",1);
//                  Vg.append("g")
//                         .attr("transform", "translate(0," + height + ")")
//                         .call(d3.axisBottom(x))
//                         .select(".domain")
//                         .remove();
//
//                   Vg.append("g")
//                         .call(d3.axisLeft(y))
//                         .append("text")
//                         .attr("fill", "#000")
//                         .attr("transform", "rotate(-90)")
//                         .attr("y", 6)
//                         .attr("dy", "0.71em")
//                         .attr("text-anchor", "end")
//                         .text("Rate of New Entrepreneurs by Veteran Status");



// combine data with map
  var dataLookup = {}
  stateData.forEach(function(d){
    dataLookup[d.state_id] = d;
  });
  // console.log(dataLookup);

// set up colorscale
  var colorScale = d3.scaleLinear()
    .domain([-3.7,0,3.7])
    // .range(["#cbab99","white","steelblue"])

    .range(["#f8f6d7","#E2C93F","#8f583b"])

var portraits = d3.select("#portraits")
.attr("width", window.innerWidth);

// draw a map
  d3.json("usa.json", function(error,data){
    // console.log(data);
    var geoJSON = topojson.feature(data, data.objects.states);
    // console.log(geoJSON);

    var proj = d3.geoAlbersUsa()
      .fitSize([window.innerWidth/1.5, window.innerHeight/1.5], geoJSON);

    var path = d3.geoPath()
      .projection(proj);


      var MapSvg = d3.select("#mysvg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

      var states = MapSvg.selectAll("path")
        .data(geoJSON.features);

        function myFill(d) {
          var mydata = dataLookup[d.id];
          if (mydata != undefined) {
            var color = colorScale(mydata["INDEX"]);
            return color;
          }
        }


        states.enter().append("path")
          .attr("d", function(d) {
            return path(d);
          })

          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .attr("fill", function(d,i) {
            return myFill(d);
          })
          .on("mouseover", function(d,i) {
            var mydata = dataLookup[d.id];
            d3.select(this)
            .attr("fill", "#4c363a")
            // .attr("stroke", "#52331b")
            // .attr("stroke-width",4);
            var tooltip= d3.select('.tooltip');
                tooltip.transition()
                       .style('opacity',0.7)
                       .style("left", (d3.event.pageX)+ 100 + "px")
                       .style("top", (d3.event.pageY) + "px")
                       .style("display", "block");

                 d3.select(this)
                   .transition()
                   .duration(500)

                      tooltip
                              .select('.tipStates')
                              .text(mydata.NAME);
                      tooltip
                              .select('.tipIndex')
                              .text("Index:" + mydata.INDEX);
                      tooltip
                              .select('.tipRate')
                              .text("Rate of New Entrepreneurs: " + mydata.RATE + "%");
                      tooltip
                              .select('.tipOpportunity')
                              .text("Opportunity Share of New Entrepreneurs: " + mydata.OPPORTUNITY + "%");
                      tooltip
                              .select('.tipDensity')
                              .text("Startup Density: " + mydata.DENSITY);





        })

      .on("mouseout", function(d,i) {
          d3.select(this)
          // .attr("stroke", myFill(d))
          //   .attr("stroke-width", 2)
          .attr("fill", myFill(d));
          tooltip.transition()
                 .style('opacity',0);
        });

        // d3.select("#colorRect")
        //   .attr("fill",colorScale);


  });


  });
