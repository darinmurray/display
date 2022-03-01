
// Fired when document is ready, wrapps everything  
window.onload = function() { 
 
    window.total_characters = 8
    alert("on?")
    
    // ===============  S P E E D  ================ // 
    // ===============  (sliders)  ================ // 
    // ===============  =========  ================ //  
    
    document.querySelectorAll('.slider').forEach(item => {
      item.addEventListener('input', event => {
        var x = event.originalTarget.min;
        var y = event.originalTarget.max;
        if (item.classList.contains("rtl")) {
          console.log("Reversed")
            var y = event.originalTarget.min;
            var x = event.originalTarget.max;
          }
      posNum = getPercentOfRange(x, event.originalTarget.value, y)
      negNum = (1.0 - posNum).toFixed(1)
      event.originalTarget.parentElement.previousElementSibling.style.opacity=negNum; 
      event.originalTarget.parentElement.nextElementSibling.style.opacity=posNum; 
      })
    })
    
    
     
    // ===============  F L I P P I N G  ================ // 
    // ===============     (function)    ================ // 
    // ===============  ===============  ================ //  
      
    $("#flipper").click(function() { 
      flipCharacters()
    });  
    
    function getString(){
    let strings = ["DARIN ","RETRO, DARIN","PIPER","LUCKY","DARIN"]
    // let strings = ["DADA IS THE BEST DADA!!","ERIN MORRIS, DANCING QUEEN IS IN CALIFORNIA VISITING HER DADA ","PIPER MAE LOVES PINK AND UNICORNS AND AND FLUFFY THINGS OF ALL KINDS","LUCKY DOG IS REALLY A LUCKY DOG AND GETS TO SLEEP IN THE BED","KITTEN THE CAT LIKES TO GET UP EARLY AND WAKE US UP FOR BREAKFAST"]
    return stringy = strings[getRandomInt(0, 4)]
    }
      
    function flipCharacters(){ 
      document.documentElement.style.setProperty('--timing', flip_speed_slider.value/100+'s');
      stringy = getString()   
      $('div.element').each(function(index) {
        var thisElement = this; // => clean 'this' up ? ? ? ? ? ? ? ? ? ? ?  ? ? ? ? ? ? ? ? ? ?
        var howMany = $('div.element').length; 
        var ranNum = Math.floor(Math.random() * message_speed_slider.value); 
        // setup the interval and give it a name to clear later 
        var flipThis = setInterval(function() {
          // ********************************************* 
          // console.log("speed is: "+user_flip_speed+" at index: "+index) 
              var nextChar = stringy[index]
              if (nextChar == undefined || nextChar == ''){ nextChar = " "}
              // add the transition class to current item in the each/array
              $(thisElement).find(".flap, .top_back_shadow, .shadow, .front, .back_shine").addClass('flipped')     
              $(thisElement).find(" .back h1" ).text( nextChar )          // update character component
              $(thisElement).find(" .top" ).text( nextChar )              // update character component  
                  // change character component and remove .flipped on the current item after transitionEnd
                  $(thisElement).find(".flap").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                    function(e) {
                      $(thisElement).find(".flap, .front, .back_shine").removeClass('flipped');
                      $(thisElement).find(" .front h1" ).text( nextChar );   
                      // these two shadows happen OUTSIDE of .flap, up a level inside .element  
                      $(thisElement).parent().find(" .shadow,.top_back_shadow").removeClass('flipped')    
                      $(thisElement).parent().find(" .bottom" ).text( nextChar ); 
                  }); 
          // *********************************************
          // clear interval when index has surpased #of elements
          index<=howMany ? window.clearInterval(flipThis) : ""
          }, ranNum); 
      });
    
    }; // end of flipEach() 
        
       
        
        
        
        
    // ===============  I N I T I A L I Z E  ================ // 
    // ===============  (render x elements)  ================ // 
    // ===============  = { in the html } =  ================ //  
    
    // Get from random array until form is filled out
    user_input = getString()  // squash this ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !! ! ! ! ! ! ! ! ! ! ! ! !
    
    // replace this function in the master file
    function renderCharacters( user_input ){
        // 1. Renders each slot & fills with character from array  
        for (let step = 0; step < total_characters; step++) {
          initial_character = user_input[step] //string_arr[step] 
          // This is JUST a placeholder for initial rendering of panel
          // <== step through array of the default string initial_string
          if (initial_character == undefined || initial_character == ''){ initial_character = " "}
          // 2.  # of possible .class_X options for random look
          class_option =  Math.floor(Math.random() * 4); 
          // 3.  append single character to HTML      
                // clone the original HTML markup for the element to replicate
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
                clone.find(".top").addClass("shadows_R"+class_option); // testing
                clone.find(".front").addClass("shadows_R"+class_option); // testing 
                clone.addClass("pos_1_"+(step+1)); 
                // adding shadows on .element makes it look more like a frame, than a hole
                clone.find(".element").addClass("background_"+class_option); // +" shadows_"+class_option 
                clone.addClass("shadows_"+class_option); // +" shadows_"+class_option     
                //append clones on the end till done
                $("#display_board_X").append(clone)   
        }  // end FOR 
    }; // ====== end of initial character rendering ====== //
      
    // put the characters on screen
    renderCharacters( user_input )
      
    
      
      
      
      
      
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
    
    // ``````````````````````                 `````````````````````` //  
    // ``````````````````````      E N D      `````````````````````` // 
    // ``````````````````````                 `````````````````````` // 
    
    
    console.log("SplitFlap.js loade...");
    
 }; // window onload 