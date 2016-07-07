
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import FaParagraph from 'react-icons/lib/fa/paragraph';
import FaHashtag from 'react-icons/lib/fa/hashtag';
import FaListUl from 'react-icons/lib/fa/list-ul';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaGlobe from 'react-icons/lib/fa/globe';
import FaPhone from 'react-icons/lib/fa/phone';

export default [
  { title: 'Short Answer', type: 'TextField', icon: FaFileTextO },
  { title: 'Paragraph', type: 'TextArea', icon: FaParagraph },
  { title: 'Numbers', type: 'TextField', icon: FaHashtag, props: { validateAs: 'number', validationMessage: 'Only numbers are allowed in this field.'} },
  { title: 'Multiple choice', type: 'MultipleChoice', icon: FaListUl, props: { multipleChoice: false, otherAllowed: false } },
  { title: 'Email', identity: true, type: 'TextField', icon: FaEnvelopeO, props: { validateAs: 'email', validationMessage: 'Please type a valid e-mail.' } },
  { title: 'Date', type: 'TextField', icon: FaCalendar },
  { title: 'Location', identity: true, type: 'LocationDropdown', icon: FaGlobe },
  { title: 'Phone number', identity: true, type: 'TextField', icon: FaPhone }
];
