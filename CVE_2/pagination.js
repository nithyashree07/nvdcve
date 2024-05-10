var array_length=249089 ;
var table_size = 10;
var start_index= 10;
var end_index = 10;
var current_index =1;
var max_index =6;

function displayIndexButtons(){
    $(".index_buttons button").remove();
    $(".index_buttons").append('<button>Previous</button>');
    for(var i=1; i<=max_index; i++){
         $(".index_buttons").append('<button index = "'+i+'">'+i+'</button>');
    }
     $(".index_buttons").append('<button>Next</button>');
     highlightIndexButton();
}

displayIndexButtons();

function highlightIndexButton(){
    start_index = ((current_index -1) * table_size) +1;
    end_index = (start_index +table_size) -1;
    if(end_index > array_length){
        end_index =array_length;
    }
    $(".footer span").text('Showing '+start_index+' to '+end_index+' of '+array_length+' records ');
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index = '"+current_index+"']").addClass('active');
}