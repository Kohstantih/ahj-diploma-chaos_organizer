export default class BotController {
  constructor(widget, communicator, errMessage, toolTip, informWidget) {
    this.widget = widget;
    this.communicator = communicator;
    this.errMessage = errMessage;
    this.toolTip = toolTip;
    this.informWidget = informWidget;

    this.statusBot = false;

    this.selectorsIgnoreClick = ['.options-bot_box', '.bot-info_container'];

    this.commandList = [
      {
        command: 'погода',
        commandCode: 'wheather',
      },
      {
        command: 'валюта',
        commandCode: 'currency',
      },
      {
        command: 'новости',
        commandCode: 'news',
      },
      {
        command: 'афиша',
        commandCode: 'poster',
      },
      {
        command: 'картинка',
        commandCode: 'image',
      },
    ];

    this.showInputBot = this.showInputBot.bind(this);
    this.validationCommand = this.validationCommand.bind(this);
  }

  activation() {
    this.widget.btnBotCntl.addEventListener('click', this.showInputBot);

    this.widget.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) this.validationCommand(e.target.value);
    });

    this.widget.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }

  showInputBot() {
    this.widget.searchInputBox.classList.toggle('options-active');
    this.widget.botInputBox.classList.toggle('options-active');

    this.validationBotStatus();

    this.statusBot = !this.statusBot;
  }

  validationBotStatus() {
    if (this.statusBot) this.widget.hideBotInform();
  }

  isFairTarget(target) {
    if (this.selectorsIgnoreClick.filter((s) => target.closest(s)).length !== 0) return false;

    return true;
  }

  validationCommand(value) {
    const result = this.commandList.find((cmd) => cmd.command === value);
    if (result) {
      this.communicator.getInfo(result.commandCode).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось отфильтровать сообщения');
      }).then((data) => {
        if (data) {
          this.widget.showBotInform(data);
          return;
        }
        throw new Error('Не удалось обработать ответ сервера');
      }).catch((err) => {
        this.errMessage.showMessage(err.message);
      });

      this.widget.input.value = '';
    } else {
      const message = 'Недопустимая команда\nВведите одну из команд:\n*погода\n*валюта\n*новости\n*афиша\n*картинка';
      this.toolTip.showToolTip(this.widget.input, message, 'down');
    }
  }
}
