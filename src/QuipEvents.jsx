const EVENTS = Object.keys(quip.apps.EventType);

export default class QuipEvents extends React.Component {
  constructor(props) {
    super(props);

    this.handlers = {};

    this.handleEvents = this.handleEvents.bind(this);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    EVENTS.forEach((event) => {
      this.handlers[event] = () => this.handleEvents(event);
    });
  }

  render() {
    return null;
  }

  handleEvents(event) {
    switch (event) {
      case quip.apps.EventType.BLUR:
        this.dispatchEvent('onBlur', event);
        break;
      case quip.apps.EventType.FOCUS:
        this.dispatchEvent('onFocus', event);
        break;
      case quip.apps.EventType.CONTAINER_SIZE_UPDATE:
        this.dispatchEvent('onContainerSizeUpdate', event, quip.apps.getContainerWidth());
        break;
      case quip.apps.EventType.USER_PREFERENCE_UPDATE:
        this.dispatchEvent('onUserPreferenceUpdate', event, quip.apps.getUserPreferences());
        break;
      case quip.apps.EventType.SITE_PREFERENCE_UPDATE:
        this.dispatchEvent('onSitePreferenceUpdate', event, quip.apps.getSitePreferences());
        break;
      case quip.apps.EventType.DOCUMENT_MEMBERS_LOADED:
        this.dispatchEvent('onDocumentMembersLoaded', event, quip.apps.getDocumentMembers());
        break;
      case quip.apps.EventType.DOCUMENT_EDITABLE_CHANGED:
        this.dispatchEvent('onDocumentEditableChanged', event, quip.apps.isDocumentEditable());
        break;
      case quip.apps.EventType.ONLINE_STATUS_CHANGED:
        this.dispatchEvent('onOnlineStatusChanged', event, quip.apps.isOnline());
        break;
      case quip.apps.EventType.THREAD_MEMBERSHIP_CHANGED:
        this.dispatchEvent('onThreadMembershipChanged', event, quip.apps.isThreadMember());
        break;
      default:
        console.log('Unknown Quip event:', event);
        break;
    }
  }

  dispatchEvent(name, event, ...data) {
    if (this.props[name] && typeof (this.props[name]) === 'function') {
      this.props[name](event, ...data);
    } else if (this.props.fallback && typeof (this.props.fallback) === 'function') {
      this.props.fallback(event, ...data);
    }
  }

  componentDidMount() {
    EVENTS.forEach((event) => {
      quip.apps.addEventListener(event, this.handlers[event]);
    });
  }

  componentWillUnmount() {
    EVENTS.forEach((event) => {
      quip.apps.removeEventListener(event, this.handlers[event]);
    });
  }
}