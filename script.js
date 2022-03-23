let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let totalWords=0;
for(i=0;i<sentences.length;i++){
    totalWords+=sentences[i].split(" ").length
}

alert("hello")
$("div#keyboard-upper-container").hide();

$('#buscar-producto').on('keydown', function(e){
    var key = console.log(e.which)
});

$(document).keydown(function(e){
    if (e.shiftKey){
        $("div#keyboard-upper-container").show();
        $("div#keyboard-lower-container").hide();
        
    }
}
);

$(document).keyup(function(e){
    $("div#keyboard-upper-container").hide();
    $("div#keyboard-lower-container").show();
    $("span,div#32").css("background-color","inherit");
}
);
        
$(document).keypress(function(e){
    for(i=0;i<$("span").length;i++){
        if(e.which==$("span")[i].id){
            $("span#"+$("span")[i].id).css("background-color","yellow");
        }
        else if(e.which=="32"){
            $("div#32").css("background-color","yellow")
        }
    }
});


var x=0;
var y=0;
var totalwrong=0;
var start=null;

$("div#sentence").append("Play the typing game and know your speed!!");
$("div#target-letter").append("<button>Play</button>");
$("div#target-letter button").css({
    "background-color":"green",
    "color":"white",
    "border-radius":"5px",
    "font-size":"14px",
    "padding":"5px"
});
$("div#yellow-block").css("opacity","0");
$("div#target-letter button").click(game);

function game(){
    $("div#sentence").empty();
    $("div#sentence").append(sentences[0]);
    $("div#target-letter").empty();
    $("div#yellow-block").css("opacity","1");
    x=0;
    y=0;
    $("div#target-letter").append(sentences[x][y]);
}

function newSentence(x,start){
    $("div#sentence").empty();
    if(x<sentences.length)
        $("div#sentence").append(sentences[x]);
    else{
        $("div#target-letter").empty();
        let min=(Date.now()-start)/60000;
        let letters= (totalWords/min)-(2*totalwrong);
        $("div#sentence").empty();
        $("div#sentence").append("Ran out of Sentences! Word count per minute: "+letters);
        $("div#target-letter").empty();
        $("div#target-letter").append("<button>Wanna play again?</button>");
        $("div#target-letter button").css({
            "background-color":"green",
            "color":"white",
            "border-radius":"5px",
            "font-size":"14px",
            "padding":"5px"
        });
        $("div#yellow-block").css("opacity","0");
        $("div#target-letter button").click(game);
    }
    $("div#feedback").empty();
}

$(document).keypress(function(e){
    if(x<sentences.length){
        if($("div#target-letter button").length==0){
            if(start==null)
            start = Date.now();
            if(e.which==sentences[x][y].charCodeAt(0)){
                $("div#feedback").append("✔");
                $("div#yellow-block").css("left","+=17.5px");
                $("div#target-letter").empty();
                if(y<sentences[x].length)
                    $("div#target-letter").append(sentences[x][y+1]);
                y++;
            }
            else{
                $("div#feedback").append("✘");
            }
            if(y==sentences[x].length){
                let feedbackContent=$("div#feedback").text();
                for(i=0;i<feedbackContent.length;i++){
                    if(feedbackContent[i]=="✘"){
                        totalwrong+=1;
                    }
                }
                newSentence(++x, start);
                $("div#yellow-block").css("left","90px");
                y=0;
                if(x<sentences.length)
                    $("div#target-letter").append(sentences[x][y]);
                else{
                    totalwrong=0;
                    start=null;
                    x=0;
                    y=0;
                }
            }
        }
    }
});

