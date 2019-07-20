module.exports = {

    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
    
    name: "Sobre",
    
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
    
    section: "#Traduções Mods",
    
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
    
    subtitle: function(data) {
        return `Está action não faz nada - Clique em "Editar" para mais informações`;
    },
    
    //---------------------------------------------------------------------
         // DBM Mods Manager Variables (Optional but nice to have!)
         //
         // These are variables that DBM Mods Manager uses to show information
         // about the mods for people to see in the list.
         //---------------------------------------------------------------------
    
         // Who made the mod (If not set, defaults to "DBM Mods")
         author: "Cap & Slowftw",
    
         // The version of the mod (Defaults to 1.0.0)
         version: "1.0.0",
    
         // A short description to show on the mod line for this mod (Must be on a single line)
         short_description: "Sobre do projeto das traduções dos mods DBM PT-BR",
    
         // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
    
    
         //---------------------------------------------------------------------
    
    //---------------------------------------------------------------------
    // Action Storage Function
    //
    // Stores the relevant variable info for the editor.
    //---------------------------------------------------------------------
    
    variableStorage: function(data, varType) {},
    
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
    
    fields: [],
    
    //---------------------------------------------------------------------
    // Command HTML
    //
    // This function returns a string containing the HTML used for
    // editting actions.
    //
    // The "isEvent" parameter will be true if this action is being used
    // for an event. Due to their nature, events lack certain information,
    // so edit the HTML to reflect this.
    //
    // The "data" parameter stores constants for select elements to use.
    // Each is an array: index 0 for commands, index 1 for events.
    // The names are: sendTargets, members, roles, channels,
    //                messages, servers, variables
    //---------------------------------------------------------------------
    
    html: function(isEvent, data) {
        return `
        <style>
        span.wrexlink, span.wrexlink2 {
            color: #0096cf;
        }

        span.wrexlink:hover, span.wrexlink2:hover {
            cursor: pointer;
            text-decoration: underline;
        }

        .dbm-logo {
            width: 128px;
            animation: scale-dbm-logo 1s linear infinite;

        }

        @keyframes scale-dbm-logo {
            0%   {
                transform: scale(1, 1);
            }
            50%  {
                transform: scale(1.05, 1.05);
            }
            100% {
                transform: scale(1, 1);
            }
        }
        </style>
    <div>
    <div style="width: 550px; height: 350px; overflow-y: scroll;">
    <h2>DBM Mods Traduzidos PT-BR</h2>
    <p>
    O nosso projeto vem a tona sem fins lucrátivos, apenas para ajudar a comunidade brasileira de <b>Discord Bot Maker</b>. Eu(Cap), e Slowftw, estamos nessa jornada em trazer um software de mais fácil entendimento para nós brasileiros.
    </p>
    <h2>Github:</h2>
    <p>
    Você pode estar acompanhando melhor nosso projeto, indo ao nosso repositório do Github, lá temos bastantes informações sobre o projeto. Link:<br><span class="wrexlink" data-url="https://bit.ly/mods-traduzidos">bit.ly/mods-traduzidos<span>
    </p>
    <h2>DBM Mods Oficiais:</h2>
    <p>
    Como é claro, nós não fizemos os mods, estamos apenas traduzindos-os para <b>Português Brasileiro</b>, com isso, deixarei o link do repositório oficial dos mods. Link:<br><span class="wrexlink2" data-url2="https://bit.ly/mods-oficiais">bit.ly/mods-oficiais<span>
    </p>
    <img src="https://raw.githubusercontent.com/CapOliveiraBr/DBM-Mods-Traduzidos-PT-BR/m%C3%ADdia/DBM.png" alt="dbm-logo" class="dbm-logo">
    <p style="font-size: 12px"><i>Copyright © 2019. By Cap & Slowftw. Todos os direitos sobre as traduções reservadas.</i><p>
    </div>`
    },
    
    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------
    
    init: function() {
        const {glob, document} = this;
        
        var path = require("path")
        
        try {
        
            var mods = document.getElementById("mods");
        
            require("fs").readdirSync(__dirname).forEach(function(file) {
                if(file.match(/MOD.js/i)) {
                    var action = require(path.join(__dirname, file));
                    if(action.name && action.action !== null) {
        
                        const tr = document.createElement('tr')
                        tr.setAttribute('class', 'table-dark')
        
                        const name = document.createElement('td')
                        const headerText = document.createElement("b")
                        headerText.innerHTML = action.name
                        name.appendChild(headerText)
        
                        name.setAttribute('scope', 'row')
                        tr.appendChild(name)
        
                        const section = document.createElement('td')
                        section.appendChild(document.createTextNode(action.section))
                        tr.appendChild(section)
        
                        const author = document.createElement('td')
                        author.appendChild(document.createTextNode(action.author ? action.author : "DBM"))
                        tr.appendChild(author)
                        mods.appendChild(tr);
                    }
                }
            });
        } catch (error) {
            // write any init errors to errors.txt in dbm's main directory
            require("fs").appendFile("errors.txt", error.stack ? error.stack : error + "\r\n");
        }
        
        var wrexlinks = document.getElementsByClassName("wrexlink")
            for(var x = 0; x < wrexlinks.length; x++) {
                var wrexlink = wrexlinks[x];
                var url = wrexlink.getAttribute('data-url');
                if(url){
                    wrexlink.addEventListener("click", function(e){
                        e.stopImmediatePropagation();
                        console.log("Launching URL: [" + url + "] in your default browser.");
                        require('child_process').execSync('start ' + url);
                    });
                }
            }
        
        var wrexlinks2 = document.getElementsByClassName("wrexlink2")
            for(var x2 = 0; x2 < wrexlinks2.length; x2++) {
                var wrexlink2 = wrexlinks2[x2];
                var url2 = wrexlink2.getAttribute('data-url2');
                if(url2){
                    wrexlink2.setAttribute("title", url2);
                    wrexlink2.addEventListener("click", function(e2){
                        e2.stopImmediatePropagation();
                        console.log("Launching URL: [" + url2 + "] in your default browser.");
                        require('child_process').execSync('start ' + url2);
                    });
                }
            }
        
        var wrexlinks3 = document.getElementsByClassName("wrexlink3")
            for(var x3 = 0; x3 < wrexlinks3.length; x3++) {
                var wrexlink3 = wrexlinks3[x3];
                var url3 = wrexlink3.getAttribute('data-url3');
                if(url3){
                    wrexlink3.setAttribute("title", url3);
                    wrexlink3.addEventListener("click", function(e3){
                        e3.stopImmediatePropagation();
                        console.log("Launching URL: [" + url3 + "] in your default browser.");
                        require('child_process').execSync('start ' + url3);
                    });
                }
            }
        },
        
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existance.
    //---------------------------------------------------------------------
    
    action: function(cache) {},
    
    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflictions between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------
    
    mod: function(DBM) {
    }
    
    }; // End of module