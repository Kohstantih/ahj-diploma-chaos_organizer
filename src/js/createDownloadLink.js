import CreationElements from './CreationElements';

export default function createDownloadLink(objectURL, name) {
  const link = CreationElements.createElement(
    'a',
    ['download_message', 'message-ctrl_btn'],
    [
      { name: 'href', value: `${objectURL}` },
      { name: 'download', value: name },
    ],
  );

  return link;
}
