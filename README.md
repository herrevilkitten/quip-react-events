# react-quip-events

## Synopsis

A library for declaratively subscribing to Quip events inside of React render functions.

## Usage

### Example

```
import { QuipReactEvents } from 'quip-react-events';

export class App extends React.Component {
  handleBlur() {
    console.log("This live app has blurred.");
  }

  handleOnlineStatusChange(status) {
    console.log("Is quip online?", status);
  }

  render() {
    return (
      <QuipReactEvents onBlur={this.handleBlur}> onOnlineStatusChanged={this.handleOnlineStatusChange}</QuipReactEvents>
    );
  }
}

```

### Events

https://quip.com/dev/liveapps/documentation#environment-subscribing-to-events

- `onBlur`

Dispatches when the live app loses focus.

- `onFocus`

Dispatches when the live app gains focus.

- `onContainerSizeUpdate` `(width: number)`

Dispatches when the container size updates. Passes in the new container width.

- `onUserPreferenceUpdate` `(userPreferences: (quip.apps.Preferences|null))`

Dispatches when the user's preferences have changed. Passes in the new user preferences.

- `onSitePreferenceUpdate` `(sitePreferences: (quip.apps.Preferences|null))`

Dispatches when the site's preferences have changed. Passes in the new site preferences.

- `onDocumentMembersLoaded` `(documentMemberList: Array<quip.apps.User>)`

Dispatches when the document's member list has finished loading. Passes in the document members.

- `onDocumentEditableChanged` `(editableStatus: boolean)`

Dispatches when the document editable status changes. Passes in the new status.

- `onOnlineStatusChanged` `(onlineStatus: boolean)`

Dispatches when Quip's online status has changed. Passes in the new status.

- `onThreadMembershipChanged` `(membershipStatus: boolean)`

Dispatches when the user's thread membership has changed. Passes in the new membership status.
