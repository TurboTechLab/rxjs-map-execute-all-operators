import './style.css';
import { timer, take, map, tap, share } from 'rxjs';
import { logToDiv } from './display';
import { concatMap, mergeMap, switchMap, exhaustMap } from 'rxjs';

const source = timer(0, 2000).pipe(take(4));
const countTill2Task = timer(300, 1500).pipe(take(3));

//Shared source of mapped tasks for testing.
const sharedSource = source.pipe(
  tap((v) => logToDiv('one', v)),
  share()
);
//Each data from source, maps to a countTill2Task
sharedSource.pipe(concatMap((v) => countTill2Task)).subscribe((v) => logToDiv('two', v));
sharedSource.pipe(mergeMap((v) => countTill2Task)).subscribe((v) => logToDiv('three', v));
sharedSource.pipe(exhaustMap((v) => countTill2Task)).subscribe((v) => logToDiv('four', v));
sharedSource.pipe(switchMap((v) => countTill2Task)).subscribe((v) => logToDiv('five', v));

//Displayed for reference purpose
countTill2Task.subscribe((v) => logToDiv('map', v));
