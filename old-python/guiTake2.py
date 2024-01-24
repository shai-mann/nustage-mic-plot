import tkinter as tk

class SceneComponent:
    def __init__(self, parent, scene_data, update_callback):
        self.parent = parent
        self.scene_data = scene_data
        self.update_callback = update_callback

        self.frame = tk.Frame(parent, padx=10, pady=10, relief=tk.GROOVE, borderwidth=2)
        self.frame.grid(row=0, column=0, pady=5, sticky="nsew")

        self.label = tk.Label(self.frame, text=f"Scene {scene_data['number']}", font=("Helvetica", 12, "bold"))
        self.label.grid(row=0, column=0, pady=5)

        self.actor_listbox = tk.Listbox(self.frame, selectmode=tk.SINGLE, exportselection=False, font=("Helvetica", 10), height=5, width=30)
        self.actor_listbox.grid(row=1, column=0, pady=5)

        self.actor_name_entry = tk.Entry(self.frame, width=20)
        self.actor_name_entry.grid(row=2, column=0, pady=5)

        self.add_actor_button = tk.Button(self.frame, text="Add Actor", command=self.add_actor)
        self.add_actor_button.grid(row=3, column=0, pady=5)

    def add_actor(self):
        actor_name = self.actor_name_entry.get()

        if actor_name:
            self.scene_data['actors'].append(actor_name)
            self.actor_listbox.insert(tk.END, actor_name)
            self.actor_name_entry.delete(0, 'end')

            # Notify parent to update overall scene breakdown
            self.update_callback()

class ActorManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Actor Management System")
        self.root.geometry("800x600")  # Increased window size

        self.scenes = []  # List to store scenes, each scene is a dictionary with 'number' and 'actors'
        self.scene_components = []

        # Label for scene breakdown
        tk.Label(root, text="Scene-by-Scene Breakdown:", font=("Helvetica", 14, "bold")).grid(row=0, column=0, pady=5, sticky="w", columnspan=3)

        # Frame for scene components with vertical scrollbar
        self.scene_frame = tk.Frame(root, padx=10, pady=10, relief=tk.GROOVE, borderwidth=2)
        self.scene_frame.grid(row=1, column=0, pady=5, columnspan=3, sticky="nsew")

        self.scrollbar = tk.Scrollbar(self.scene_frame, orient="vertical")
        self.scene_canvas = tk.Canvas(self.scene_frame, yscrollcommand=self.scrollbar.set)
        self.scene_canvas.grid(row=0, column=0, sticky="nsew")

        self.scrollbar.config(command=self.scene_canvas.yview)
        self.scrollbar.grid(row=0, column=1, sticky="ns")

        # Frame to contain the scene components
        self.scene_container = tk.Frame(self.scene_canvas)
        self.scene_canvas.create_window((0, 0), window=self.scene_container, anchor="nw")

        # Bind the canvas to the scrollbar
        self.scene_canvas.bind("<Configure>", lambda event, canvas=self.scene_canvas: self.on_frame_configure(canvas))
        self.scene_frame.bind("<Enter>", self._bind_mousewheel)
        self.scene_frame.bind("<Leave>", self._unbind_mousewheel)

        # Configure grid weights for resizing
        self.scene_frame.grid_columnconfigure(0, weight=1)

        # Button to add scenes
        tk.Button(root, text="Add Scene", command=self.add_scene, font=("Helvetica", 12, "bold")).grid(row=2, column=0, pady=10)

        # Configure grid weights for resizing
        root.grid_columnconfigure(0, weight=1)
        root.grid_rowconfigure(1, weight=1)

    def add_scene(self):
        scene_number = len(self.scenes) + 1
        new_scene = {'number': scene_number, 'actors': []}
        self.scenes.append(new_scene)

        # Create a new scene component
        scene_component = SceneComponent(self.scene_frame, new_scene, self.update_scene_breakdown)
        self.scene_components.append(scene_component)

        # Position the scene component in a new row within the scene_frame
        scene_component.frame.grid(row=len(self.scene_components) - 1, column=0, pady=5, sticky="nsew")

        # Update overall scene breakdown
        self.update_scene_breakdown()

    def on_frame_configure(self, canvas):
        canvas.configure(scrollregion=canvas.bbox("all"))

    def _bind_mousewheel(self, event):
        self.scene_frame.bind_all("<MouseWheel>", self._on_mousewheel)

    def _unbind_mousewheel(self, event):
        self.scene_frame.unbind_all("<MouseWheel>")

    def _on_mousewheel(self, event):
        self.scene_canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")


    def update_scene_breakdown(self):
        # Notify parent to update overall scene breakdown
        # (For future use, in case you want to perform any additional updates)
        pass
