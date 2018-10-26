import * as d3 from 'd3';
import './style/mainViz.css';

function ledeAnimation(_){

  //lede graphic of headlines
  //设置题目
  var graphic_title = "十年火灾";

  //设置宽度为lede-graphic这个id的宽度，parseInt解析string并取整数
  var body_width = parseInt(d3.select("#lede-graphic").style("width"));//？？？
  // var body_width = window.innerWidth;//
  var body_height = window.innerHeight;//设置高度为屏幕高度
  var div_width = parseInt(d3.select("#lede-graphic").style("width"));


  var mobile_threshold = 500,
    tablet_threshold = 775;//暂时没有用

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
        .style("opacity", 1)//变成透明度为1
        .transition()
        .delay(function (d, i) {
          //return i * 1000;
          return 250;//为什么这么设置？？
        })//延迟
        .duration(2000)
        .ease(d3.easeLinear)
        .style("opacity", 0.2);//透明度变小
    }

    if (div_width <= mobile_threshold) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", (height / 2) - 20)
        .attr("class", "article-title")
        .style("fill", "#ffffff")
        .attr("text-anchor", "middle")
        .html("#MeToo:")

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", (height / 2) + 20)
        .attr("class", "article-title")
        .style("fill", "#ffffff")
        .attr("text-anchor", "middle")
        .html("One Year Later")

    } else {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("class", "article-title")
        .style("fill", "#ffffff")
        .attr("text-anchor", "middle")
        .html(graphic_title)
    }


    animateHeds();
  }

};


  return exports;

}

export default ledeAnimation;
