import './style.css';
import { timer, take, map, tap, share } from 'rxjs';
import { logToDiv } from './display';
import { concatAll, mergeAll, switchAll, exhaustAll } from 'rxjs';

const source = timer(0, 2000).pipe(take(4));
const countTill2Task = timer(300, 1500).pipe(take(3));

//Shared source of mapped tasks for testing.
const mapDataToTask = source.pipe(
  tap((v) => logToDiv('one', v)),
  map((v) => countTill2Task),
  share()
);
//Each data from source, maps to a countTill2Task
mapDataToTask.pipe(concatAll()).subscribe((v) => logToDiv('two', v));
mapDataToTask.pipe(mergeAll()).subscribe((v) => logToDiv('three', v));
mapDataToTask.pipe(exhaustAll()).subscribe((v) => logToDiv('four', v));
mapDataToTask.pipe(switchAll()).subscribe((v) => logToDiv('five', v));

//Displayed for reference purpose
countTill2Task.subscribe((v) => logToDiv('map', v));
