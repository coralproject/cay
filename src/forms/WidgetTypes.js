
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import FaParagraph from 'react-icons/lib/fa/paragraph';
import FaHashtag from 'react-icons/lib/fa/hashtag';
import FaListUl from 'react-icons/lib/fa/list-ul';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaGlobe from 'react-icons/lib/fa/globe';
import FaPhone from 'react-icons/lib/fa/phone';

export default [
  {type: 'TextField', title: 'Short Answer', icon: FaFileTextO},
  {type: 'TextArea', title: 'Paragraph', icon: FaParagraph},
  {type: 'TextField', title: 'Numbers', icon: FaHashtag, props: { validateAs: 'number', validationMessage: 'Only numbers are allowed in this field.'} },
  {type: 'MultipleChoice', title: 'Multiple choice', icon: FaListUl, props: { multipleChoice: false, otherAllowed: false } },
  {type: 'TextField', title: 'Email', icon: FaEnvelopeO, props: { validateAs: 'email', validationMessage: 'Please type a valid e-mail.' } },
  {type: 'TextField', title: 'Date', icon: FaCalendar},
  {type: 'LocationDropdown', title: 'Location', icon: FaGlobe},
  {type: 'TextField', title: 'Phone number', icon: FaPhone}
];
