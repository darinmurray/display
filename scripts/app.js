window.onload = function () { 

    let word = "Hello!"; //initial string

    // // ====== Primary Functions ======== //
    function getWord(ifSupplied) {
      const months = ["January", "February", "March", "April", "May", "June", "July"];
      const random = Math.floor(Math.random() * months.length);
      console.log(random, months[random]);
      word = months[random]
    
      let search = document.getElementById("search_input").value
        if ( search == '') {
          word = word
        } else if ( ifSupplied ) {
            word = ifSupplied.split()
        } else {
            word = search.split()
        }
              flipCharacters(word)
      return word
    }
    

    // ===========   W O R D  button   ============ //
    get_word.addEventListener("click", function(event){
        getWord() 
      get_word.textContent = "New Word"
    });
    
  
    
    // ===============  C A L C U L A T E  ================ // 
    // ===============       (window)      ================ // 
    // ===============  W = I = D = T = H  ================ //  
    function numOfCharacters() {
      // calculate how many characters fill fit on the screen
      let consoleify = true
      let console_color = "color:DarkSeaGreen"
      consoleify ? console.log(`%c== numOfCharacters()  `, console_color) : ''
      let window_w = $( window ).width();
      let window_h = $( window ).height();
        consoleify ? console.log(`%c=> window_w: `, console_color, window_w) : ''
        consoleify ? console.log(`%c=> window_h: `, console_color, window_h) : ''
        
      let container_margin =  parseInt( $(".display_board_container").css("padding") )*2
      consoleify ? console.log(`%c=> container_margin: `, console_color, container_margin) : ''
    // uses as a global as it's being called in other functions
      item_w =  parseInt( $(".element_wrapper").outerWidth(true) )        
      item_h =  parseInt( $(".element_wrapper").outerHeight(true) )        
        consoleify ? console.log(`%c=> item_w: `, console_color, item_w) : ''
        consoleify ? console.log(`%c=> item_h: `, console_color, item_h) : ''
    
      item_margin =  parseInt( $(".item").css("margin-left") )
      
      item_wrapper_margin = parseInt( $(".element_wrapper").css("margin") )
        consoleify ? console.log(`%c=> item_wrapper_margin: `, console_color, item_wrapper_margin) : ''
      
      let total_item_w =  parseInt( item_w+item_wrapper_margin*2 ) 
      let total_item_h =  parseInt( item_h+item_wrapper_margin*2 ) 
        // the "+10" is a safety margin and denies orphans, good room for side speaker icon 
        consoleify ? console.log(`%c=> total_item_w: `, console_color, total_item_w) : ''
        consoleify ? console.log(`%c=> total_item_h: `, console_color, total_item_h) : ''
      
      const total_characters = Math.floor( (window_w-container_margin)/total_item_w ) //.toFixed(2)
      const total_characters_h = Math.floor( (window_h-container_margin)/total_item_h ) //.toFixed(2)
       consoleify ? console.log(`%c===> total_characters_row: `, console_color, total_characters) : ''
       consoleify ? console.log(`%c===> total_characters_collumn: `, console_color, total_characters_h) : ''
 
       



      return 32 //total_characters 
      }
      
    // <== re-render on window change
    var recalculate_character_display;
    function resizedw(){
      // this breaks onAnimationEnd in the flicCharacters function
      // no time to deal with it right now, so 
      location.reload();
    }
      
    var lastWidth = $(window).width();
    $(window).resize(function(){
       if($(window).width()!=lastWidth){
        clearTimeout(recalculate_character_display);
        recalculate_character_display = setTimeout(function() {
            resizedw();
        }, 500);
          lastWidth = $(window).width();
       }
    })  
    
    





    // ===============  F L I P P I N G  ================ // 
    // ===============     (function)    ================ // 
    // ===============  ===============  ================ //  
    function flipCharacters(ifProvided){ 
      document.documentElement.style.setProperty('--timing', flip_speed_slider.value/100+'s');
     
      if ( word == '' | word == null ) { word = ifProvided } 
    
      console.log(`%c=> word AS DETERMINED BY FLIPCHARACTERS(): `, "color:cyan", word);
      // this sets case WHILE returning the string: stringy.
      word = word.toString()
      //setCase()
      $('div.element').each(function(index) {
        var thisElement = this; // => clean 'this' up ? ? ? ? ? ? ? ? ? ? ?  ? ? ? ? ? ? ? ? ? ?
        // 'this', as a var (thisElement) is executed correctly when its used as jQuer below, 
        // does NOT work when mixed this.find(), as opposed to $(thisElement).find(), etc.
        this.parentNode.classList.remove("hilight_element_color")
        var howMany = $('div.element').length; 
        var ranNum = Math.floor(Math.random() * message_speed_slider.value); 
        // setup the interval and give it a name to clear later 
        var flipThis = setInterval(function() {
          // ********************************************* 
          // console.log("speed is: "+user_flip_speed+" at index: "+index) 
              let nextChar = word[index]
                  nextChar = nextChar ?? " " // nullish coalescence         
              let thisChar = $(thisElement).find(".top" ).text()
              if (thisChar != nextChar) {
                // if the character to be flipped is new, flipit; otherwise skip it
                var match_note = "_\\|/_ flip it" 
                // add the transition class to current item in the each/array
                $(thisElement).find(".flap, .top_back_shadow, .shadow, .front, .back_shine").addClass('flipped')     
                $(thisElement).find(" .back h1" ).text( nextChar )          // update character component
                $(thisElement).find(" .top" ).text( nextChar )              // update character component  
    // console.log(`%c=> thisElement BEFORE: `, "color:cyan", thisElement);
                  // change character component and remove .flipped on the current item after transitionEnd
                  $(thisElement).find(".flap").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                  function(e) {
    // console.log(`%c=> AFTER TRANS END: `, "color:cyan", thisElement);
                      // alert("transition has ended")
                      $(thisElement).find(".flap, .front, .back_shine").removeClass('flipped');
                      $(thisElement).find(" .front h1" ).text( nextChar );   
                      // these two shadows happen OUTSIDE of .flap, up a level inside .element  
                      $(thisElement).parent().find(" .shadow,.top_back_shadow").removeClass('flipped')    
                      $(thisElement).parent().find(" .bottom" ).text( nextChar ); 
                  }); 
    // testing  ============================================================================
                  newElement = this.document.querySelector('.element')
                  // console.log(`%c=> newElement: `, "color:cyan", newElement);
                  newFlap = this.document.querySelector('.flap')
                  // console.log(`%c=> newFlap: `, "color:cyan", newFlap );
    
                  newFlap.addEventListener( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',(e)=> { 
                    console.log(`%c=> this: `, "color:cyan", this);
                    console.log( "~_~_~_~_~_~_~_~_~_~~_Finished transition!" );
    // testing  ============================================================================                
                    } );
        } else {    
          // do nothing (but return this as VAR for console)
          var match_note = "(skip it)" 
        }
          // *********************************************
          // clear interval when index has surpassed #of elements
          index<=howMany ? window.clearInterval(flipThis) : ""
          // console.log(`=> current/next: %c${thisChar} %c/ ${nextChar} %c:${match_note}`, "color:green", "color:red");
      }, ranNum); 
    
      });  
    }; // end of flipCharacters() 
        
        
    // ===============  I N I T I A L I Z E  ================ // 
    // ===============  (render x elements)  ================ // 
    // ===============  = { in the html } =  ================ //  
    function renderCharacters( user_input ){
      // clear out existing display elements
      myNode = document.getElementById("display_board_X")
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
      let displayCharacters = numOfCharacters() // put this back after testing
    
        // 1. Renders each slot & fills with character from array  
        for (let step = 0; step < displayCharacters ; step++) {
          initial_character = user_input[step] ?? " "
            // <== step through array of the default string initial_string
            // initial_character = initial_character ?? " " // moved above to first calling of initial_character
          // # of possible .class_X options for random look (4 defined in CSS)
          class_option =  Math.floor(Math.random() * 4); 
          // 3.  append single character to HTML      
                // clone the original HTML markup for the element to replicate (total_characters) # of times
                var clone = $("#pos_1_").clone();
                var newId = clone.attr("id")+(step+1);
                clone.attr("id", newId).removeAttr("style");
                // INSIDE the clone, find and change this 
                clone.find(".front h1").text( initial_character );
                clone.find(".top, .bottom, .front h1").text( initial_character ); 
                // add position class and random background/shadows classes
                // Shadows need to be from a reversed(_R) set of shadows for this positioning
                clone.find(".back").addClass("background_"+class_option+" shadows_R"+class_option); 
                clone.find(".bottom").addClass("background_"+class_option+" shadows_R"+class_option); 
                clone.find(".top").addClass("shadows_R"+class_option); 
                clone.find(".front").addClass("shadows_R"+class_option);  
                clone.addClass("pos_1_"+(step+1)); 
                clone.find(".element").addClass("background_"+class_option); // +" shadows_"+class_option 
                clone.addClass("shadows_"+class_option); // +" shadows_"+class_option     
                $("#display_board_X").append(clone) // add to the DOM
        }  // end FOR 
    }; // ====== end of initial character rendering ====== //
   
   
    // put initial word on screen
    renderCharacters( "= :-)" ) // getString() 
      
    
      
      
      
      
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ``````````````````````  U T I L I T Y  `````````````````````` // 
    // ``````````````````````   (functionS)   `````````````````````` // 
    // ``````````````````````   ==========    `````````````````````` //  
    
    // ====== get % of # between min & max of a given range ======== //
    // E.G. from 35 to 356, what percentage (of the range) is 121? 
    function getPercentOfRange(min, current, max) {  
      // change *1 to *100 for whole numbers
      // currently returning opacity 0.1 - 1.0
      return percentage = (((current - min) * 1) / (max - min)).toFixed(1);  
    } 
      
    // =======   Generate a Random Int between min & max   ========== //
    // getRandomInt(1, 10)*100   for increments less than one second
    function getRandomInt(min, max) { 
      return Math.round((min - 0.5) + Math.random() * (max - min + 1));
    }
    // ==========   Generate a Random Alpha Character   ============= //
    randoAlpha = String.fromCharCode(65+Math.floor(Math.random() * 26)); 
    
    
    
    
    // ``````````````````````  D O M specific   `````````````````````` // 
    // ``````````````````````   (functionS)     `````````````````````` // 
    // ``````````````````````  ⬇ ⬇ ⬇ ⬇ ⬇ ⬇  `````````````````````` // 
  
    
    // ``````````````````````                 `````````````````````` //  
    // ``````````````````````      E N D      `````````````````````` // 
    // ``````````````````````                 `````````````````````` // 
    // ☞ ☛ ➢ ➤ ✓ ✔︎ ↑ ⚠︎ ⇧ ⇧ ⇧⇧⇩⇨⇦ ↦ ➠
    
    
     
    
        
// // find the first flip character and get it's left position
// let pos_1_1 = document.getElementById("pos_1_1")
// let marginLeft = (pos_1_1.offsetLeft-(item_wrapper_margin) )//+half_margin
// // position the syllable wrapper
// $("#syl_wrapper").css( "margin-left",`${marginLeft}px` )
// $("#syl_wrapper").text(' ')
    
    




    
    
    
    
}; // end on document load
    
    

     