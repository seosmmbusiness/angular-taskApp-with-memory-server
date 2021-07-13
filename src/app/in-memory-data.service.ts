import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const reminders:any[] = [
      { id: 'adasda5565umsdassf',note: 'example', date: '2021-01-01T10:15:00.000Z' },
      { id: 'adasdasdfa3sddassf',note: 'example2', date: '2018-01-01T10:15:00.000Z' },
      { id: 'ad232asda767sdassf',note: 'example3', date: '2019-02-01T10:15:00.000Z' },
      { id: 'adasd1423asdasfqsf',note: 'example4', date: '2020-03-01T10:15:00.000Z' },
      { id: 'adasdadwhsdassffsd',note: 'example5', date: '2019-04-14T10:18:00.000Z' },
      { id: 'adasd234234asdassf',note: 'example6', date: '2022-04-14T10:15:00.000Z' }
    ];
    return {reminders};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(reminders: any[]): string {
    return reminders.length > 0 ? Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) : '11';
  }
}
