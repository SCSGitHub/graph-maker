    function newPaper(item) {
      var d = document.createElement("div");

      d.setAttribute("class", "node-metadata");
      d.setAttribute("id", 'paper-'+item.paperID);
      var title = document.createElement("p");
      title.setAttribute("class", "title");
      // var colTitle = document.createElement("div");
      // colTitle.setAttribute("class", "col-xs-8 col-md-8 title");
      title.appendChild(document.createTextNode(item.title));
      d.appendChild(title);
      var meta = document.createElement("p");
      meta.setAttribute("class", "meta");
      meta.appendChild(document.createTextNode("CSCW " + item.year + " | "));
      // outer.appendChild(colYear);
      // var colLink = document.createElement("div");
      // colLink.setAttribute("class", "col-xs-2 col-md-2 link");
      var a = document.createElement("a");
      a.setAttribute("href", item.url);
      a.setAttribute("target", "_blank");
      a.appendChild(document.createTextNode("more info"));
      // var span = document.createElement("span");
      // span.setAttribute("class", "glyphicon glyphicon-link")
      // a.appendChild(span);
      meta.appendChild(a);
      d.appendChild(meta);

      // d.appendChild(outer);

      return d;

    }