import * as d3 from 'd3';
import '../style/mainViz.css';
import textures from 'textures';

function dotsGroup(_){

  let _w;
  let _h;
  let _color;
  let radiusScale;
  let tooltip;
  let _forceX;
  let _forceY;
  // let force;
  let _forceManyBody;
  let _strength;
  let _mapRadius;
  let _radius;

  let eventsData;
  let filterData;


  //Force layout related
	const force = d3.forceSimulation();
	//Define some forces
	// const collide = d3.forceCollide().radius(d => d.r + 2);
  const forceCollide = d3.forceCollide()
    .radius(function(d){
      if (d.killed_injured == 963){
        return 58
      }
      if (d.killed_injured == 197){
        return 45
      }
      if (d.killed_injured == 129){
        return 38
      }
      if (d.killed_injured == 108){
        return 33
      }
      if (d.killed_injured == 0){
        return 3.5
      }
      else {
        return radiusScale(d.killed_injured)+3
    }
    })
    .iterations(1);

  // const forceCollide = d3.forceCollide()
  // .radius(function(d){
  //   return radiusScale(d.killed_injured)+2
  // })
  // .iterations(1);

	const radial = d3.forceRadial();


 //define projection
  const scaleSqrt = d3.scaleSqrt()
  const projection = d3.geoMercator()
    .scale(100)
    .center([300, 80]);//???


   function exports(firedata){

     _w = _.clientWidth;
     _h = _.clientHeight;

    function myFill(d) {
              if(d.month == 1||d.month == 2||d.month == 12){return '#384c6f'}
              if(d.month == 3||d.month == 4||d.month == 5){return "#9cac81"}
              if(d.month == 6||d.month == 7||d.month == 8){return '#ac6a54'}
              else{return "#ebd184";}
          };

    //define radiusScale
     _mapRadius=[1,25]

     radiusScale = d3.scaleSqrt()
       .domain([1,82])
       .range(_mapRadius);

   // import and manipulate data
     eventsData = firedata.map(fire => {
       const [mx,my] = projection([fire.longtitude, fire.latitude]);
       return {
         x:Math.random()*_w,
         y:Math.random()*_h,
         mx,
         my,
         ...fire
       }
     });

  console.log(eventsData);


  //append circles
    const root = d3.select(_);

    let svg = root
      .selectAll('.dots-group-svg')
      .data([1]);

    svg = svg.enter().append('svg')
      .attr('class','dots-group-svg')
      .merge(svg)
      .attr('width',_w)
      .attr('height',_h)
      .attr('left',0)
      .style('position','absolute');



  //Draw the states to <svg>
  	const dotsNodes = svg.selectAll('.events')
      .data(eventsData,d => d.id);
  			// .data(filterData,d => d.id);


  	const dotsNodesEnter = dotsNodes.enter()
  			.append('g')
  			.attr('class','events');

      _color = function(d,i){return myFill(d);};
      _radius = function(d){
          if (d.killed_injured == 963){
            return 55
          }
          if (d.killed_injured == 197){
            return 42
          }
          if (d.killed_injured == 129){
            return 35
          }
          if (d.killed_injured == 108){
            return 30
          }
          if (d.killed_injured == 0){
            return 0.5
          }
          else {
            return radiusScale(d.killed_injured)
        }
      };

      // _radius = function(d){
      //       return radiusScale(d.killed_injured)
      // };

// dotsNodesEnter.append('text').text(d => d.state);


  //add textures, tooltip and highlight to circles
  		dotsNodesEnter
        .append('circle')
        .attr('class','dots_group')
        .attr('r',_radius)
        .style('fill',_color)
        .classed('active',false)
        .on('click', function(d, i){
          const isActive = d3.select(this).classed('active');
          // console.log(isActive);
          let t = textures.lines()
              .size(6)
              .stroke('white')
              // .background(function(d) {
              //   if (d.success == '0'){return '#827370'}
              //   else {return myFill(d);}
              //   })
              .background(myFill(d))
              .strokeWidth(3);

          svg.call(t);

          if (isActive === false){
            d3.select(this).style('fill',t.url());
            d3.select(this).classed('active',true);
           }
         else {
            d3.select(this).style('fill',_color);
            d3.select(this).classed('active',false);
           }

        })

        .on("mouseover", function(d) {
            d3.select(this)
            .attr("stroke", "#000")
            .attr("stroke-width",3);

              tooltip= d3.select('.tooltip');
                tooltip.transition()
                       .style('opacity',0.8)
                       .style("left", (d.x - 150) + "px")
                       .style("top", (d.y+100) + "px")
                       .style("display", "block")
                       .style("pointer-events", "none");

                    tooltip
                            .select('.tipProvince')
                            .text(d.province);
                    tooltip
                            .select('.tipDate')
                            .text(d.year+ '/' + d.month + '/' + d.day);

                    tooltip
                            .select('.tipTime')
                            .text(d.hour+ '时' + d.min + '分');

                    tooltip
                            .select('.tipWhere')
                            .text('地点：' + d.where);
                    tooltip
                            .select('.tipToll')
                            .text('伤亡人数：' + d.killed_injured);
                    tooltip
                            .select('.tipReason')
                            .text('起火原因：' + d.reason);
                              })

          .on("mouseout", function(d,i) {
          tooltip.transition()
                 .style('opacity',0);
                 d3.select(this)
                 .attr("stroke-width",0);
        //  d3.select(this)
        //    .style('fill',function(d,i){return _color(i)} );
          });


  		const bubbles = dotsNodesEnter
  			.merge(dotsNodes)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);


        // _forceX=_w/2;
        // _forceY=_h/2;

       radial
       			.x(_forceX)
       			.y(_forceY)
       			.radius(10);

            _forceManyBody = 500
            _strength = -4
   		force //the simulation
   			.force('collide',forceCollide)
        .force("gravity",d3.forceManyBody(_forceManyBody).strength(_strength)) //
   			.force('radial',radial)
   			.alpha(1)
   			.on('tick',tick)
        .nodes(eventsData);
       		// 	.nodes(filterData);

    //       //add state names to each circle group
    // firedata.forEach(function(d) {
    //   svg.append("text")
    //    .attr("class","dotsExplanation")
    //    .attr("x",d.x )
    //    .attr("y",d.y + 50)
    //    .attr("text-anchor","middle")
    //    .style("font-family","futura")
    //    .style('opacity',1)
    //    .style('font-size',12)
    //    .text(d.type);
    //
    // });

       function tick(){
        //  console.log('tick');
         bubbles
         .attr('transform', d => `translate(${d.x}, ${d.y})`);
       }


}

exports.mapRadius = function(_){
  if(typeof _ ==='undefined') return _mapRadius;
  _mapRadius = _;
  return this;
}

exports.Radius = function(_){
  if(typeof _ ==='undefined') return _radius;
  _radius = _;
  return this;
}

exports.forceManyBody = function(_){
  if(typeof _ ==='undefined') return _forceManyBody;
  _forceManyBody = _;
  return this;
}

exports.strength = function(_){
  if(typeof _ ==='undefined') return _strength;
  _strength = _;
  return this;
}

exports.forceX = function(_){
  if(typeof _ ==='undefined') return _forceX;
  _forceX = _;
  return this;
}

exports.forceX = function(_){
  if(typeof _ ==='undefined') return _forceX;
  _forceX = _;
  return this;
}

exports.forceY = function(_){
  if(typeof _ ==='undefined') return _forceY;
  _forceY = _;
  return this;
}

exports.timelinePosition= function(_){
  if(typeof _ ==='undefined') return _position;
  _position = _;
  return this;
}

exports.restart = function(){
  force
    .stop()
    .force("x",_forceX)
    .force("y",_forceY)
    .alpha(1)
    .restart();
  return this;
}

exports.stop = function(){
  force
    .stop();
  return this;
}


exports.changeColor = function(){
  if(typeof _ ==='undefined') return _color;
  _color = _;
  return this;
}
  return exports;

}

export default dotsGroup;
