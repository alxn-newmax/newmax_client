import moment from 'moment';

class FormatDate {
  getTodayTimestamp() {
    return moment().startOf('day').valueOf();
  }

  getYesterdayTimestamp() {
    return moment().startOf('day').subtract(1, 'day').valueOf();
  }

  getStartYearTimestamp() {
    return moment(moment().startOf('year').subtract(1, 'year')).format('X');
  }

  reverseToSplash(date: string) {
    return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
  }

  reverseToDotted(date: string) {
    return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
  }

  convertDateToTimestamp(date: string, format = 'x') {
    return moment(date, 'YYYY-MM-DD').format(format);
  }

  convertTimestampToDate(date: string, format = 'x') {
    return moment(date, format).format('YYYY-MM-DD');
  }

  formatDateTo(date: string, mask: string, format: string) {
    return moment(date, mask).format(format);
  }
}

export const fdate = new FormatDate();
