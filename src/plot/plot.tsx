import { Scene } from "../App";

type Mic = (string | null)[];

function get_last_person(mic: Mic, i: number): string | null {
  for (const p of mic.slice(0, i).reverse()) {
    if (p !== null) {
      return p;
    }
  }
  return null;
}

function time_since_use(mic: Mic): number {
  let count = 0;
  for (const p of mic.slice().reverse()) {
    if (p === null) {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}

function find_mic(person: string, mics: Mic[], i: number): void {
  if (i !== 0) {
    for (const mic of mics) {
      const lastPerson = get_last_person(mic, i);
      if (lastPerson === person) {
        // carry over person if they had mic from previous number
        const oldPerson = mic[i];
        mic[i] = person;
        if (oldPerson !== null) {
          find_mic(oldPerson, mics, i);
        }
        return;
      }
    }
  }

  // we know they weren't mic'ed in a previous number
  // now we want to find a mic that wasn't used in a while
  const mostUnusedMic = mics.reduce(
    (acc, mic) => (time_since_use(mic) > time_since_use(acc) ? mic : acc),
    mics[0]
  );

  if (mostUnusedMic[i] !== null) {
    console.log(
      `Couldn't find an unused mic at iteration ${i} for person ${person}`
    ); // TODO: surface error
    return;
  } else {
    mostUnusedMic[i] = person;
    return;
  }
}

export function plot(scenes: Scene[], numMics: number): Mic[] {
  const mics: Mic[] = Array.from({ length: numMics }, () =>
    Array(scenes.length).fill(null)
  );

  scenes.forEach((scene, i) => {
    scene.actors.forEach((actor) => {
      find_mic(actor, mics, i);
    });
  });

  return mics;
}
