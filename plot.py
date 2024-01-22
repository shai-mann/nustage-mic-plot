import re

def preprocess(numbers):
    """
    Handles preprocessing the data into manageable amounts
    """
    names = []
    people = []
    for line in numbers:
        names.append(re.findall(r"\"(.*)\"", line)[0])
        people.append(sorted([x.strip() for x in re.findall(r"\[(.*)\]", line)[0].split(",")]))
    return (names, people)

    

def get_last_person(mic, i):
    for p in reversed(mic[:i]):
        if p != None:
            return p
        

def time_since_use(mic):
    count = 0
    for p in reversed(mic):
        if p == None:
            count += 1
        else:
            break
    return count


def find_mic(person, mics, i):
    """
    Finds the best microphone for the given person given the currently existing list of mics.
    The "i" parameter is the index of the current number.
    """
    if i != 0:
        for mic in mics:
            if get_last_person(mic, i) == person:
                # carry over person if they had mic from previous number
                old_person = mic[i]
                mic[i] = person
                if old_person != None:
                    find_mic(old_person, mics, i)
                return

    # we know they weren't mic'ed in a previous number
    # now we want to know find a mic that wasn't used in a while
    most_unused_mic = max(mics, key=lambda m: time_since_use(m))
    if most_unused_mic[i] != None:
        print(f"Couldn't find an unused mic at iteration {i} for person {person}")
        return
    else:
        most_unused_mic[i] = person
        return


def plot(numbers, num_mics):
    """
    Handles plotting the mics - this is done by going number by number,
    assigning mics based on previous numbers.

    If a previous number included the same person, then that person retains their mic.
    If a new person is in this number, then they will first attempt to take an unused mic.
    The first unused mic to be taken is the one that is unused for the longest time.
    If no unused microphone is available, then they will take a random taken mic (that isn't
    in use by a carry over). If no mic is available, then it is noted in the console and none 
    is assigned.
    """
    mics = [[None] * len(numbers) for _ in range(num_mics)]
    for i, number in enumerate(numbers):
        for person in number:
            find_mic(person, mics, i)
    return mics
