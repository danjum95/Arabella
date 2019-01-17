export const localeConfigPolish = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
  monthNamesShort: ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'],
  dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
  dayNamesShort: ['Pn.','Wt.','Śr.','Czw.','Pt.','Sb.','Nd.']
};

export function extractTimeString(dateString) {
  const timeString = dateString.split('T')[1];
  return timeString.split(':')[0] + ':' + timeString.split(':')[1];
}

export function includesObject(array, object) {
  let presence = false;
  array.forEach(element => {
    if(element.id === object.id)
      presence = true;
  });
  return presence;
}