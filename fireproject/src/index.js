import * as d3 from 'd3';
import './style/mainViz.css';
import dotsGroup from './components/dotsgraphic';
// import mapGroup from './components/mapgraphic';
// import mapgraphic from './components/mapgraphic';

const dots_group = dotsGroup(document.querySelector('.viewOne') );
// const map_group = mapGroup(document.querySelector('#map') );

//lede graphic of headlines
//设置题目
// var graphic_title = "十年火灾";

//设置宽度为lede-graphic这个id的宽度，parseInt解析string并取整数
var body_width = parseInt(d3.select("#lede-graphic").style("width"));//？？？
// var body_width = window.innerWidth;//
var body_height = window.innerHeight;//设置高度为屏幕高度
var div_width = parseInt(d3.select("#lede-graphic").style("width"));


var mobile_threshold = 500,
  tablet_threshold = 775;

d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this);
  });
}; //每次新的语句都是出现在前面


//make all the heds visible on resize
function showHeds() {
  d3.selectAll(".headline")
    .style("opacity", function (d) {
      return 0.5;
    });
} //此时headline是没有的，设置有的话其透明度为0.5

function hedGraphic(firedata) {
  d3.select("#lede-graphic > svg").remove();//？？？
  var margin = {
    top: 20,
    right: 5,
    bottom: 5,
    left: 5
  };

  var width = body_width - margin.left - margin.right;

  var height = body_height - margin.top - margin.bottom;

  var svg = d3.select("#lede-graphic")//选取index里lede-graphic的部分
    .append("svg")
		.attr("class","lede-graphic-svg")
    .attr("width", width + margin.left + margin.right)//svg的宽度为整个屏幕的宽度
    .attr("height", height + margin.top + margin.bottom)//svg的高度为整个屏幕的高度
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");//生成g element并使其位置往右下移动

  var heds = svg.append("g")
    .attr("class", "headline")//给g里面赋予headline的元素，此时才有headline这个元素生成
    .selectAll(".hed")//hed是什么？？？
    .data(firedata.filter(function (d) {
      return d.year != null & d.year != "";
						 d.month != null & d.month != "";
						 d.day != null & d.day != "";
						 d.hour != null & d.hour != "";
    }))//给予数据，并把空的从数据里除去
		// .data(firedata)
    .enter()
    .append("text")
    .attr("class", "headline")
    .attr("x", function (d, i) {
      //make sure the first one is nicely placed
      //otherwise random
      if (i == 0) {
        return width * 0.25;
      } else {
        return Math.random() * (width * 0.6);
      }
    })//定义x的位置
    .attr("y", function (d, i) {
      if (i == 0) {
        return height / 3;
      } else {
        return Math.random() * (height - 20);
      }
    })//定义y的位置
    .html(function (d) {
      return d.year+"年"+d.month+"月"+d.day+"日"+d.hour+"时"+d.where+"发生火灾";
    })//写上字
    .style("opacity", 0)

    //开始做动画
  function animateHeds() {
    heds.transition()//heds是所有headline的一个selection
      .delay(function (d, i) {
        if (i < 30) {
          return i * 1000;
        } else {
          return i * 500;
        }//为什么这么设置？？
      })//延迟
      .duration(1000)
      .ease(d3.easeLinear)//线性渐变，过渡
      .style("opacity", 0.7)//变成透明度为1
      .transition()
      .delay(function (d, i) {
        //return i * 1000;
        return 250;//为什么这么设置？？
      })//延迟
      .duration(2000)
      .ease(d3.easeLinear)
      .style("opacity", 0.04);//透明度变小
  }

  // if (div_width <= mobile_threshold) {
  //   svg.append("text")
  //     .attr("x", width / 2)
  //     .attr("y", (height / 2) - 20)
  //     .attr("class", "article-title")
  //     .style("fill", "#ffffff")
  //     .attr("text-anchor", "middle")
  //     .html("#MeToo:")//改！！！！
  //
  //   svg.append("text")
  //     .attr("x", width / 2)
  //     .attr("y", (height / 2) + 20)
  //     .attr("class", "article-title")
  //     .style("fill", "#ffffff")
  //     .attr("text-anchor", "middle")
  //     .html("One Year Later")
  //
  // } else {
  //   svg.append("text")
  //     .attr("x", width / 2)
  //     .attr("y", height / 2)
  //     .attr("class", "article-title")
  //     .style("fill", "#fff")
  //     .attr("text-anchor", "middle")
  //     .html(graphic_title)
  // }


  animateHeds();
}

d3.csv('./data/firedata.csv', function (error, firedata) {
  if (error) throw error;

// console.log(firedata);

  hedGraphic(firedata);
  dots_group(firedata);
  // map_group(firedata);
});

	//ScrollMagic
const Scrollmagic = require('scrollmagic');

const controller = new Scrollmagic.Controller();

const _w = document.getElementById('random-dots').clientWidth;
const _h = document.getElementById('random-dots').clientHeight;

// create a scene
// const scene1 = new Scrollmagic.Scene({
//     triggerElement:'#disappear-lede'
//   })
//   .on('enter', () => {
//     console.log('Scene-1:enter')
//     //change forceX and forceY
//     d3.select('#lede-graphic')
//       .transition()
//       .duration(1000)
//       .style('opacity',0)
//       .style('z-index',-10);
//   })
//   .on('leave', () => {
//     console.log('Scene-1:end')
//     d3.select('#lede-graphic')
//       .transition()
//       .duration(1000)
//       .style('opacity',1)
//       .style('z-index',10);
//
//   })
//   .addTo(controller);
const scene1 = new Scrollmagic.Scene({
    triggerElement:'#show-dots'
  })
  .on('enter', () => {
    console.log('Scene-1:enter')
    // change forceX and forceY
    d3.select('.dots-group-svg')
      .transition()
      .duration(800)
      .style('opacity',1);
  })
  .on('leave', () => {
    console.log('Scene-1:end')
    d3.select('.dots-group-svg')
      .transition()
      .duration(1000)
      .style('opacity',0);

  })
  .addTo(controller);

	const scene2 = new Scrollmagic.Scene({
			triggerElement:'#dots-graphic'
		})
		.on('enter', () => {
			console.log('Scene-2:enter')
			//change forceX and forceY

			var forceX = d3.forceX(function(d){
				if (d.type=='住宅'){
					return _w/4;
				} else if(d.type=='工厂'){
					return _w/2;
				}else if(d.type=='公共'){
					return _w*3/4;
				}
			});

			var forceY = d3.forceY(function(d){
				return  _h/2;
				});

			//restart force layout, from ramdom circles to circle groups
			const dots_group1 = dots_group
					.forceX(forceX)
					.forceY(forceY)
					.restart();

      d3.select('#dots-title')
            .transition()
            .duration(1000)
            .style('opacity',1);

		})
		.on('leave', () => {
			console.log('Scene-2:end')

			//change circle groups to random
      var forceX = d3.forceX(function(d){return null}).strength(0)
      var forceY = d3.forceY(function(d){return null}).strength(0)

			const dots_group3 = dots_group
					.forceX(forceX)
					.forceY(forceY)
					.restart();

      d3.select('#dots-title')
            .transition()
            .duration(1000)
            .style('opacity',0);

		})
		.addTo(controller);

    const scene3 = new Scrollmagic.Scene({
  			triggerElement:'#just-house'
  		})
  		.on('enter', () => {
  			console.log('Scene-3:enter')

        var _mapRadius=[1,25]

        var radiusScale = d3.scaleSqrt()
            .domain([1,82])
            .range(_mapRadius);

        var _radius = function(d){
            if(d.type =='工厂'){
              return 0
            }
            if(d.type =='公共'){
              return 0
            }
            if (d.killed_injured == 129){
              return 35
            }
            if (d.killed_injured == 0){
              return 0.5
            }
            else {
              return radiusScale(d.killed_injured)
          }
        };

        d3.selectAll('.dots_group')
          .style('r',_radius);

        d3.select('#dots-title')
          .transition()
          .duration(100)
          .style('opacity',0);

  		})
  		.on('leave', () => {
  			console.log('Scene-3:end')
        var _mapRadius=[1,25]

        var radiusScale = d3.scaleSqrt()
            .domain([1,82])
            .range(_mapRadius);

        var _radius = function(d){
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

        d3.selectAll('.dots_group')
          .style('r',_radius);


        d3.select('#dots-title')
            .transition()
            .duration(1000)
            .style('opacity',1);

  		})
  		.addTo(controller);

      const scene4 = new Scrollmagic.Scene({
    			triggerElement:'#dots-day-night'
    		})
    		.on('enter', () => {
    			console.log('Scene-4:enter')

          var _opacity=function(d){
            // console.log(d.hour)
            var d_hour=parseInt(d.hour);
            if(d_hour == 22||d_hour == 23||d_hour == 24||d_hour == 0||d_hour == 1||d_hour == 2
                ||d_hour == 3||d_hour == 4||d_hour == 5){
              return 1;
             }
            else{
              return 0.1;
             }
           };

          d3.selectAll('.dots_group')
                .style('opacity',_opacity);

          d3.selectAll('#highlight-sentence-one')
                .style('background-color', 'rgba(124,140,117,0.6)');
    		})
    		.on('leave', () => {
    			console.log('Scene-4:end')

          d3.selectAll('.dots_group')
            .style('opacity',1);

            d3.selectAll('#highlight-sentence-one')
                  .style('background-color', '#eeeee5');
    		})
    		.addTo(controller);

        const scene5 = new Scrollmagic.Scene({
            triggerElement:'#dots-winter'
          })
          .on('enter', () => {
            console.log('Scene-5:enter')

            var _opacity=function(d){
              if(d.month == 1){return 1}
              if(d.month == 2){return 1}
              if(d.month == 12){return 1}
              else{return 0.1;}
            };

            d3.selectAll('.dots_group')
              .style('opacity',_opacity);

            d3.selectAll('#highlight-sentence-two')
                  .style('background-color', 'rgba(56,76,111,0.6)');
                  // .style('opacity', 0.);'#8696a7'

          })
          .on('leave', () => {
            console.log('Scene-5:end')

            var _opacity=function(d){
              // console.log(d.hour)
              var d_hour=parseInt(d.hour);
              if(d_hour == 22||d_hour == 23||d_hour == 24||d_hour == 0||d_hour == 1||d_hour == 2
                  ||d_hour == 3||d_hour == 4||d_hour == 5){
                return 1;
              }
              else{
                return 0.1;
              }
            };

              d3.selectAll('.dots_group')
                .style('opacity',_opacity);

              d3.selectAll('#highlight-sentence-two')
                    .style('background-color', '#eeeee5');

          })
          .addTo(controller);

          const scene6 = new Scrollmagic.Scene({
              triggerElement:'#dots-up'
            })
            .on('enter', () => {
              console.log('Scene-6:enter')

              d3.selectAll('.viewOne')
                    .style('position', 'absolute');

            })
            .on('leave', () => {
              console.log('Scene-6:end')

                d3.selectAll('.viewOne')
                        .style('position', 'fixed');

            })
            .addTo(controller);
