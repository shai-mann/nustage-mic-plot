import re, sys

import tkinter as tk
from guiTake2 import ActorManager

from plot import plot, preprocess
def plot(self):
    numbers = open("numbers.txt")
    (n, p) = preprocess(numbers)
    mics = plot(p, self.num_mics)
    for i, mic in enumerate(mics):
        print(f"Mic {i}: {mic}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ActorManager(root)
    root.mainloop()
