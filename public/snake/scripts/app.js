'use strict';

( function() {
    var GRID_ITEM_SIZE = 50, 
    SNAKE_LENGTH = 5,
    ACCELERATION = 0.1,
    section = document.getElementsByTagName('section')[0],
    pauseButton = document.getElementsByTagName('button')[0],
    playButton = document.getElementsByTagName('button')[1],
    newGameButton = document.getElementsByTagName('button')[2],
    switchModeButton = document.getElementsByTagName('button')[3];

    section.style.width = window.innerWidth - 10  + 'px';
    section.style.height = window.innerHeight - 30 + 'px';

    window.snake = ( function() {
        var config = {
            autoMode: null,
            speed: null,
            direction: '',
            head: {},
            tail: {},
            pause: false,
            gameOver: null,
            canChangeDirection: true,
            moveId: null,
            gridSize: {},
            get: function (prop) {
                return this[prop];
            },

            set: function (prop, value) {
                this[prop] = value;
            }
        },

        snakeBlocks = [],
        targetList = [],

        getTargetList = function() {
            return targetList;
        },

        addItemToTargetList = function(item) {
            if ( item !== targetList[0] ) {
                item.classList.add('target');
                targetList.push(item);
            }
        },

        removeItemFromTargetList = function() {
            var item = targetList.shift();
            item.classList.remove('target');
        },

        clearTargetList = function() {
            targetList.length = 0;
        },

        createSnakeBlocks = function() {
            var i;
            snakeBlocks.length = 0;
            for (i = 0; i < SNAKE_LENGTH; i++) {
                section.children[i].classList.add('active');
                addItemToSnakeBlocks( section.children[i] );
            }

            config.set('head', snakeBlocks[0] );
            snakeBlocks[0].classList.add('head');
            config.set( 'tail', snakeBlocks[ snakeBlocks.length - 1 ] );
        },

        getSnakeBlocks = function(){
            return snakeBlocks;
        },

        addItemToSnakeBlocks = function(item) {
            snakeBlocks.unshift(item);
        },

        removeItemFromSnakeBlocks = function() {
            var item = snakeBlocks.pop();
            item.classList.remove('target');
        },

        stopGame = function() {
            config.set( 'gameOver', true );
        },

        changeDirection = function(newDirection) {
            if ( config.get('canChangeDirection') ) {
                if ( config.get('direction') === 'right' || config.get('direction') === 'left' ) {
                    if ( newDirection === 'top' || newDirection === 'bottom' ){
                        config.set('direction', newDirection);
                    }
                } else if ( config.get('direction') === 'top' || config.get('direction') === 'bottom' ){
                    if ( newDirection === 'right' || newDirection === 'left' ){
                        config.set('direction', newDirection);
                    }
                }
            }
            config.set( 'canChangeDirection', false );
        },

        

        defineGridSize = function() {
            var w = parseInt( section.style.width ),
            h = parseInt( section.style.height ),
            x_amount = Math.floor( w / GRID_ITEM_SIZE ),
            y_amount = Math.floor( h / GRID_ITEM_SIZE );

            return { x: x_amount, y: y_amount };
        },

        drawGrid = function() {
            var i, j;
            for ( i = 1; i <= config.get( 'gridSize' ).y; i++ ) {
                for ( j = 1; j <= config.get( 'gridSize' ).x; j++ ) {
                    createBlock( j, i );
                }
            }
        },

        createBlock = function( x, y ) {
            var div = document.createElement('div');
            div.x = x;
            div.y = y;
            div.style.width = GRID_ITEM_SIZE + 'px';
            div.style.height = GRID_ITEM_SIZE + 'px';
            section.appendChild(div);
        },


        defineCoordsOfNewHead  = function( oldHead, direction ) {
            var newX = oldHead.x, newY = oldHead.y;

            if ( direction === 'right' ) {
                newX = oldHead.x + 1 > config.get( 'gridSize' ).x ? 1 : oldHead.x + 1;
            } else if ( direction === 'bottom' ) {
                newY = oldHead.y + 1 > config.get( 'gridSize' ).y ? 1 : oldHead.y + 1;
            } else if ( direction === 'left' ) {
                newX = oldHead.x - 1 === 0 ? config.get( 'gridSize' ).x : oldHead.x - 1;
            } if ( direction === 'top' ) {
                newY = oldHead.y - 1 === 0 ? config.get( 'gridSize' ).y : oldHead.y - 1;
            } 

            return { x: newX, y: newY };
        },

        findNextActiveBlock = function( head, direction ) {
            var coords = defineCoordsOfNewHead( head, direction ),
            x = coords.x,
            y = coords.y;
            return findBlock( x, y );
        },

        defineBestWay = function( dX, dY, way1, way2, way3, way4 ) {
            var block1 = findNextActiveBlock( config.get( 'head') , way1 ),
            block2 = findNextActiveBlock(  config.get( 'head'), way2 ),
            block3 = findNextActiveBlock(  config.get( 'head'), way3 ),
            block4 = findNextActiveBlock(  config.get( 'head'), way4 );

            if ( block1 === getTargetList()[0] && !block1.classList.contains('active') ) {
                changeDirection( way1 );
            } else if ( block2 === getTargetList()[0] && !block2.classList.contains('active') ) {
                changeDirection( way2 );
            } else if ( block3 === getTargetList()[0] && !block3.classList.contains('active') ) {
                changeDirection( way3 );
            } else if ( block4 === getTargetList()[0] && !block4.classList.contains('active') ) {
                changeDirection( way4 );
            } else {

                switch( config.get('direction') ) {
                    case way1: 
                        if ( dX >= dY ){
                            if ( !block1.classList.contains('active') ) {
                                
                            } else if ( !block2.classList.contains('active') ) {
                                 changeDirection( way2 );
                            } else {
                                 changeDirection( way4 );
                            }
                        } else if ( dX < dY ){
                            if ( !block2.classList.contains('active') ) {
                                 changeDirection( way2 );
                            } else if ( !block1.classList.contains('active') ) {
                               
                            } else {
                                 changeDirection( way4 );
                            }
                        }
                    break;

                    case way2: 
                        if ( dX >= dY ) {
                            if ( !block1.classList.contains('active') ) {
                                changeDirection( way1 );
                            } else if ( !block2.classList.contains('active') ) {
                               
                            } else {
                                changeDirection( way3 );
                            }
                        } else if (dX < dY) {
                            if ( !block2.classList.contains('active') ) {
                               
                            } else if ( !block1.classList.contains('active') ) {
                                changeDirection( way1 );
                            } else {
                                changeDirection( way3 );
                            }
                        }
                    break;

                    case way3:
                        if ( !block2.classList.contains('active') ) {
                                changeDirection( way2 );
                            } else if ( !block4.classList.contains('active') ) {
                                changeDirection( way4 );
                            }
                    break;

                    case way4: 
                    if ( !block1.classList.contains('active') ) {
                                changeDirection( way1 );
                            } else if ( !block3.classList.contains('active') ) {
                                changeDirection( way3 );
                            }
                    break;
                }
            }      
        },

        autoChangeDirection = function() {
            var currentX = config.get( 'head' ).x,
            currentY = config.get( 'head' ).y,
            newX = getTargetList()[0].x,
            newY = getTargetList()[0].y,
            dX = newX - currentX, 
            dY = newY - currentY,
            nextActiveBlock;

            if ( dX >= 0 &&  dY >= 0 ) {
                defineBestWay( Math.abs(dX), Math.abs(dY), 'right', 'bottom', 'left', 'top' );
            } else if ( dX < 0 &&  dY >= 0 ) {
                defineBestWay( Math.abs(dX), Math.abs(dY), 'left', 'bottom', 'right', 'top' );
            } else if ( dX < 0 &&  dY < 0 ) {
                defineBestWay( Math.abs(dX), Math.abs(dY), 'left', 'top', 'right', 'bottom' );
            } else if ( dX >= 0 &&  dY < 0 ) {
                defineBestWay( Math.abs(dX), Math.abs(dY), 'right', 'top', 'left', 'bottom' );
            }
        },

        

        move = function() {
            var nextActiveBlock;
            if ( !config.get( 'pause' ) && !config.get( 'gameOver' ) ) {
                nextActiveBlock = findNextActiveBlock( config.get( 'head' ), config.get( 'direction' ) );

                if ( nextActiveBlock === getTargetList()[0] ) {
                    removeItemFromTargetList();
                }

                if ( nextActiveBlock.classList.contains('bonus') ) {
                    nextActiveBlock.classList.remove('bonus');
                    addItemToTargetList( createBonus() );
                    config.set( 'speed', config.get('speed') + ACCELERATION);
                  
                    clearInterval( config.get( 'moveId' ));
              
                    config.set('moveId', window.setInterval( move, 1000 / config.get( 'speed' ) ) );
                } else {
                    config.get( 'tail' ).classList.remove('active');
                    removeItemFromSnakeBlocks();
                    config.set( 'tail', getSnakeBlocks()[ getSnakeBlocks().length - 1 ]);
                }

                if ( nextActiveBlock.classList.contains('active') ) {
                    alert('Game Over');
                    stopGame();
                    return;
                }

                nextActiveBlock.classList.add('active');
                addItemToSnakeBlocks(nextActiveBlock);
                config.get( 'head' ).classList.remove('head');
                config.set( 'head', getSnakeBlocks()[0] );
                config.get( 'head' ).classList.add('head');

                config.set( 'canChangeDirection', true );
                if ( getTargetList().length && config.get( 'autoMode' ) ) {
                    autoChangeDirection();
                }
            }
        },

        contains = function( items, item ) {
            var isContains = false, i;
                for ( i = 0; i < items.length; i++ ) {
                    if ( items[i] === item ) {
                        isContains = true;
                    }
                }
                return isContains;
        },

        findBlock = function( x, y ) {
            return section.children[ config.get( 'gridSize' ).x * (y - 1) + x - 1 ];
        },

        createBonus = function() {
            var x, y, bonusBlock;
            if ( !config.get( 'pause' ) && !config.get( 'gameOver' ) ) {
               
                do {
                    x = createRandomNumber( 1, config.get( 'gridSize' ).x ),
                    y = createRandomNumber( 1, config.get( 'gridSize' ).y );
                    bonusBlock = findBlock( x, y );
                } while ( contains(getSnakeBlocks(), bonusBlock ) || contains( getTargetList(), bonusBlock ) )

                bonusBlock.classList.add('bonus');
                return bonusBlock;
            }
        },

        createRandomNumber = function( min, max ) {
            return Math.floor( min + Math.random() * ( max + 1 - min ) );
        },

        cleanBoard = function() {
            var item, items = section.children;
            for ( var i = 0; i < items.length; i++ ) {
                item = items[i];
                item.classList.remove('target');
                item.classList.remove('active');
                item.classList.remove('bonus');
                item.classList.remove('head');
            }
        };

        return {
            init: function() {
                var infoBlock = document.getElementById('info');
                infoBlock.innerHTML = '';
                config.set( 'gridSize', defineGridSize() );
                config.set( 'autoMode', false );
                config.set( 'gameOver', false );
                config.set( 'direction', 'right' );
                config.set( 'speed', 3 );

                if(getTargetList().length) {
                    clearTargetList();
                }

                if (!section.children.length) {
                    drawGrid();
                } else {
                    cleanBoard();
                }

                createSnakeBlocks();
                clearInterval( config.get( 'moveId' ) );
                config.set( 'moveId', window.setInterval( move, 1000 / config.get( 'speed' ) ) );
                addItemToTargetList( createBonus() );
            },

            switchMode: function() {
                var infoBlock = document.getElementById('info');
                if (config.get( 'autoMode') ) {
                    config.set( 'autoMode', false );
                    infoBlock.innerHTML = '';
                } else {
                    config.set( 'autoMode', true );
                    infoBlock.innerHTML = 'Automode is active';
                }
            },

            drawWayForSnake: function(event) {
                function addItem(e) {
                    addItemToTargetList(e.target);
                };

                if (config.get( 'autoMode' ) ) {
                    addItem(event);
                    section.addEventListener( 'mouseover', addItem );

                    section.addEventListener( 'mouseup', function() { 
                        section.removeEventListener( 'mouseover', addItem );
                    });
                }
            },

            play: function() {
                config.set( 'pause', false );
            },

            stop: function() {
                config.set( 'pause', true );
            },
            analyzePushedButton: function(event) {
                var keyCode = event.keyCode;
                if ( keyCode === 37 ) {
                    changeDirection('left');
                } else if ( keyCode === 38 ) {
                    changeDirection('top');
                } else if ( keyCode === 39 ) {
                    changeDirection('right');
                } else if ( keyCode === 40 ) {
                    changeDirection('bottom');
                } 

            }
  
        }

    })();

    section.addEventListener( 'mousedown', snake.drawWayForSnake );
    switchModeButton.addEventListener( 'click', snake.switchMode );
    pauseButton.addEventListener( 'click',  snake.stop );
    playButton.addEventListener( 'click', snake.play );
    newGameButton.addEventListener( 'click', snake.init );
    document.addEventListener( 'keydown', snake.analyzePushedButton );

})();

snake.init();