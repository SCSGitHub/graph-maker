function textInit(selection){
    selection
    .attr("font-size", d => sizeText(d, 'init'))
    .attr('id', function (d) { return 'label' + d.id; })
    .attr('dy', "1em") 
    .text(d => d.name)
    .call(wrap, 200)
  }


  function textSelected(selection){
        selection
        .transition()
        .duration(toggleTime)
        .style("opacity", 1)
        .attr("font-size", d => sizeText(d, 'selected'))
        .text(d => modFocusedText(d))
        .style("fill", function (d) {
            if (d.type === "paper") {
                return "#00BFFF"
            } else {
                return "black"
            }
        })
  }

function textReset(selection, purpose){
    selection.transition()
        .duration(toggleTime)
        .style("opacity", function(d) {
          if (purpose === "transition") {
            return 0;
          } else {
            if (d.paperID.length >= 2) {
              return 0.5+d.paperID.length/10;
            } else {
              return 0;
            }
          }
        })
        .attr("font-size", d => sizeText(d, 'reset'))
        .style("fill", function(d) {
          if (d.type === "paper") {
            return "#00BFFF"
          } else {
            return "black"
          }
        })
        .text(d => modText(d));
}

function modText(d, state) { //init and reset
      var string = d.name
      if (d.paperID.length >= 2) {
        if (string.length > defaultTextLength) {
          return string.substring(0, defaultTextLength + 2) + '...';
        } else {
          return string
        }
      } else {
        return "";
      }
    }

function modFocusedText(d) { //selected
    var string = d.name
    if (string.length > focusTextLength) {
        return string.substring(0, focusTextLength + 2) + '...';
    } else {
        return string;
    }
}

function sizeText(d, state) {
    if (state === 'init' || state === 'reset'){
         return parseInt(6 + Math.log(d.paperID.length) * 10).toString() + 'px';
    }
    if (state === 'selected') {
        if (d.type === "paper") {
                return 16;
            } else {
                return parseInt(8 + Math.log(d.paperID.length) * 10).toString() + 'px';
            }
    }
}

