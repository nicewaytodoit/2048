

# v0.4.2
> 2019-08-04
  - React HotRealoading ->
  - Help pages 
  - Settings 
  - Nicer CSS -> SCSS ->


# v0.4.1 
> 2019-08-03
  + strange issue with React if in style there is extra space between let say number and px messure, it will send styles as props instead applying as styles.
  + Building Carusel control

> 2019-07-28
+ TODO List
  - First page 
    + SVG assets
      + gear
      + question mark
      + winning cup
      + arrow (instead of styles)
      + game contoler 
    
    > Screen shots of each grid size (3,4,5,6x6 ...)
    - assemble everything
    
    + names for table sizes
      + 03x03 Small
      + 04x04 Classic
      + 05x05 Big
      + 06x06 Bigger 
      + 07x07 Larger
      + 08x08 Huge
      + 09x09 Huger
      + 10x10 Humongous
      + 11x11 Why man? Why?!

  - Help screen (modal) 
    - Slider control with dots ()
    - Create slides     
  - Settings screen (modal)


  - Memoisation (tiles, font sizes, numbers abbreviation (K,M,G)...)
  - Tile zoom to see number score etc.
  - Undo functionality - simple with state preservation



# v0.4 - New Feature List

## Problem with text size 
  - it is basicly not solvable by CSS or SVG have same issue, it is possible to enter and resize static text
    as soon new text it enter it does not resize, Excel cell behaviour is needed.

## Test in K, M, P ... enlarge each on tile click 300k, 900m, 999b
  - https://en.wikipedia.org/wiki/Names_of_large_numbers  

## Calculae final tile ratio in comparison to table field 


## List of choices is:
  - Small 
  - Classic 
  - Big
  - Bigger 
  - Huge 8x8


## Error List 
- Line 1:  Definition for rule 'no-object-literal-type-assertion' was not found  no-object-literal-type-assertio


## 2019-07-17
  + Type script conversion
    npm install --save @types/react @types/react-dom
    


## 2019-07-11 
  - code refactoring nicer/solid/decupling

  - new features
    - chooser nicer styles (Game image + see trought div + scroll on arrows)
    - Font resiz per number per tile if number larger ih has to fit tile.
    - help page
    
    - randomize number of tile in relation to size of available empty tiles, higher probability of more tiles with larger table
    - number of morphing results or infinite in regards to size of table change instead of config files.
    - size of number in smallest tile *(2048 gettting out of the borders)
    - option page ...
    - find Buzz instructions / decorations
    - Android and React Native conversion ... deploying to Web/hosting and have it as part of company / portfolio
    - Need for speed, making it in Svelte
     
- https://keycode.info/ -> 32 is spacebar -> RESET -> HammerJS 

# Bug list 

> 2019-06-30 10:00
+ setup tiles not working
+ Last End screen does not work. Win/Over with button Try Again 

> 2019-06-30 06:00
## TODO===
+ Reset button probably does not work
  + KeyBoard fixed and button fixed 
  + not connected with emit
  + reset functioality still broken
+ If tiles fill the entire grid game gets jamed
+ more tiles very slow
+ Update Differences in Score does not work 

+ Transition animation while moving tiles does not work
  + in order to make it work I would need to, hande each Tile not rerender all
  + styles are hard coded so if I would to increase size of the table this will not work



## Fixing Transition for Custom size Grid:
+ creating fixed tiles
+ creating step circular movement
  + tile must have fixed keyID
    + maybe creating name would help by index of added tiles
+ creating infinite movement styles (beyond css)
+ convert Positions from fixed class to => infinite styles
+ Font Resize
+ Grid Resize
+ Update credits

+ convert Value (colors 2,4,8,16...) from fixed class to => infinite styles
+ creating size of the grid chooser
+ Inedex each radomly created tile by adding name and assign that name to Key
+ speed of this with lots of tiles ???


# Features
  + personal Best
  + fade by going up added score - animation
  + tile that is merged get slightly bigger 
  + [new game] reset button
  + choosing your own size of table 


# Lessons Learnt
This project was created to play with conversion of the game 2048, and also to reverse engener thing into react, additionally playing with new tools like ```Yarn PNP```

## yarn -pnp
Plug n Play is a neat and fast feature but on the other hand it is absolute nightmare if you try to make it work with external plugins that expect some kind of node_modules folder.
Until entire entire surounds addopt this althoug it is amazin feature, --pnp is useless. Time you gain on fast install you will lose multiple fold searching how to fix the issue you should not have in the firt place.


  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "eslintConfig": {
    "extends": "react-app"
  }

  