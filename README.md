# poetic:material-ui-components (pmc)
  This package houses and abstracts common material ui components, as well as a handful of other custom components such as credit card component, contacts list component e.t.c

## Components (pmc)

- pmc.actionButton (pmc_actionButton)
- pmc.appBar (pmc_appBar)
- pmc.cameraAvatar (pmc_cameraAvatar)
- pmc.contact (pmc_contact)
- pmc.contacts (pmc_contacts)
- pmc.creditCard  (pmc_creditCard)
- pmc.dateSelector
- pmc.dialog
- pmc.floatButton
- pmc.signIn
- pmc.simpleDialog
- pmc.showSpinner

### pmc.actionButton
  This component is available through the pmc global object or optionally through its template {{>pmc_actionButton}}. This component, gives you a green button centered at the bottom of the screen.

#### Props
- action: Takes reference to a funtion which will be called when the button is clicked
- label: Takes a string which will be rendered on top of the button
- style (optional): pass a style object if you wish to override the default style of the button.


# pmc.appBar
  This component is available through the pmc global object or optionally through its template {{> pmc_appBar}}

#### Props
- action: Required if rendering an icon Takes a string which should correspond to a route that will be visited when the icon is clicked. Please note, if you pass a true value for icon, you must also pass a valuable for the action prop
- Icon: pass true to indicate that an icon should be rendered on the app bar
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

### pmc.dateSelector
  This component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. This component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### Props
- TBD

### pmc.dialog
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd

### pmc.floatButton
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd

### pmc.signIn
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd

### pmc.simpleDialog
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd

### pmc.showSpinner
  this component is available through the pmc global object or optionally through its template {{>pmc_contacts}}. this component, reads all contacts from the phone book and allows for multipple selection of contacts. it returns all contacts selected as an object.

#### props
- tbd
