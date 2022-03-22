import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
   * This function formats Date object to luxon DateTime object and finally to string in DD/MM/YYYY, HH:MM:SS format
   * @param jsDateFormat Date object 
   * @returns formatted string
   */
  public formatToDayMonthYearTimeFormat(jsDateFormat: Date | undefined): string {

    // I'm not sure why I need that step ;(
    const jsDate = new Date(jsDateFormat!);

    // Convert JSDate object to Luxon DateTime object
    const luxonDate = DateTime.fromJSDate(jsDate);

    // Convert to DD/MM/YYYY, HH:MM:SS
    const dateString = luxonDate.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

    // Return formatted string
    return dateString;

  }

}
