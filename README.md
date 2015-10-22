# poetic:material-ui-components (pmc)
  This package houses and abstracts common material ui components, as well as a handful of other custom components such as credit card component, contacts list component e.t.c

## Components (pmc)

- pmc.actionButton (pmc_actionButton)
- pmc.appBar (pmc_appBar)
- pmc.cameraAvatar (pmc_cameraAvatar)
- pmc.contact (pmc_contact)
- pmc.contacts (pmc_contacts) ***Mobile only**
- pmc.creditCard  (pmc_creditCard)
- pmc.dialog
- pmc.floatButton
- pmc.signIn
- pmc.textAuto

## Themes
  Pmc by default inherits your Material Ui theme,if you however want to overide the theme for your pmc components, this package allows you to do so using some helper functions.

  pmc.setPalete(): sets the default palette to be used by all pmc components. This is especially useful for buttons using primary/secondary colors.
   To set default palette, pass a palette object with your desired options. example:
   ```javascript
{

    primary1Color: '#c0f948',
    primary2Color: '#2a2a2a',
    primary3Color: '#aeaeae',
    accent1Color: '#c0f948',
    disabledColor: '#aeaeae'
}
```

  pmc.setTheme(): This helper function takes a themeobject and sets it as default to be used by pmc components

### pmc.actionButton
  This component is available through the pmc global object or optionally through its template {{>pmc_actionButton}}. This component, acts by default as a submit button to be used typically in forms.
  One major advantage of using the action button is it's ability to disable or enable itself based on some predetermined condition.

#### Props
- action: Takes reference to a function which will be called when the button is clicked. Note, when the action prop is passed, the actionButton functions as a normal button
- label: Takes a string which will be rendered on top of the button
- style (optional): pass a style object if you wish to override the default style of the button.
- track: This is ideally a reactive data source that enables or disables the state of the actionButton. Whenever the data source is evaluated to be true, the actionButton becomes enabled and vice-versa


# pmc.appBar
  This component is available through the pmc global object or optionally through its template {{> pmc_appBar}}

#### Props
- action: Required if rendering an icon Takes a function which will be called on icon click.
- Icon: Takes a string that should correspond to google material icon name. see https://www.google.com/design/icons/
- Title: Takes a string which will be rendered as the title of the app bar

### pmc.cameraAvatar
  This component is available through the pmc global object or optionally through its template {{>pmc_cameraAvatar}}. This component, allows you to take a pic which then gets rendered to an avatar component.

#### Props
- TBD

### pmc.contact
  This component is available through the pmc global object or optionally through its template {{>pmc_contact}}. This component, gives you a "contact list item entry".

#### Prop
- contact: Takes reference to a funtion which will be called when the button is clicked

### pmc.contacts (Mobile only)
  This component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. This component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### Props
- TBD

### pmc.creditCard
  This component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. This component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### Props
- TBD


### pmc.floatButton
This component gives you a FAB button similar to materialzecss.

#### props
-items: Required. This is an array of objects where each object, corresponds to a menu item.

Each menu item wil have three keys:

icon: A string corresponding to the google material icon to be used
action: the function the be executed on menu item click
label: The string/label to be shown alongside the menu item

```javascript
    let schedule_addIcon =[
      {
        icon:'person_add',
        action: personAddFunction,
        label:'Schedule private session'
      },
      {
        icon:'group_add',
        action: groupAddFunction,
        label:'Schedule group session'
      },
    ]
    ```

- icon: This is a string corresponding to google material icon

- left: takes a boolean value of true. When this is passed the action button is positioned to the left of the screen
#### props
- tbd

### pmc.signIn
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd



### pmc.textAuto
This is an auto-completion text field built on top of twitter typeahead (https://twitter.github.io/typeahead.js/) and meteor-typeahead (https://github.com/sergeyt/meteor-typeahead/)

#### props
- datasource: This should be an array of objects where each object has at minimum a suggestion key

#### Methods

getValue(): returns the current suggestion object in the component
clear(): clears the value of the textAuto component

### Helpers

### pmc.simpleDialog()
Similar to pmc.showDialog, however, you only get a confirmation button much like a simple alert box.

#### props
- Takes an object with the following keys:
```javascript
{
title: 'sample title', //optional
body: 'this content should represent your message',
}
```

### pmc.showDialog
This component gives you a modal dialog which is centered on the screen.
#### props
- Takes an object with the following keys:
```javascript
{
title: 'sample title', //optional
body: 'this content should represent your message',
action: callback //This is called when the confirmation button is clicked
}
```
