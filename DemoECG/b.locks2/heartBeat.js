window.onload = function() {

    var svg1 = null;
    var svg2 = null;
    var svg3 = null;
    var svg4 = null;
    var latestBeat = null;
    var insideBeat = false;
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    var SECONDS_SAMPLE = 5;
    var BEAT_TIME = 400;
    var TICK_FREQUENCY = SECONDS_SAMPLE * 1000 / BEAT_TIME;
    var BEAT_VALUES1 = [0, 0, 3, -4, 10, -7, 3, 0, 0];
    var BEAT_VALUES2 = [0, 0, 0, -6, 10, -7, 0, 0, 0];
    var BEAT_VALUES3 = [0, 0, -3, 4, -10, 7, -3, 0, 0];
    var BEAT_VALUES4 = [0, 5, 3, -1, -10, -7, -1, 0, 0];

    var MAX_LATENCY = 5000;

    
    function beat() {

        if (insideBeat) return;
        insideBeat = true;

        var now = new Date();
        var nowTime = now.getTime();

        if (data1.length > 0 && data1[data1.length - 1].date > now) {
            data1.splice(data1.length - 1, 1);
        }
        if (data2.length > 0 && data2[data2.length - 1].date > now) {
            data2.splice(data2.length - 1, 1);
        }
        if (data3.length > 0 && data3[data3.length - 1].date > now) {
            data3.splice(data3.length - 1, 1);
        }
        if (data4.length > 0 && data4[data4.length - 1].date > now) {
            data4.splice(data4.length - 1, 1);
        }

        data1.push({
            date: now,
            value: 0
        });
        data2.push({
            date: now,
            value: 0
        });
        data3.push({
            date: now,
            value: 0
        });
        data4.push({
            date: now,
            value: 0
        });

        var step = BEAT_TIME / BEAT_VALUES1.length - 2;
        for (var i = 1; i < BEAT_VALUES1.length; i++) {
            data1.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES1[i]
            });
            data2.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES2[i]
            });
            data3.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES3[i]
            });
            data4.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES4[i]
            });
        }

        latestBeat = now;

        setTimeout(function() {
            insideBeat = false;
        }, BEAT_TIME);
    }

    var svgWrapper = [];
    svgWrapper[0] = document.getElementById("svg-wrapper1");
    svgWrapper[1] = document.getElementById("svg-wrapper2");
    svgWrapper[2] = document.getElementById("svg-wrapper3");
    svgWrapper[3] = document.getElementById("svg-wrapper4");


    var margin = {left: 10, top: 10, right:  10, bottom: 10},
            width = svgWrapper.offsetWidth - margin.left - margin.right,
            height = svgWrapper.offsetHeight - margin.top - margin.bottom;

    // create SVG
    svg1 = d3.select('#svg-wrapper1').append("svg1")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg2 = d3.select('#svg-wrapper2').append("svg2")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg3 = d3.select('#svg-wrapper3').append("svg3")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg4 = d3.select('#svg-wrapper4').append("svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // init scales
    var now = new Date(),
            fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

    // create initial set of data
    data1.push({
        date: now,
        value: 0
    });
    data2.push({
        date: now,
        value: 0
    });
    data3.push({
        date: now,
        value: 0
    });
    data4.push({
        date: now,
        value: 0
    });

    var x = d3.time.scale() //Time scale
            .domain([fromDate, new Date(now.getTime())])
            .range([0, width]),
            y = d3.scale.linear()
                    .domain([-10, 10])
                    .range([height, 0]);


    var line1 = d3.svg.line()
            .interpolate("basis")
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.value);
            });

    var line2 = d3.svg.line()
            .interpolate("basis")
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.value);
            });

    var line3 = d3.svg.line()
            .interpolate("basis")
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.value);
            });

    var line4 = d3.svg.line()
            .interpolate("basis")
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.value);
            });
    

    var xAxis1 = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.seconds, 1)
            .tickFormat(function(d) {
                var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
                return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
            });
    var xAxis2 = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.seconds, 1)
            .tickFormat(function(d) {
                var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
                return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
            });
    var xAxis3 = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.seconds, 1)
            .tickFormat(function(d) {
                var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
                return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
            });
    var xAxis4 = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.seconds, 1)
            .tickFormat(function(d) {
                var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
                return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
            });


    // add clipPath
    svg1.append("defs").append("clipPath")
            .attr("id", "clip1")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
    svg2.append("defs").append("clipPath")
            .attr("id", "clip2")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
    svg3.append("defs").append("clipPath")
            .attr("id", "clip3")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
    svg4.append("defs").append("clipPath")
            .attr("id", "clip4")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

    var axis1 = d3.select("svg1").append("g")
            .attr("class", "axis1")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis1);
    var axis2 = d3.select("svg2").append("g")
            .attr("class", "axis2")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis2);
    var axis3 = d3.select("svg3").append("g")
            .attr("class", "axis3")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis3);
    var axis4 = d3.select("svg4").append("g")
            .attr("class", "axis4")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis4);


    var path1 = svg1.append("g")
            .attr("clip-path", "url(#clip1)")
            .append("path1")
            .attr("class", "line");
    var path2 = svg2.append("g")
            .attr("clip-path", "url(#clip2)")
            .append("path2")
            .attr("class", "line");
    var path3 = svg3.append("g")
            .attr("clip-path", "url(#clip3)")
            .append("path3")
            .attr("class", "line");
    var path4 = svg4.append("g")
            .attr("clip-path", "url(#clip4)")
            .append("path4")
            .attr("class", "line");

    svg1.select(".line")
            .attr("d", line1(data1));
    svg2.select(".line")
            .attr("d", line2(data2));
    svg3.select(".line")
            .attr("d", line3(data3));
    svg4.select(".line")
            .attr("d", line4(data4));

    var transition1 = d3.select("path1").transition()
            .duration(100)
            .ease("linear");
    console.log("Here");
    var transition2 = d3.select("path2").transition()
            .duration(100)
            .ease("linear");
    var transition3 = d3.select("path3").transition()
            .duration(100)
            .ease("linear");
    var transition4 = d3.select("path4").transition()
            .duration(100)
            .ease("linear");

    (function tick() {
        console.log("Tick");
        transition = transition1.each(function() {
            
            // update the domains
            now = new Date();
            fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
            x.domain([fromDate, new Date(now.getTime() - 100)]);
            var translateTo = x(new Date(fromDate.getTime()) - 100);
            console.log(now);
            
            svg1.select(".line")
                    .attr("d", line1(data1))
                    .attr("transform", null)
                    .transition()
                    .attr("transform", "translate(" + -7.551020408163264 + ")");
            axis1.call(xAxis1);
            svg2.select(".line")
                    .attr("d", line2(data2))
                    .attr("transform", null)
                    .transition()
                    .attr("transform", "translate(" + -7.551020408163264 + ")");
            axis2.call(xAxis2);
            svg3.select(".line")
                    .attr("d", line3(data3))
                    .attr("transform", null)
                    .transition()
                    .attr("transform", "translate(" + -7.551020408163264 + ")");
            axis3.call(xAxis3);
            svg4.select(".line")
                    .attr("d", line4(data4))
                    .attr("transform", null)
                    .transition()
                    .attr("transform", "translate(" + -7.551020408163264 + ")");
            axis4.call(xAxis4);

        }).transition().each("start", tick);
    })();

    setInterval(function() {

        now = new Date();
        fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

        for (var i = 0; i < data1.length; i++) {
            if (data1[i].date < fromDate) {
                data1.shift();
            } else {
                break;
            }
        }
        for (var i = 0; i < data2.length; i++) {
            if (data2[i].date < fromDate) {
                data2.shift();
            } else {
                break;
            }
        }
        for (var i = 0; i < data3.length; i++) {
            if (data3[i].date < fromDate) {
                data3.shift();
            } else {
                break;
            }
        }
        for (var i = 0; i < data4.length; i++) {
            if (data4[i].date < fromDate) {
                data4.shift();
            } else {
                break;
            }
        }

        if (insideBeat) return;

        data1.push({
            date: now,
            value: 0
        });
        data2.push({
            date: now,
            value: 0
        });
        data3.push({
            date: now,
            value: 0
        });
        data4.push({
            date: now,
            value: 0
        });

        

    }, TICK_FREQUENCY);

    setInterval(function() {
        beat();
    }, 2000);
    beat();
};
