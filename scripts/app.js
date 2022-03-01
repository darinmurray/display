
// import M_W_API from "./apikey.js";

window.onload = function () { 

    //for styling
    var hue = 350;
      let darkmode = false // make dark mode switch ...
      var lumin = (darkmode === true) ? "20":"50";
    let word = "Hello!"; //initial string
    let person;
    let praise;
    // find and get HTML choice instead of setting as a string
    let textCase = 'capitalize' //  uppercase/lowercase/capitalize 
    let wordArrays = [disneyCharactersArray, animalsArray, kindergardenArray, firstGradeArray, wordArray2k, wordArray10k, CSScolorNames];
    let defArrays = [disneyMoviesArray];
    // arrays should equal names, colors, animals, cities, numbers, friends (user entered), family(user entered)
    let wordsOfChoice = wordArrays[category.value] //gets from html dropdown
    //let currentCategoryName = getSelected(category)
    
    // ====== Element Select Variables ======== //
    const body = $("body");
    const word_length_title = document.getElementById("word_length_wrapper").firstChild.nextElementSibling
    const rewardElement = document.getElementById("reward")
    const categorySelect = document.getElementById("category")
    const wordLengthSlider = document.querySelector('#word_length')
    
    
    // ====== HUE shift body color ======== //
    function changeBackground() {
      if ( getSelected(category) == 'Colors') {
        body.css("background-color", word);
      } else {
        hue += 47
        body.css("background-color", "hsl(" + hue + ", 100%, " + lumin + "%)");
    } // end if/else
    // console.log(" () random body color applied ");
    } 
      
    // ====== Make CSS color names human readable ======== //
    function makeReadable(CSScolorName) {
    let regExp = /[A-Z-_\&](?=[a-z0-9]+)|[A-Z-_\&]+(?![a-z0-9])/g
    let readableColor = CSScolorName.replace(regExp,' $&').trim()
    console.log(`=> readableColor(): %c${readableColor}`, "color:"+CSScolorName );  
    return word = readableColor
    }
    
    // ====== Choose Word Source ======== //
    function toggleSource(arrName) {
      // switch array from one to another 
      wordsOfChoice = wordArrays[arrName]
      console.log(`%c=> Category Changed To:`, "color:red", getSelected(category)  ) ;
      hideIfDisney()
      return wordsOfChoice
    }
    
    function hideIfDisney() {
      if (category.value == 0) { 
        $("#pronunciation_display").slideUp("slow");
      } else { 
        $("#pronunciation_display").slideDown("slow");
      }
    };
    hideIfDisney() // if page loads and Disney is alreay selected
    
    // =======   Generate Random Positive Feedback   ========== //
    function getPraise(){
      person = user_name_input.value
      !person ? (person = "Absolon?") : person
      let praisePhrase = [`${person}, way to go!`, `${person}, GREAT JOB! More to go!`, `Great Job, ${person}!`,`Nice!`,"You are Killin It, bro!",`Very impressive, ${person}!`,`${person}, nicework!`, "Keep Trying, insert_childs_name_here"] 
      praise = praisePhrase[getRandomInt(0, praisePhrase.length)]
      speak( praise );
    }
    
    // ====== Primary Functions ======== //
    function getWord(ifSupplied) {
      console.log(`%c=> ============ Function Variable: ifSupplied: `, "color:red", ifSupplied);
      let search = document.getElementById("search_input").value
      let word_length = document.getElementById("word_length").value 
      let displayCharacters = numOfCharacters() // put this back after testing
    
      if (word_length > displayCharacters) { word_length = displayCharacters}
        if ( search == '') {
          word = words({exactly: 1, maxLength: word_length}) // words() //
            console.log(`%cThere's nothing in the text input, fetching a random word`, "color:green");
            console.log(`%c=> word = randomly chosen in getWord(): `, "color:green", word);
        } else if ( ifSupplied ) {
            word = ifSupplied.split()
        } else {
            word = search.split()
              console.log(`%c=> word = from seach input: `, "color:green", word);
        }
        document.getElementById("search_input").value = ''; 
          console.log(`%c=> Decided Upon 'word': `, "color:green", word);
        changeBackground()
    
              if (category.value == 0) { //Disney Characters
                // get the word and look up the movie the character is in, display instead of definition
                definition.textContent =  word[0]+" is a character in: "+ disneyMoviesArray[wordsOfChoice.indexOf(word[0])] 
                // Skip word definition lookup, just flip the charactes with 'word'
                flipCharacters(word)
              } else {
                // perform the main look up function
                lookUp(word)
              }
      // flipCharacters() 
      console.log(" ---------------- getWord(ifSupplied) completed "); 
      return word
    }
    
    
    
    
    
    
    // ====== ORIGINAL, UNTOUCHED Primary Functions ======== //
    // // ====== Primary Functions ======== //
    // function getWord() {
    //   let word_length = document.getElementById("word_length").value 
    //    let displayCharacters = numOfCharacters() // put this back after testing
    //     if (word_length > displayCharacters) { word_length = displayCharacters}
    //       // THis will be good when making the enter/return button choose which
    //       // function to perform: a lookup, or a random word
    //     let ifSupplied = document.getElementById("search_input").value
    //         // console.log(`%c=> word_length: `, "color:green", word_length); 
    //     if ( ifSupplied == "") {
    //         console.log(`%cThere's nothing in the text input, fetching a random word`, "color:green");
    //         word = words({exactly: 1, maxLength: word_length}) // words() //
    //         console.log(`%c=> word = randomly chosen: `, "color:green", word);
    //     } else {
    //     word = ifSupplied.split()
    //         console.log(`%c=> word = from seach inpu: `, "color:green", word);
    //     }
    //     document.getElementById("search_input").value = ''; 
    
    //         console.log(`%c=> Decided word: `, "color:green", word);
    //   changeBackground()
    
    //     if (category.value == 0) {
    //       // get the word and look up the movie the character is in, display instead of definition
    //       definition.textContent =  word[0]+" is a character in: "+ disneyMoviesArray[wordsOfChoice.indexOf(word[0])] 
    //     } else {
    //       // perform the main look up function
    //       lookUp()
    //     }
    //   flipCharacters()  
    //   return word
    // }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ===============  B U T T O N  ================ // 
    // ---------------  (listeners)  --------------- // 
    // ===============  ===========  ================ //  
    
    // ===============  S P E A K  ================ // 
    // ---------------  (buttons)  --------------- // 
    // ===============  =========  ================ //  
    
    // ==========  SPEAK SYLLABOLL  ================
    // whys is this jQuery when the others are vanilla JS?
    // $(document).on("click touchstart ", ".syllabol" , function(e) { //touchstart / tap
    //   speak( $(this).text() );
    // });
    
    // ===========   S P E A K  button   ============ // 
    // this method works for dnamically created elements
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'speak_word'){
        speak( word );// getString()
      }
    });
    
    // ===========   S P E A K  button II   ============ // 
    // whys is this jQuery when the others are vanilla JS?
    // $(document).on("click", "#speak_word" , function(e) {
    //   speak( getString() ); // speak( word );
    // });
      
    // =======   S P E A K  I N P U T  button   ============ // 
    speak_user.addEventListener("click", function(event){
      console.log("Speaking the currently displayed definition");
      let phrase = this.nextElementSibling.value 
      speak( phrase ); // speak( word );
    });
    
    // =======   S P E A K  D E F I N I T I O N button   ============ // 
    speak_definition.addEventListener("click", function(event){
      console.log("Speaking the currently displayed definition");
      let phrase = this.nextElementSibling.textContent 
      speak( phrase ); // speak( word );
    });
    
    // =======   S P E A K  D E F I N I T I O N button   ============ // 
    speak_input.addEventListener("click", function(event){
      console.log("Speaking the currently displayed definition");
      let phrase = this.nextElementSibling.value 
      speak( phrase ); // speak( word );
    });
    
    // =======   P R A I S E  button   ========== // 
    rewardElement.addEventListener("click", function(event){
      getPraise()
      console.log("You got Praised!");
    });
    
    // =======   C A T E G O R Y  button   ========== // 
    categorySelect.addEventListener("change", function(event){
      toggleSource( this.value )
    });
    
    // =========  W O R D  L E N G T H  ========== // 
    // ===============  (slider)  ================ // 
    wordLengthSlider.addEventListener('input', event => {
      // changes word length of the slider TITLE
      function updateLength(length) {
        const thisTitle = []
        for(var i = 0; i < length; i++){
            thisTitle.push("a");
        }
        return thisTitle.join('') // thisTitle.length
      }
      word_length_title.textContent = updateLength(word_length.value);
    })
    
    // ===========   E N T E R  &  R E T U R N   ============ //
    body.keydown(function(e){
      if(e.keyCode === 13){
         get_word.click()
       }  
    });
    
    // ===========   W O R D  button   ============ //
    get_word.addEventListener("click", function(event){
        getWord() 
      get_word.textContent = "New Word"
    });
    
    // ========== CLICK to search S U G G E S T E D   W O R D   ================
    // jQuery because it's simpler and shorter
    $(document).on("click", ".look_this_up" , function(e) {
        lookUp( this.textContent )
      console.log(`%c=>  from clicking on the provided optional words this.textContent: `, "color:cyan", this.textContent);
    });
    
    // ========== M U L T I   S T A T E  B U T T O N S  ================
    // jQuery because it's simpler and shorter
    $(document).on("click", ".case_state_button" , function(e) {
      $(this).addClass('active_msb').siblings().removeClass('active_msb'); 
      textCase = this.id // UPPER/Caps/lower
            // set css variable & change 'word_lenght title to reflect the change
            word_length_title.style.textTransform=textCase;
        console.log(`%c=> button clicked and changed to: `, "color:cyan", textCase);
      flipCharacters( )
        console.log(" ----------------------- flipped at the end of .case_state_button.clicked "); 
    });
    
    // ==========  L E T T E R  H I L I G H T I N G  ================
    // jQuery because it's simpler and shorter
    $(document).on("click", ".element_wrapper" , function(e) {
      $(this).toggleClass('hilight_element_color'); 
    });
    
    // =========  W O R D  L E N G T H  ========== // 
    // ===============  (slider)  ================ // 
    search_input.addEventListener('input', event => {
    // changes word length of the slider TITTLE
    if ( this.value != '' ) get_word.textContent = "lookup"
    else if ( !this.value ) get_word.textContent = "Get Word" ;
    else return ;
    })
    
    $("section#voice_controls.controls, section#view_controls.controls, section#display_controls.controls, section#user_name.controls, section#search_controls.controls").hide()
    // ========== M U L T I   S T A T E  B U T T O N S  ================
    // jQuery because it's simpler and shorter
    $(document).on("click", ".section_state_button" , function(e) { 
      let target = $(this).data("value")
      let selected = "#"+target
        if ( $(this).hasClass("active_msb") ) { 
          $(selected).slideUp('slow');
          $(this).removeClass("active_msb")
        } else {
          $(this).addClass('active_msb').siblings().removeClass('active_msb');
          $(selected).slideDown('slow');
          $(".controls").not(selected).slideUp('slow');
        }
     console.log(`%c=> show/hide nav sectoin: `, "color:cyan", target);
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ==============   W O R D s   =============== // 
    // ===============            ================ // 
    // ===============  ========  =============== // 
    
    // shorten this to always return just one random word, at chose length
    function words(options) {
    
      function word() {
        if (options && options.maxLength > 1) {
          return generateWordWithMaxLength();
        } else {
          return generateRandomWord();
        }
      }
    
      function generateWordWithMaxLength() {
        let rightSize = false;
        let wordUsed;
        while (!rightSize) {  
          wordUsed = generateRandomWord();
          if(wordUsed.length <= options.maxLength) {
            rightSize = true;
          }
        }
        return wordUsed;
      }
    
      function generateRandomWord() {
        // modified to return a string no matter what
        let chosenWord = wordsOfChoice[randInt(wordsOfChoice.length)]
          console.log("generateRandomWord() generate a: ", (typeof(chosenWord) ))
        return chosenWord;
      }
    
      function randInt(lessThan) {
        return Math.floor(Math.random() * lessThan);
      }
    
      // No arguments = generate one word
      if (typeof(options) === 'undefined') {
        return word();
      }
    
      // Just a number = return that many words
      if (typeof(options) === 'number') {
        options = { exactly: options };
      }
    
      // options supported: exactly, min, max, join
      if (options.exactly) {
        options.min = options.exactly;
        options.max = options.exactly;
      }
      
      // not a number = one word par string
      if (typeof(options.wordsPerString) !== 'number') {
        options.wordsPerString = 1;
      }
    
      //not a function = returns the raw word
      if (typeof(options.formatter) !== 'function') {
        options.formatter = (word) => word;
      }
    
      //not a string = separator is a space
      if (typeof(options.separator) !== 'string') {
        options.separator = ' ';
      }
    
      var total = options.min + randInt(options.max + 1 - options.min);
      var results = [];
      var token = '';
      var relativeIndex = 0;
    
      for (var i = 0; (i < total * options.wordsPerString); i++) {
        if (relativeIndex === options.wordsPerString - 1) {
          token += options.formatter(word(), relativeIndex);
        }
        else {
          token += options.formatter(word(), relativeIndex) + options.separator;
        }
        relativeIndex++;
        if ((i + 1) % options.wordsPerString === 0) {
          results.push(token);
          token = ''; 
          relativeIndex = 0;
        }
       
      }
      if (options.join) {
        results = results.join(options.join);
      }
    
      return results;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ````````````````  T E X T  T O  S P E E C H  `````````````````` //
    // for text to speach form, coppied from web-speech-api
    // https://github.com/mdn/web-speech-api/blob/master/speak-easy-synthesis/script.js
    // heavy modifications on getMyVoices and the voice select drop down, else mostly original
    var synth = window.speechSynthesis;
    // var inputForm = document.querySelector('form');
    var inputTxt = document.querySelector('#speak_input')
    var pitch = document.querySelector('#pitch');
    //var pitchValue = document.querySelector('.pitch-value');
    var rate = document.querySelector('#rate');
    //var rateValue = document.querySelector('.rate-value');
    var voices = [];
    let allVoices = window.speechSynthesis.getVoices()
    let myVoices = []
    // much info here: https://talkrapp.com/speechSynthesis.html
    // https://cloud.google.com/text-to-speech/
    
    
    // this could be an IIFE, no need to call it more than on page load
    function getMyVoices(params) {
      for(i = 0; i < allVoices.length ; i++) {
        if (allVoices[i].lang == 'en-US' | 
        allVoices[i].lang == 'ru-RU' | 
        allVoices[i].lang == 'en-AU' | 
        allVoices[i].lang == 'en-ZA' | 
        allVoices[i].lang == 'en-IN' | 
        allVoices[i].lang == 'en-GB' | 
        allVoices[i].lang == 'en-scotland' | 
        allVoices[i].lang == 'en-scotland' | 
        allVoices[i].lang == 'en-IE') 
        myVoices.push(allVoices[i])
        }
    // console.log(`%c[ - myVoices: `, "color:MediumSeaGreen", myVoices);
    console.log(`%c[ ------ Voice List Created -------- ] `, "color:MediumSeaGreen");
    }
    getMyVoices()
    
    // => To create radio buttons instead of select list 
    // var voiceSelect = document.querySelector('select');
    // var voiceSelect = document.getElementById("voiceList");
    // function populateVoiceList() {
    //   // voices = synth.getVoices().sort(function (a, b) {
    //   voices = myVoices.sort(function (a, b) {
    //       const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    //       if ( aname < bname ) return -1;
    //       else if ( aname == bname ) return 0;
    //       else return +1;
    //   });
    //   var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    //   voiceSelect.innerHTML = '';
    
    //   for(i = 0; i < voices.length ; i++) {
    //     //var option = document.createElement('option'); // option
    //     var option = document.createElement('input'); // input
    //     //option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    //     if(voices[i].default) {
    //       // option.textContent += ' -- DEFAULT';
    //       option.checked = true; 
    //     }
    //     option.setAttribute('id', "voice_"+i);
    //     option.setAttribute('type', "radio");
    //     option.setAttribute('name', "voice");
    //     option.setAttribute('data-lang', voices[i].lang);
    //     option.setAttribute('data-name', voices[i].name);
    //     // DtM foo
    //     var vlabel = document.createElement("label")
    //     vlabel.setAttribute('for', voices[i].name); // unquote for variable
    //     var vi = document.createElement("i");
    //     vi.className = 'fas fa-user';
    //     var vspan = document.createElement("span");
    //     var vtitle = document.createTextNode(voices[i].name); // unquote for variable
    //     vlabel.appendChild(vi);
    //     vlabel.appendChild(vspan)
    //     vspan.appendChild(vtitle)
    //     // now append this whole mess on to the original option
    //     option.appendChild(vlabel);
    //     // end DtM foo
    //     voiceSelect.appendChild(option);
    //   }
    //   voiceSelect.selectedIndex = selectedIndex;
    // }
    // populateVoiceList();
    
    // => To create select list instead of radio buttons
    // var ssvoiceSelect = document.querySelector('select');
    // console.log(`%c=> ssvoiceSelect: `, "color:red", ssvoiceSelect);
    
    var voiceSelect = document.getElementById("voice_list");
    function populateVoiceList() {
      voices = myVoices.sort(function (a, b) {
          const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
          if ( aname < bname ) return -1;
          else if ( aname == bname ) return 0;
          else return +1;
      });
      var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
      voiceSelect.innerHTML = '';
      for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');  
        // option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        // custom rolled select list with country name instead of code
        option.textContent = voices[i].name + ' (' + getRegion( `${voices[i].lang.split("-")[1]}`  ) + ')';
        if(voices[i].default) {
          // ugly, don't use
          // option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
      voiceSelect.selectedIndex = selectedIndex;
    }
    populateVoiceList();
    
    function getRegion(lan_suffix) {
      let region
    switch (lan_suffix) {  
      case "US":
        region = "United States";
        break;
      case "GB":
        region = "Great Britian";
        break;
      case 'scotland':
        region = "Scotland";
        break;
      case "AU":
        region = "Australia";
        break;
      case "RU":
        region = "Russia";
        break;
      case "IN":
        region = "India";
        break;
      case "IE":
        region = "Ireland";
        break;
      case "ZA":
        region = "South Africa";
        break;
    }
     return region
    }
    
    
    
    
    
    
    
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    // DTM modified to use generated word OR input text, if input exists
    function speak(foobar){
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        wordsToSpeak = foobar
        var utterThis = new SpeechSynthesisUtterance(wordsToSpeak);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name'); // "Fred" //    
        // dtm added below for radio buttons
        // var selectedOption = document.querySelector('input[name="voice"]:checked').attributes[4].value 
    
        for(i = 0; i < voices.length ; i++) {
          if(voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
            break;
          }
        }
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        synth.speak(utterThis);
        utterThis = null
    }
    
    pitch.onchange = function() {
      pitchValue = pitch.value;
      speak(word);
    }
    
    rate.onchange = function() {
      rateValue = rate.value;
      speak(word);
    }
    
    voiceSelect.onchange = function(){
      speak(word);
    }
    // ``````````````````````````````````````````````````  //
    // ============= end from web-speech-api ============  //
    
    
    
    // Wait... this is ONLY called ONCE on page load????
    // the ONCE on 'speak word' ???
    
    // // ============= Get the string for the flip char function ============  //
    // function getString(){
    //   console.log(`%c======== GetString() called ========`, "color:pink");
    //   console.log(`%c=> word: `, "color:pink", word);
    //   console.log(`%c=> Of the type:, %c${typeof(word)}`, "color:pink", "color:cyan" );
      
    //   if (word && typeof(word) !== 'string' ) {
    //     stringy = word[0]; // it must be an array
    //   } else { 
    //     stringy = word } // must be a string
    //   // This has a conflict with titleCase, adds an extra space exponentially <= TO DO: fix me
    //   if (getSelected(category) == 'Colors') {
    //     // This makes camelCase colors readable is css camelCase collors are bieng used
    //     console.log(`%c=> ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ running makeReadable() on: `, "color:pink", stringy);
    //     stringy = makeReadable(stringy) //always returns a string...
    //   }
    // return stringy 
    // }
     
    
    
    // This is less complicated than CSS, given the fipCharacers function
    // I need to alter the DATA, not the DISPLAY of the data
    function titleCase( splitStr ) { 
          var  splitStr = word.toLowerCase().split(' ')
          for (var i = 0; i < splitStr.length; i++) {
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
          }
          return splitStr.join(' ');   
    }
    
    // Set case of stringy, according to user input
    function setCase() {
      // flatten word to string, regardless
      if (typeof(word) !== 'string') {
        word = word[0].toString()
      }    
    
      if (textCase == 'capitalize') {
        // Can't do in CSS because of instances of CSS ColorNames
        // user function
        stringy = titleCase( word )  
      } else if (textCase == 'uppercase'){
        // js function
        stringy = word.toUpperCase()
      } else if (textCase == 'lowercase') {
        stringy = word.toLowerCase()
      }
      console.log(`%c=> "stringy" changed to": `, "color:Thistle", textCase);
      return stringy
    }
    
    
    // ===============  C A L C U L A T E  ================ // 
    // ===============       (window)      ================ // 
    // ===============  W = I = D = T = H  ================ //  
    function numOfCharacters() {
      // calculate how many characters fill fit on the screen
      let consoleify = false
      let console_color = "color:DarkSeaGreen"
      consoleify ? console.log(`%c== numOfCharacters()  `, console_color) : ''
      let window_w = $( window ).width();
        consoleify ? console.log(`%c=> window_w: `, console_color, window_w) : ''
        
      let container_margin =  parseInt( $(".display_board_container").css("padding") )*2
      consoleify ? console.log(`%c=> container_margin: `, console_color, container_margin) : ''
    // uses as a global as it's being called in other functions
      item_w =  parseInt( $(".element_wrapper").outerWidth(true) )        
      consoleify ? console.log(`%c=> item_w: `, console_color, item_w) : ''
    
      item_margin =  parseInt( $(".item").css("margin-left") )
      
      item_wrapper_margin = parseInt( $(".element_wrapper").css("margin") )
      consoleify ? console.log(`%c=> item_wrapper_margin: `, console_color, item_wrapper_margin) : ''
      
      let total_item_w =  parseInt( item_w+item_wrapper_margin*2 ) 
        // the "+10" is a safety margin and denies orphans, good room for side speaker icon 
        consoleify ? console.log(`%c=> total_item_w: `, console_color, total_item_w) : ''
      
      const total_characters = Math.floor( (window_w-container_margin)/total_item_w ) //.toFixed(2)
       consoleify ? console.log(`%c===> total_characters: `, console_color, total_characters) : ''
    
      return total_characters 
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
      setCase()
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
              let nextChar = stringy[index]
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
          // clear interval when index has surpased #of elements
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
    
        let speaker = "<span id='speak_word' class='material-icons md-60'> record_voice_over </span>"
    $("#display_board_X").prepend(speaker)
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
  
    // ====== get selected value of any selection list ======== //
    function getSelected(idOfSelector) {
      let selected = category
      let selectedOption = selected.options[selected.selectedIndex].text
      // console.log("FCN => selectedOption: ", selectedOption);
      return selectedOption
    }
    
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
    
    // ``````````````````````                 `````````````````````` //  
    // ``````````````````````      E N D      `````````````````````` // 
    // ``````````````````````                 `````````````````````` // 
    // ☞ ☛ ➢ ➤ ✓ ✔︎ ↑ ⚠︎ ⇧ ⇧ ⇧⇧⇩⇨⇦ ↦ ➠
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
function lookUp(providedWord){
        if ( providedWord !== "undefined" ) { 
        word = providedWord
        } 
        if (getSelected(category) == 'Colors') {
        // This makes camelCase colors readable if css camelCase collors are bieng used
        word = makeReadable(word.toString()) //always returns a string...
        }
    getDefinition(word)
};
    
    
    
     

const getDefinition = async (event) => {
    // const supply = [ "lizard","lion","ukraine","tree","car","rocket", ]   
    // const random = Math.floor(Math.random() * supply.length);
    const searchable = word // supply[random];
    
    /* ****************  for S E R V E R L E S S  ***************** */
    const url = "/.netlify/functions/search?searchable="+searchable ;
    const defStream = await fetch(url);
    /* ****************  E N D  ***************** */
    
    /* **************** for NON serverles ***************** */
    // const url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${searchable}?key=${process.env.M_W_API}`;
    // const defStream = await fetch(url, {
    //     headers: {
    //         Accept: 'application/json'
    //       }
    // });
    /* **************** E N D ***************** */
    
    const jsonDefinition = await defStream.json();
    const definition = jsonDefinition 
    make_sense(definition)
    return definition;
};
    
    
       
 
function make_sense(response){
    // Destroy the existing definition in the DOM
    $("#definition").text('')
    if (response.length == 0) {  
        // if NOTHING at all is returned 
        document.getElementById("definition").textContent = "I thnk a cat was walking on your keyboard... Try again"
        word = null
        flipCharacters(":-(")
    } else if (response[0].constructor.name == "String") { 
        // if the first itmem [0] in the response is a string, 
        // then it's returning an array of suggestions, display and make them clickable
        $("#definition").append("No luck... try ==> ");
            for (x in response.slice(0, 5) ) {
            console.log(`%c=> response: `, "color:cyan", response[x]);
            let link = `<span class="look_this_up" >${response[x]} </span>` 
            $("#definition").append(link);
            }
            // alows Color Names not found to be displayed anyway
            // otherwise, this would be flipCharacters(), and go BELOW word = null
            flipCharacters(word)  
        // word = null
    } else {
        getDefs(response)
        flipCharacters()
    }
}; 
    
      
    
    
    
// find the first flip character and get it's left position
let pos_1_1 = document.getElementById("pos_1_1")
let marginLeft = (pos_1_1.offsetLeft-(item_wrapper_margin) )//+half_margin
// position the syllable wrapper
$("#syl_wrapper").css( "margin-left",`${marginLeft}px` )
$("#syl_wrapper").text(' ')


function getDefs(response) { 
    // ------------------ Get Values Fromn Response ----------------------------- //
    let shortDefsArray = response[0].shortdef // get all if they exist
    let finalDef = shortDefsArray[0] // the first short version of the definition
    let finalType = response[0].fl // verb/noun/etc.
    let separated
    let finals = (response[0].meta.id).split(":")[0]; // should be hwi.hw but it sometimes contains an asterisk
    let finalSyl = response[0].hwi.hw 
    let pronunciation = response[0].hwi.prs ? response[0].hwi.prs[0].mw : "Not Available"
    let multiSyllabol = (finalSyl.indexOf("*") >= 0 ) ? true : false
    if (multiSyllabol == true) { separated = (finalSyl).split('*') } 
    

    // ------------------ rendering in the DOM ----------------------------- //
    if ( multiSyllabol ) { redablesyllables = separated.join(" - ") } else {redablesyllables = finalSyl }
    $("#pronunciation").text(pronunciation)
    $("#type").text(finalType)
    
    $("#syllables").text('') // clear out existing
        $("#syl_wrapper").text('')
    // itterate through syllables, if existing
    if (multiSyllabol) {
        for (let x in separated) { //sylables
        let chunk_l = separated[x].length
        let chunk_w = chunk_l*item_w
        // with speakable chunk, they just kind of suck...
        // $("#syl_wrapper").append( `<span id="chunk_${x}" class="syl_chunk syllabol"><div class="l_brace">  </div><div class="c_brace"> ${separated[x]} </div><div class="r_brace">  </div></span>` ) 
        $("#syl_wrapper").append( `<span id="chunk_${x}" class="syl_chunk syllabol"><div class="l_brace">  </div><div class="c_brace">  </div><div class="r_brace">  </div></span>` ) 
        $(`#chunk_${x}`).css( "width",`${chunk_w}px` )       
        $("#syllables").append( `<span class="syllable">${separated[x]}&nbsp;</span>` ) // <==(blank) space here matters!!
        }
    } else { 
        // empty syllables hilighter
        $("#syl_wrapper").text('...')
        $("#syllables").append(`<span class="syllable">${finalSyl}&nbsp;</span>`)
    }
    // itterate through shordDefsArray, if existing
    if (shortDefsArray.length > 0) {
        $("#definition").text(finalDef + '.')
        for (let x in shortDefsArray) { 
        // inject as LI in the DOM
        // ==> TODO: add all short defs, click to cycle? 
        // console.log(`%c=> Definition${x}: `, "color:yellow", shortDefsArray[x]);
        }
    }
}// end of getDefs()
    
    
    
    
}; // end on document load
    
    
 
    // quick test: WORDS API
    
    // const settings = {
    // 	"async": true,
    // 	"crossDomain": true,
    //   "url": "https://wordsapiv1.p.rapidapi.com/words/?random=true",
    // 	"method": "GET",
    // 	"headers": {
    // 		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    // 		"x-rapidapi-key": WORDS_API // see config.js
    // 	}
    // };
    
    // $.ajax(settings).done(function (response) {
    //   console.log(`%c=> WORDS AIP random response: `, "color:ogoldenrod", response);
    // });
    
     