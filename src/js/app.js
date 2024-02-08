import ToolTip from './Auxiliary Tools/ToolTip';
import Curtain from './Auxiliary Tools/Curtain';
import ShowErrorMessage from './Auxiliary Tools/ShowErrorMessage';
import MessageFactory from './MessageFactory';
import OrganizerWidget from './OrganizerWidget';
import CommunicationWithServer from './CommunicationWithServer';
import OrganizerController from './OganizerController';
import Geolocation from './Geolocation/Geolocation';
import FormUserEnterCoordsCntrl from './Geolocation/FormUserEnterCoordsCntrl';
import ShowInform from './Auxiliary Tools/ShowInform';
import PinnedMessageController from './PinnedMessageController';

const container = document.querySelector('.container');
const userEnterCoordsForms = document.forms.entercoords;
const curtainEl = document.querySelector('.curtain');

const port = 'http://localhost:7000';
const portWs = 'ws://localhost:7000';

const toolTip = new ToolTip('tooltip');
const curtain = new Curtain(curtainEl);
const errMessage = new ShowErrorMessage(container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const informWidget = new ShowInform(container, curtain);
const factory = new MessageFactory();
const pinnedCtrl = new PinnedMessageController(errMessage);
const widget = new OrganizerWidget(container, factory, pinnedCtrl);
const communicator = new CommunicationWithServer(port, portWs);
const userFormController = new FormUserEnterCoordsCntrl(userEnterCoordsForms, toolTip, curtain);
const geolocator = new Geolocation(userFormController, informWidget);
const controll = new OrganizerController(
  widget,
  communicator,
  geolocator,
  errMessage,
  toolTip,
  informWidget,
);

controll.activation();
