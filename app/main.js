var card_list = card_list? card_list : [];

var main_deck = [];

function Tech(name, description, tags){
  this.discard = [];
  this.tags = tags;
  this.name = name;
  this.description = description;
}

Tech.prototype = {

}

var card_id = 0;
function Card(name, description){
  this.name = name;
  this.description = description;
  this.id = card_id;
  card_id++;  
}


var card_component = { 
  template: "#card-template",
  props: ['card'],

};


var app = new Vue({
  el: "#app",
  components: {
    card: card_component,
  },
  data: {
    card_list: card_list,
    main_deck: main_deck,
    main_discard: [],
    hand: [],
    techs: [],
    display: {
      show_card_list: false,
    },
    input: {
      name: "",
      description: "",
      tags: [],
      tech: {
        name: "",
        description: "",
        tags: "",
      }
    }
  },
  methods: {
    add_tech: function(){
      var tech = new Tech(this.input.tech.name, this.input.tech.description, this.input.tech.tags);
      this.reset_input();      
      this.techs.push(tech);
    },
    add_card: function(){
      var card = new Card(this.input.name, this.input.description);
      console.log(card);
      this.reset_input();      
      this.card_list.push(card);
    },    
    reset_input: function(){
      this.input.name = "";
      this.input.description = "";
      this.input.tags = [];

      this.input.tech.name = "";
      this.input.tech.description = "";
      this.input.tech.tags = [];
    },

    shuffle_deck: function(deck){
      var switched = {};
      for (var i = deck.length; i > 1; i--){
        var random_pos = Math.floor(Math.random() * i);
        shuffle_value = deck[random_pos];
        switch_pos = i;
        while(switch_pos > 0 && (switch_pos in switched)){
          switch_pos -= 1;
        }
        switch_value = deck[switch_pos];
        deck[switch_pos]  = shuffle_value;
        deck[random_pos] = switch_value;

        switched[random_pos] = true;
      }
    }

  }
});