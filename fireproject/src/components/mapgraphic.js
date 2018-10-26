import * as d3 from 'd3';
import '../style/mainViz.css';
import textures from 'textures';


function mapGroup(_){
const dom = document.getElementById("map");
const myChart = echarts.init(dom);
const app = {};

function exports(firedata){

  d3.csv('./data/firedata.csv', function (error, firedata) {
    if (error) throw error;
  option = null;

  _mapRadius=[8,55]

 radiusScale = d3.scaleSqrt()
      .domain([0,200])
      .range(_mapRadius);

      function myFill(d) {
                if(d.month == 1){return '#372328'}
                if(d.month == 2){return '#372328'}
                if(d.month == 12){return '#372328'}
                if(d.month == 3){return "#25364e"}
                if(d.month == 4){return "#25364e"}
                if(d.month == 5){return "#25364e"}
                if(d.month == 6){return "#255a3b"}
                if(d.month == 7){return "#255a3b"}
                if(d.month == 8){return "#255a3b"}
                else{return "#d8c6b0";}
            }

  filterData = firedata.filter(function(d){return d.type =='工厂';});

 const dataByWhere=filterData.map(function(d) {
     return {
       name: d.province,
       value: [d.longtitude,d.latitude,d.killed_injured],
       kill:d.killed_injured
     }
   });



   function tooltipData(data) {
       var end_obj = [];
       for (var i in data) {
           var obj = {name: '',value: [], datas: []};
           obj.name = data[i].where;
           obj.value[0] =data[i]['longtitude'];
          obj.value[1] = data[i]['latitude'];
          obj.value[2] = data[i]['killed_injured'];
          obj.value[3] = data[i]['month'];
           obj.datas[0] =data[i]['year'];
           obj.datas[1] = data[i]['province'];
           obj.datas[2] = data[i]['killed_injured'];
           obj.datas[3] = data[i]['reason'];
           obj.datas[4] =data[i]['month'];
           obj.datas[5] =data[i]['day'];
           end_obj.push(obj);
       }
       return end_obj;
     }

 console.log(tooltipData(filterData));

   filterTopData = filterData.sort(function (a, b) {
       return b.killed_injured - a.killed_injured;
   }).slice(0, 6);

 console.log(filterTopData);
 console.log(tooltipData(filterTopData));

 // console.log(filterTopData);

 function renderItem(params, api) {
     var coords = [
         [113.565309,22.232613],//广东申通
         [116.332857,23.280017],//广东文胸
         [121.374867,28.452415],//浙江温岭
         [124.05636,41.813243],//辽宁
         [116.28686,37.440784],//山东
         [119.963578,31.851932],
         [118.16915,28.00347]//福建

     ];
     var points = [];
     for (var i = 0; i < coords.length; i++) {
         points.push(api.coord(coords[i]));
     }

     console.log(points);
     // var color = api.visual('color');
     var color = "#eee7d4";

     return {
         type: 'polygon',
         shape: {
             points: echarts.graphic.clipPointsByRect(points, {
                 x: params.coordSys.x,
                 y: params.coordSys.y,
                 width: params.coordSys.width,
                 height: params.coordSys.height,
             }
           )
         },

         style: api.style({
             fill: color,
             stroke: echarts.color.lift(color)
         })
     };
 }

  option = {
 //  backgroundColor: '#000',
  title: {
     text: '中国十年火灾',
     subtext: 'data from PM25.in',
     sublink: 'http://www.pm25.in',
     left: 'center',
     textStyle: {
         color: '#fff'
     }
  },//整个图标的标题
  tooltip : {
       trigger: 'item',
     formatter: function (a) {
           return `<div class="toolDiv">${'地点：'+a['name']+
           '<br>时间：'+a['data'].datas[0]+'/'+a['data'].datas[4]+
           '/'+a['data'].datas[5]+'<br>伤亡人数：'+a['data'].datas[2]+
           '<br>起火原因：'+a['data'].datas[3]+','+a['data'].value[0]+','+a['data'].value[1]}</div>`
     },
   },
  bmap: {
     center: [104.114129, 37.550339],
     zoom: 5,
     roam: true,
     mapStyle: {
         styleJson: [
                 {
                     "featureType": "water",
                     "elementType": "all",
                     "stylers": {
                           "color": "#424443"
                         // "color": "#000"
                     }
                 },
                 {
                     "featureType": "land",
                     "elementType": "all",
                     "stylers": {
                           // "color": "#eee7d4"
                         // "color": "#424443"
                         "color": '#191919'
                     }
                 },
                 {
                     "featureType": "boundary",
                     "elementType": "geometry",
                     "stylers": {
                           "color": "#615a57"
                         // "color": "#000"
                     }
                 },
                 {
                     "featureType": "railway",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "highway",
                     "elementType": "geometry",
                     "stylers": {
                           "color": "#615a57"
                         // "color": "#000"
                     }
                 },
                 {
                     "featureType": "highway",
                     "elementType": "geometry.fill",
                     "stylers": {
                           "color": "#615a57",
                         // "color": "#000",
                         "lightness": 1
                     }
                 },
                 {
                     "featureType": "highway",
                     "elementType": "labels",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "arterial",
                     "elementType": "geometry",
                     "stylers": {
                       "color": "#615a57"
                     }
                 },
                 {
                     "featureType": "arterial",
                     "elementType": "geometry.fill",
                     "stylers": {
                       // "color": "#000"
                           "color": "#615a57"
                     }
                 },
                 {
                     "featureType": "poi",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "green",
                     "elementType": "all",
                     "stylers": {
                       // "color": "#000",
                           "color": "#615a57",
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "subway",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "manmade",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "local",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "arterial",
                     "elementType": "labels",
                     "stylers": {
                         "visibility": "off"
                     }
                 },
                 {
                     "featureType": "boundary",
                     "elementType": "geometry.fill",
                     "stylers": {
                       // "color": "#000"
                           "color": "#615a57"
                     }
                 },
                 {
                     "featureType": "building",
                     "elementType": "all",
                     "stylers": {
                       // "color": "#000"
                           "color": "#615a57"
                     }
                 },
                 {
                     "featureType": "label",
                     "elementType": "all",
                     "stylers": {
                         "visibility": "off"
                     }
                 }
         ]
     }
  },//定义地图上各种零件的颜色等
  series : [
     {
         name: '伤亡人数',
         type: 'scatter',
         coordinateSystem: 'bmap',
         // data: dataByWhere,
         data:tooltipData(filterData),
         symbolSize:function(val){
                if (val[2]==963){
                  return val[2] / 8
                }
               //  if (val[2]==297){
               // 	 return val[2] / 6
               //  }
                if (val[2]==0){
                 return 6
               }
                else {
                  return radiusScale(val[2])
              }
            },
         label: {
             normal: {
               // opacity:1,
               data: dataByWhere,
               formatter:function(a){
               return (a['data'].datas[1]);
             },
                 position: 'right',
                 show: false,
                 color:'#ffffff'
             },
             emphasis: {
                 show: true
             }
         },


         itemStyle: {
             normal: {
                 // color: '#ddb926'

                 data: dataByWhere,
                 color:function (a) {
                   // console.log(a['data'].value[3]);
                           if(a['data'].value[3] == 1){return '#372328'}
                           if(a['data'].value[3] == 2){return '#372328'}
                           if(a['data'].value[3] == 12){return '#372328'}
                           if(a['data'].value[3] == 3){return '#25364e'}
                           if(a['data'].value[3] == 4){return '#25364e'}
                           if(a['data'].value[3] == 5){return "#25364e"}
                           if(a['data'].value[3] == 6){return "#255a3b"}
                           if(a['data'].value[3] == 7){return "#255a3b"}
                           if(a['data'].value[3] == 8){return "#255a3b"}
                           else{return "#d8c6b0"}
                       }
             }
         }
     },
     {
         name: 'Top 5',
         type: 'effectScatter',
         coordinateSystem: 'bmap',
         // data: filterTopData,//取前五
         data:tooltipData(filterTopData),
          symbolSize:function(val){
            if (val[2]==963){
              return val[2] / 8
            }
               if (val[2]==0){
                return 6
              }
               else {
                 return radiusScale(val[2])
             }
           },
         // symbolSize:3,
         showEffectOn: 'emphasis',
         rippleEffect: {
             brushType: 'stroke'
         },
         hoverAnimation: true,
         label: {
             normal: {
               // opacity:1,
               formatter:function(a){
                 return (a['data'].datas[1]);
               },
                 position: 'right',
                 color:'#ffffff',
                 show: true
             }
         },

         itemStyle: {
             normal: {
                 // 	color: '#f4e925',
                 color:function (a) {
                   // console.log(a['data'].value[3]);
                           if(a['data'].value[3] == 1){return '#372328'}
                           if(a['data'].value[3] == 2){return '#372328'}
                           if(a['data'].value[3] == 12){return '#372328'}
                           if(a['data'].value[3] == 3){return '#25364e'}
                           if(a['data'].value[3] == 4){return '#25364e'}
                           if(a['data'].value[3] == 5){return "#25364e"}
                           if(a['data'].value[3] == 6){return "#255a3b"}
                           if(a['data'].value[3] == 7){return "#255a3b"}
                           if(a['data'].value[3] == 8){return "#255a3b"}
                           else{return "#d8c6b0"}
                       },
                 opacity:0.5,
                 shadowBlur: 10,
                 shadowColor: '#333'
             }
         },
         zlevel: 1
     },
     {
         type: 'custom',
         coordinateSystem: 'bmap',
         renderItem: renderItem,
         itemStyle: {
             normal: {
                 opacity: 0.5
             }
         },
         animation: false,
         silent: true,
         data: [0],
         z: -10
     }
  ]
  };

  if (option && typeof option === "object") {
  myChart.setOption(option, true);
  }

 });

}


}

export default mapGroup;
