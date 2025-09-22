#!/usr/bin/env python3
import json
import sys

def reverse_particle_animation_y_coordinates(file_path):
    """
    Reverse Y-coordinate values in dust particle animations to make them move upward instead of downward.
    Also reduce movement speed by 50% for slower motion.
    """

    # Read the original file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']

    # Process bones section if it exists
    if 'bones' in dust_animation:
        bones_to_modify = [
            'particle_control', 'particle_control2', 'particle_control3', 'particle_control4',
            'dust1', 'dust2', 'dust3', 'dust4', 'dust5'
        ]

        for bone_name in bones_to_modify:
            if bone_name in dust_animation['bones'] and 'translate' in dust_animation['bones'][bone_name]:
                translate_data = dust_animation['bones'][bone_name]['translate']

                for keyframe in translate_data:
                    # Reverse Y coordinate and reduce speed by 50%
                    if 'y' in keyframe:
                        keyframe['y'] = -keyframe['y'] * 0.5

                    # Handle curve control points for Y coordinates
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        # Spine curves have 8 values: [cp1x, cp1y, cp2x, cp2y, cp3x, cp3y, cp4x, cp4y]
                        # We need to reverse Y values at indices 1, 3, 5, 7
                        for i in [1, 3, 5, 7]:
                            if i < len(keyframe['curve']):
                                keyframe['curve'][i] = -keyframe['curve'][i] * 0.5

                print(f"Modified {bone_name} translate animation")

    # Create backup and save modified file
    backup_path = file_path + '.backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Modified file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Reversing particle animation Y-coordinates...")
    success = reverse_particle_animation_y_coordinates(file_path)

    if success:
        print("Animation modification completed successfully!")
        print("Particles should now move from bottom to top slowly.")
    else:
        print("Failed to modify animation.")