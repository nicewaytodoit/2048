

# v0.4 - New Feature List

## Error List 
- Line 1:  Definition for rule 'no-object-literal-type-assertion' was not found  no-object-literal-type-assertio


## 2019-07-17
  + Type script conversion
    npm install --save @types/react @types/react-dom
    


## 2019-07-11 
  - code refactoring nicer/solid/decupling

  - new features
    - chooser nicer styles
    - help page
    
    - randomize number of tile in relation to size of available empty tiles, higher probability of more tiles with larger table
    - number of morphing results or infinite in regards to size of table change instead of config files.
    - size of number in smallest tile *(2048 gettting out of the borders)
    - option page ...
    - find Buzz instructions / decorations
    - Android and React Native conversion ... deploying to Web/hosting and have it as part of company / portfolio
    - Need for speed, making it in Svelte




# Bug list 
## 2019-06-30 10:00
+ setup tiles not working
+ Last End screen does not work. Win/Over with button Try Again 

## 2019-06-30 06:00
=TODO===
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

- https://keycode.info/ -> 32 is spacebar -> RESET -> HammerJS 


### Fixing Transition for Custom size Grid:
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


# Lessons Learn
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

  