

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

- Transition animation while moving tiles does not work
  - in order to make it work I would need to, hande each Tile not rerender all
  - styles are hard coded so if I would to increase size of the table this will not work

- https://keycode.info/ -> 32 is spacebar -> RESET -> HammerJS 

# Features
  + personal Best
  + fade by going up added score - animation
  + tile that is merged get slightly bigger 
  + [new game] reset button
  - choosing your own size of table 


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

  