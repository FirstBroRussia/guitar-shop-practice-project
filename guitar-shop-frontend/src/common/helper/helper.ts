import { GuitarEnum } from '../enum/guitar.enum';

export const getGuitarTypeString = (guitarType: string): string => {
  switch (guitarType) {
    case GuitarEnum.Acoustic: return 'Акустическая гитара';
    case GuitarEnum.Electro: return 'Электрогитара';
    case GuitarEnum.Ukulele: return 'Укулеле';
    default: return 'Неизвестный вид гитары :-)';
  }
};

export const getTransformDate = (ISOString: string) => {
  const getTransformMonth = (monthNumber: number): string => {
    switch (monthNumber) {
      case 0: return 'января';
      case 1: return 'февраля';
      case 2: return 'марта';
      case 3: return 'апреля';
      case 4: return 'мая';
      case 5: return 'июня';
      case 6: return 'июля';
      case 7: return 'августа';
      case 8: return 'сентября';
      case 9: return 'октября';
      case 10: return 'ноября';
      case 11: return 'декабря';
      default: return 'Неизвестный месяц :-)';
    }
  };

  const day = new Date(ISOString).getDate();
  const month = getTransformMonth(new Date(ISOString).getMonth());

  return `${day < 10 ? `0${day}` : day} ${month}`;
};

export const getTransformDateForOrderComponents = (ISOString: string): string => {
  const day = new Date(ISOString).getDate();
  const month = new Date(ISOString).getMonth() + 1;
  const year = new Date(ISOString).getFullYear();

  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
};
