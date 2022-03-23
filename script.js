if (window.matchMedia('(max-width: 768px)').matches){
    while(true)
        alert("Mobile alert: Cannot view this application in Mobiles")
}

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let totalWords=0;


$("div#keyboard-upper-container").hide();
$("#target").hide();

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
    $("#keys span ,div#32").css("background-color","inherit");
}
);
        
$(document).keypress(function(e){
    for(i=0;i<$("span").length;i++){
        if(e.which==$("span")[i].id){
            $("span#"+$("span")[i].id).css("background-color","#f5b5d3f5");
        }
        else if(e.which=="32"){
            $("div#32").css("background-color","#f5b5d3f5")
        }
    }
});

var x=0;
var y=0;
var totalwrong=0;
var start=null;
var space=false

$(".plays button").click(()=>{
    game()
    $("#target").show()
    $(".content").hide()
    $("#words").hide()
});

function game(){
    for(i=0;i<sentences.length;i++){
        totalWords+=sentences[i].split(" ").length
    }
    space=true
    $("div#sentence").empty();
    $("div#feedback").empty();

    let markedSentence=sentences[x].split("")
    markedSentence[0]=`<span id="highlight">${markedSentence[0]}</span>`
    $("div#sentence").append(markedSentence.join(""));

    $("div#target-letter").empty();
    x=0;
    y=0;
    $("div#target-letter").append(`<kbd>${sentences[x][y]}</kbd>`);
}

function newSentence(x,start){
    $("div#sentence").empty();
    if(x<sentences.length){
        let markedSentence=sentences[x].split("")
        markedSentence[0]=`<span id="highlight">${markedSentence[0]}</span>`
        $("div#sentence").append(markedSentence.join(""));
    }
        
    else{
        $("div#target-letter").empty();
        let min=(Date.now()-start)/60000;
        let letters= (totalWords/min)-(2*totalwrong);
        $("div#sentence").empty();
        $("div#sentence").append("Ran out of Sentences! <br> Word count per minute: "+letters);
        $("div#target-letter").empty();
        $("div#target-letter").append("<button>Try again?</button>");
        $("div#target-letter button").css({
            "background-color":"#f5b5d3f5",
            "color":"black",
            "border-radius":"10px",
            "padding":"10px",
            "font-size":"15px",
            "border":"none",
            "font-family": "'archivoregular', sans-serif"
        });
        $("div#target-letter button").click(game);
    }
    $("div#feedback").empty();
}

$(document).keypress(function(e){
    if(e.keyCode == 32 && space) {
        e.preventDefault();
    }
    if(x<sentences.length){
        if($("div#target-letter button").length==0){
            if(start==null)
            start = Date.now();
            if(e.which==sentences[x][y].charCodeAt(0)){
                $("div#feedback").append("✔");

                $("div#sentence").text("")
                let markedSentence=sentences[x].split("")
                markedSentence[y+1]=`<span id="highlight">${markedSentence[y+1]}</span>`
                $("div#sentence").append(markedSentence.join(""));

                $("div#target-letter").empty();
                if(y<sentences[x].length)
                    if(sentences[x][y+1]==' ')
                        $("div#target-letter").append("<kbd>space</kbd>");
                    else{
                        $("div#target-letter").append(`<kbd>${sentences[x][y+1]}</kbd>`);
                    }
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
                y=0;
                if(x<sentences.length){
                    $("div#target-letter").text("");
                    $("div#target-letter").append(`<kbd>${sentences[x][y]}</kbd>`);
                }
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

$(".logo").click(()=>{
    location.reload()
})

$("#current").click(()=>$("textarea").val(sentences.join("\n")))
$("#confirm").click(()=>{
    sentences=$("textarea").val().split(", ")
    $("textarea").val("")
})




