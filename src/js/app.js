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
import BotCommunicator from './Bot/BotCommunicator';
import BotWidget from './Bot/BotWidget';
import BotController from './Bot/BotController';
import MultimediaWidget from './Message Processing/Multimedia/MultimediaWidget';
import MultimediaInputProcessing from './Message Processing/Multimedia/MultimediaInputProcessing';
import FileInputProcessing from './Message Processing/FileInputProcessing';
import SearchController from './Search System/SearchController';
import SearchWidget from './Search System/SearchWidget';
import SearchCommunicationServer from './Search System/SearchCommunicationServer';

const container = document.querySelector('.container');
const userEnterCoordsForms = document.forms.entercoords;
const curtainEl = document.querySelector('.curtain');

const port = 'https://ahj-diploma-chaos-organizer-backend.onrender.com';
const portWs = 'wss://ahj-diploma-chaos-organizer-backend.onrender.com';

const toolTip = new ToolTip('tooltip');
const curtain = new Curtain(curtainEl);
const errMessage = new ShowErrorMessage(container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const informWidget = new ShowInform(container, curtain);

const botCommunicator = new BotCommunicator(port);
const botWidget = new BotWidget(container);
const botController = new BotController(
  botWidget,
  botCommunicator,
  errMessage,
  toolTip,
  informWidget,
);

const communicator = new CommunicationWithServer(port, portWs);
const userFormController = new FormUserEnterCoordsCntrl(userEnterCoordsForms, toolTip, curtain);
const geolocator = new Geolocation(userFormController, informWidget);

const mediaWidget = new MultimediaWidget(container);
const mediaController = new MultimediaInputProcessing(
  mediaWidget,
  communicator,
  geolocator,
  errMessage,
  informWidget,
);

const fileController = new FileInputProcessing(container, communicator, geolocator, errMessage);

const searcherWidget = new SearchWidget(container);
const searchCommunicator = new SearchCommunicationServer(port);
const searcher = new SearchController(searcherWidget, searchCommunicator, errMessage, port);

const factory = new MessageFactory(port);
const pinnedCtrl = new PinnedMessageController(errMessage);
const widget = new OrganizerWidget(container, factory, pinnedCtrl);
const controller = new OrganizerController(
  widget,
  communicator,
  geolocator,
  errMessage,
  toolTip,
  informWidget,
  botController,
  mediaController,
  fileController,
  searcher,
);

controller.activation();
