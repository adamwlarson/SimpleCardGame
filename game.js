//alert( "Hello" );
var currentCards = [];
var cardsInDiscard = [];
var cardsInPlayer1 = [];
var cardsInPlayer2 = [];
var totalCards = 40;

function dealCard( obj, bTop, position, cardValue ){
  var topPos, leftPos;
  topPos = bTop ? -300 : 300;
  leftPos = 200 * ( position + 1 );
  obj.animate({
    top: topPos,
    left: leftPos
  }, 500, function( ) {
    obj.attr( 'src', 'images/number'+cardValue+'.jpg' );
  });
  $(obj).draggable();
};

function returnCard( obj ) {
  obj.clearQueue( );
  obj.animate({
    top: 0,
    left: 0
  }, 100 );
  obj.css('border', "solid 0px yellow" );
  obj.attr( 'src', 'images/template.jpg' );
};

function returnAllCards( ) {
  for( var i = 0; i < totalCards; i++ )
  {
    returnCard( $('#card'+(i+1)));
  }
};

function dealNewHand( ) {
  //Player 1
  //Card 1
  var cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, false, 0, cardBeingDealt.cardValue );
  cardsInPlayer1[0] = cardBeingDealt;
  cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, true, 0, cardBeingDealt.cardValue );
  cardsInPlayer2[0] = cardBeingDealt;

  //Card 2
  cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, false, 1, cardBeingDealt.cardValue );
  cardsInPlayer1[1] = cardBeingDealt;
  cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, true, 1, cardBeingDealt.cardValue );
  cardsInPlayer2[1] = cardBeingDealt;

  //Card 3
  cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, false, 2, cardBeingDealt.cardValue );
  cardsInPlayer1[2] = cardBeingDealt;
  cardBeingDealt = currentCards.pop( );
  dealCard( cardBeingDealt.cardObj, true, 2, cardBeingDealt.cardValue );
  cardsInPlayer2[2] = cardBeingDealt;
};

function shuffleCards( ) {
  for(var j, x, i = currentCards.length; i; j = parseInt(Math.random() * i), x = currentCards[--i], currentCards[i] = currentCards[j], currentCards[j] = x);
};

function createCardData( cardObj, cardValue, cardIndex ) {
  this.cardObj = cardObj;
  this.cardValue = cardValue;
  this.cardIndex = cardIndex;
  this.bSelected = false;
};

function saveCards( ) {
  currentCards = [];
  cardsInDiscard = [];
  cardsInPlayer1 = [];
  cardsInPlayer2 = [];
  for( var i = 0; i < 40; i++ )
  {
    var cardValue = ( Math.floor( i / 5 ) + 1 ) * 5;
    var cardIndex = i + 1;
    currentCards[currentCards.length] = new createCardData( $('#card' + cardIndex), cardValue, cardIndex );
  }
};

$(document).ready(function( ) {
  //Save all widgets as cards

  $('#btnDeal').bind( 'click', function(event) {
    //Go through all cards and return them
    saveCards( );
    shuffleCards( );
    returnAllCards( );
    dealNewHand( );
  });

  $('.card').bind( 'click', function(event) {
    //Make sure this card is in player 1's hand
    var bFound = false;
    var foundCardObj = null;
    for( var i = 0; i < cardsInPlayer1.length; i++ )
    {
      if( cardsInPlayer1[i].cardObj.get(0) == $(this).get(0) ){
        //alert( "Equal Finally" );
        foundCardObj = cardsInPlayer1[i].cardObj;
        bFound = true;
      }
    }

    if( !bFound )
      return;


    foundCardObj.bSelected = !foundCardObj.bSelected;
    if( foundCardObj.bSelected ) {
      $(this).css('border', "solid 4px yellow" );
      /*$(this).animate({
        top: '-=75px'
      }, 100 );*/
    } else {
      $(this).css('border', "solid 0px yellow" );
      /*$(this).animate({
        top: '+=75px'
      }, 100 );*/
    }

  });
});