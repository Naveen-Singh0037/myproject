// Filter Function Start
function filterNodes(keyWord) {
  if (!keyWord.length) {
    window.alert("Please type key word firstly.");
    return;
  } else {
    var $chart = $(".orgchart");
    // disalbe the expand/collapse feture and distinguish the matched nodes and the unmatched nodes according to the given key word
    $chart
      .find(".node")
      .filter(function(index, node) {
        return (
          $(node)
            .text()
          
            .indexOf(keyWord) > -1
        );
      })
      .addClass("matched")
      .closest("table")
      .parents("table")
      .find("tr:first")
      .find(".node")
      .addClass("retained");

    // hide the unmatched nodes
    $chart.find(".matched,.retained").each(function(index, node) {
      $(node)
        .removeClass("slide-up")
        .closest(".nodes")
        .removeClass("hidden")
        .siblings(".lines")
        .removeClass("hidden");
      var $unmatched = $(node)
        .closest("table")
        .parent()
        .siblings()
        .find(".node:first:not(.matched,.retained)")
        .closest("table")
        .parent()
        .addClass("hidden");
      $unmatched
        .parent()
        .prev()
        .children()
        .slice(1, $unmatched.length * 2 + 1)
        .addClass("hidden");
    });

    $chart.find(".matched").each(function(index, node) {
      if (
        !$(node)
          .closest("tr")
          .siblings(":last")
          .find(".matched").length
      ) {
        $(node)
          .closest("tr")
          .siblings()
          .addClass("hidden");
      }
    });
  }
}
 // hide the unmatched nodes end
 // Filter Function End




// Refresh Function
function clearFilterResult() {
  window.location.reload();
}
// Refresh Function End


(function($) {
  $(function() {
    var ds = {
      name: "Dendrogram",
      children: [
        {
          name: "Skills",
          children: [
            {
              name: "Programming",
              title: "Programming_programming",
              children: [
                { name: "Software Engineer", title: "Programming_programming1"  },
                { name: "Blogging", title: "Programming_programming2" },
                { name: "Freelance", title: "Programming_programming3" }
              ]
            },
            {
              name: "Maths",
              title: "maths",
              children: [
                { name: "Budget Analyst", title: "maths"},
                { name: "Astronomer", title: "maths" },
                { name: "Data Scientist", title: "maths" }
              ]
            }
          ]
        },
        {
          name: "Hobbies",
          children: [
            { name: "Music", title: "Music_music",
            children: [
            
              { name: "Singer", title: "Music_music1" },
              { name: "Music composer", title: "Music_music2" },
               { name: "Music Producer", title: "Music_music3" }
            ]
          },
            {
              name: "Designing", title: "Designing_designing",
              children: [
                { name: "Cartoonist", title: "Designing_designing1" },
                { name: "Graphic Designer", title: "Designing_designing2" },
                { name: "UI Designer", title: "Designing_designing3" }
              ]
            }
          ]
        },
        {
          name: "Interests",
          children: [
            { name: "History", title: "history",
            children: [
              { name: "Xiang Xiang", title: "UE engineer" },
              { name: "Dan Dan", title: "engineer" },
              { name: "Zai Zai", title: "engineer" }
            ]
           },
            {
              name: "Travelling",
              title: "travelling",
              children: [
                { name: "Xiang Xiang", title: "UE engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Zai Zai", title: "engineer" }
              ]
            }
          ]
        }
      ]
    }



var showDescendents = function(node, depth) {
      if (depth === 1) {
        return false;
      }
      $(node).closest('tr').siblings(':last').children().find('.node:first').each(function(index, node) {
        var $temp = $(node).closest('tr').siblings().removeClass('hidden');
        var $children = $temp.last().children().find('.node:first');
        if ($children.length) {
          $children[0].style.offsetWidth = $children[0].offsetWidth;
        }
        $children.removeClass('slide-up');
        showDescendents(node, depth--);
      });
    };

    $('#chart-container').orgchart({
      'visibleLevel': 2,
      'data' : ds,
      'nodeContent': 'title',

      'createNode': function($node, data) {
        
        if (data.title === "skills" || data.title === "designing" || data.title === "Interests" || data.title ===  "Music_music1" || data.title ===  "Music_music2" || data.title ===  "Music_music3" || data.title ===  "Programming_programming1" || data.title ===  "Programming_programming2" || data.title ===  "Programming_programming3" || data.title ===  "Designing_designing1" || data.title ===  "Designing_designing2" || data.title ===  "Designing_designing3") {
          var link = '<a  href="contant/'+ data.title +'.html" target="_blank" ><div class="close"><i class="fa fa-link"></i></div></a></div>';
          $node.append(link);
        }
      }
    });

    $("#btn-filter-node").on("click", function() {
      filterNodes($("#key-word").val());
    });
  
  
    $("#key-word").on("keyup", function(event) {
      if (event.which === 1) {
        filterNodes(this.value);
      } else if (event.which === 8 && this.value.length === 0) {
        clearFilterResult();
      }
    });
  });
})(jQuery);



