import tkinter as tk
from tkinter import messagebox


class SceneComponent:
    def __init__(self, parent, scene_data, scene_components, update_callback):
        self.parent = parent
        self.scene_data = scene_data
        self.scene_components = scene_components
        self.update_callback = update_callback

        self.frame = tk.Frame(parent, padx=10, pady=10, relief=tk.GROOVE, borderwidth=2)
        self.frame.grid(row=0, column=len(self.scene_components), sticky="n")

        self.label = tk.Label(
            self.frame,
            text=f"Scene {scene_data['number']}",
            font=("Helvetica", 12, "bold"),
        )
        self.label.grid(row=0, column=0, pady=5, columnspan=2)

        self.actor_name_entry = tk.Entry(self.frame, width=20)
        self.actor_name_entry.grid(row=1, column=0, pady=5, padx=5)

        self.add_actor_button = tk.Button(
            self.frame, text="Add Actor", command=self.add_actor
        )
        self.add_actor_button.grid(row=1, column=1, pady=5, padx=5)

        self.update_scene_view()

    def add_actor(self):
        actor_name = self.actor_name_entry.get()

        if actor_name:
            self.scene_data["actors"].append(actor_name)
            self.actor_name_entry.delete(0, "end")

            # Update scene view
            self.update_scene_view()

            # Notify parent to update overall scene breakdown
            self.update_callback()

    def update_scene_view(self):
        # Clear previous actors
        for widget in self.frame.winfo_children():
            if widget != self.label:
                widget.destroy()

        # Display current actors
        for i, actor in enumerate(self.scene_data["actors"]):
            actor_label = tk.Label(
                self.frame, text=f"Actor {i + 1}: {actor}", font=("Helvetica", 10)
            )
            actor_label.grid(row=i + 2, column=0, pady=2, padx=5, columnspan=2)

        # Entry for adding actors
        self.actor_name_entry = tk.Entry(self.frame, width=20)
        self.actor_name_entry.grid(
            row=len(self.scene_data["actors"]) + 2, column=0, pady=5, padx=5
        )

        # Button for adding actors
        self.add_actor_button = tk.Button(
            self.frame, text="Add Actor", command=self.add_actor
        )
        self.add_actor_button.grid(
            row=len(self.scene_data["actors"]) + 3, column=0, pady=5, padx=5
        )

        # Reconfigure callback on button click
        self.add_actor_button["command"] = self.add_actor


class ActorManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Actor Management System")
        self.root.geometry("800x600")  # Increased window size

        self.scenes = []  # List to store scenes, each scene is a dictionary with 'number' and 'actors'
        self.scene_components = []

        # Label for scene breakdown
        tk.Label(root, text="Scene-by-Scene Breakdown:", font=("Helvetica", 14, "bold")).grid(row=0, column=0, pady=5, sticky="w", columnspan=3)

        # Frame for scene components with horizontal scrollbar
        self.scene_frame = tk.Frame(root, padx=10, pady=10, relief=tk.GROOVE, borderwidth=2)
        self.scene_frame.grid(row=1, column=0, pady=5, columnspan=3, sticky="nsew")

        self.scrollbar = tk.Scrollbar(self.scene_frame, orient="horizontal")
        self.scene_frame_canvas = tk.Canvas(self.scene_frame, xscrollcommand=self.scrollbar.set)
        self.scene_frame_canvas.grid(row=0, column=0, sticky="nsew")

        self.scrollbar.config(command=self.scene_frame_canvas.xview)
        self.scrollbar.grid(row=1, column=0, sticky="ew")

        self.scene_frame.grid_rowconfigure(0, weight=1)
        self.scene_frame.grid_columnconfigure(0, weight=1)

        # Button to add scenes
        tk.Button(root, text="Add Scene", command=self.add_scene, font=("Helvetica", 12, "bold")).grid(row=2, column=0, pady=10, columnspan=3)

        # Configure grid weights for resizing
        root.grid_columnconfigure(0, weight=1)
        root.grid_rowconfigure(1, weight=1)

        # Adding dummy scenes for testing scrollbar
        for i in range(20):
            self.add_scene()

    def add_scene(self):
        scene_number = len(self.scenes) + 1
        new_scene = {'number': scene_number, 'actors': []}
        self.scenes.append(new_scene)

        # Create a new scene component
        scene_component = SceneComponent(self.scene_frame_canvas, new_scene, self.scene_components, self.update_scene_breakdown)
        self.scene_components.append(scene_component)

        # Update overall scene breakdown
        self.update_scene_breakdown()

        # Update the canvas window after adding each scene
        self.scene_frame_canvas.update_idletasks()

        # Bind the canvas to the scrollbar
        self.scene_frame_canvas.configure(xscrollcommand=self.scrollbar.set)

        # Add a window to the canvas for each scene
        for component in self.scene_components:
            self.scene_frame_canvas.create_window((0, 0), window=component.frame, anchor="nw")

        # Update the canvas window
        self.scene_frame_canvas.configure(scrollregion=self.scene_frame_canvas.bbox("all"))


    def update_scene_breakdown(self):
        # Remove all previous windows from the canvas
        self.scene_frame_canvas.delete("all")

        # Coordinates to position each window vertically
        y_coordinate = 0

        # Add a window to the canvas for each scene
        for component in self.scene_components:
            self.scene_frame_canvas.create_window((0, y_coordinate), window=component.frame, anchor="nw")
            y_coordinate += component.frame.winfo_reqheight()  # Adjust the y-coordinate

        # Update the canvas window
        self.scene_frame_canvas.configure(scrollregion=self.scene_frame_canvas.bbox("all"))



