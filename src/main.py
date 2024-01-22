import re, sys

from PyQt5.QtWidgets import QApplication
from src.gui import WidgetGallery

if __name__ == "__main__":
    app = QApplication(sys.argv)
    gallery = WidgetGallery()
    gallery.show()
    sys.exit(app.exec())
