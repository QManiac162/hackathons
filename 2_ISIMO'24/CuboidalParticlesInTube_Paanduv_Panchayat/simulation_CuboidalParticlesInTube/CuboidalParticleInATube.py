import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

# Parameters
num_particles = 100
tube_length = 10
tube_radius = 5
particle_size = np.array([0.5, 1.0, 0.5])
time_step = 0.01
num_steps = 500
gravity = np.array([0, 0, -9.81])  # Gravity vector

# Initialize particle positions and velocities
positions = np.random.rand(num_particles, 3) * np.array([tube_length, tube_radius * 2, tube_radius * 2]) - np.array([0, tube_radius, tube_radius])
velocities = (np.random.rand(num_particles, 3) - 0.5) * 2

def update_positions(positions, velocities):
    new_positions = positions + velocities * time_step
    for i in range(num_particles):
        if new_positions[i, 0] < 0:
            new_positions[i, 0] = 0
            velocities[i, 0] *= -1
        elif new_positions[i, 0] > tube_length:
            new_positions[i, 0] = tube_length
            velocities[i, 0] *= -1

        radial_distance = np.linalg.norm(new_positions[i, 1:3])
        if radial_distance > tube_radius:
            direction = new_positions[i, 1:3] / radial_distance
            new_positions[i, 1:3] = direction * tube_radius
            velocities[i, 1:3] = -velocities[i, 1:3]
    return new_positions

def compute_forces(positions):
    forces = np.zeros_like(positions)
    for i in range(num_particles):
        forces[i] += gravity
        for j in range(i + 1, num_particles):
            diff = positions[j] - positions[i]
            dist = np.linalg.norm(diff)
            if dist < np.sum(particle_size) / 2:
                force_direction = diff / dist
                force_magnitude = (np.sum(particle_size) / 2 - dist) * 1e3  # Arbitrary repulsion force magnitude
                forces[i] -= force_direction * force_magnitude
                forces[j] += force_direction * force_magnitude
    return forces

def create_cuboid_data(center, size):
    o = [center - size / 2, center + size / 2]
    return np.array([[o[0][0], o[0][1], o[0][2]],
                     [o[1][0], o[0][1], o[0][2]],
                     [o[1][0], o[1][1], o[0][2]],
                     [o[0][0], o[1][1], o[0][2]],
                     [o[0][0], o[0][1], o[1][2]],
                     [o[1][0], o[0][1], o[1][2]],
                     [o[1][0], o[1][1], o[1][2]],
                     [o[0][0], o[1][1], o[1][2]]])

def plot_cuboid(ax, center, size):
    data = create_cuboid_data(center, size)
    verts = [[data[j] for j in [0, 1, 2, 3]],
             [data[j] for j in [4, 5, 6, 7]], 
             [data[j] for j in [0, 1, 5, 4]], 
             [data[j] for j in [2, 3, 7, 6]], 
             [data[j] for j in [1, 2, 6, 5]], 
             [data[j] for j in [4, 7, 3, 0]]]
    ax.add_collection3d(Poly3DCollection(verts, facecolors='cyan', linewidths=1, edgecolors='r', alpha=.25))

def plot_tube(ax):
    z = np.linspace(0, tube_length, 100)
    theta = np.linspace(0, 2 * np.pi, 100)
    theta_grid, z_grid = np.meshgrid(theta, z)
    x_grid = tube_radius * np.cos(theta_grid)
    y_grid = tube_radius * np.sin(theta_grid)
    ax.plot_surface(z_grid, x_grid, y_grid, color='lightgray', alpha=0.5)

# Set up the figure and axis
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.set_xlim([0, tube_length])
ax.set_ylim([-tube_radius, tube_radius])
ax.set_zlim([-tube_radius, tube_radius])
ax.set_box_aspect([tube_length, tube_radius*2, tube_radius*2])  # Aspect ratio is 1:1:1

def update(frame):
    global positions, velocities
    forces = compute_forces(positions)
    velocities += forces * time_step
    positions = update_positions(positions, velocities)
    ax.cla()
    ax.set_xlim([0, tube_length])
    ax.set_ylim([-tube_radius, tube_radius])
    ax.set_zlim([-tube_radius, tube_radius])
    plot_tube(ax)
    for i in range(num_particles):
        plot_cuboid(ax, positions[i], particle_size)
    return ax

plot_tube(ax)
anim = FuncAnimation(fig, update, frames=num_steps, interval=20, blit=False)

# Save the animation
writer = PillowWriter(fps=20)
anim.save("cuboidal_particles_in_tube.gif", writer=writer)

plt.show()
