import {useState} from 'react';

function formatNum(num, a = '', b = '', c = '') {
  let n = num % 100;
  if (n >= 10 && n <= 20) return c;
  n = n % 10;
  if (n > 4 || n === 0) return c;
  if (n > 1) return b;
  return a;
}

function DateTimePretty(props) {
  const date = new Date(props.date);
  const now = new Date();
  const dif = now.getTime() - date.getTime();
  let result;
  if (dif < 60_000) {
    result = 'Менее минуты назад';
  } else if (dif < 3_600_000) {
    const minutes = Math.floor(dif / 60_000);
    result = `${minutes} минут${formatNum(minutes, 'у', 'ы')} назад`;
  } else if (dif < 86_400_000) {
    const hours = Math.floor(dif / 3_600_000);
    result = `${hours} час${formatNum(hours, '', 'а', 'ов')} назад`;
  } else {
    const days = Math.floor(dif / 86_400_000);
    result = `${days} ${formatNum(days, 'день', 'дня', 'дней')} назад`;
  }
  return <DateTime {...props} date={result} />
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}