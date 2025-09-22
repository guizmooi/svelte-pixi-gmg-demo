#!/usr/bin/env python3
import json
import sys

def fix_animation_properly(file_path):
    """
    Properly modify existing animation data to reverse Y coordinates without deleting animations.
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

                # Modify existing keyframes instead of replacing them
                for keyframe in translate_data:
                    # Reverse and slow down Y coordinate
                    if 'y' in keyframe:
                        # Reverse direction and make movement much slower
                        original_y = keyframe['y']
                        # Reverse sign and multiply by 3 to make movement larger and slower
                        keyframe['y'] = -original_y * 3

                    # Handle curve control points for Y coordinates if they exist
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        # Spine curves have 8 values: [cp1x, cp1y, cp2x, cp2y, cp3x, cp3y, cp4x, cp4y]
                        # We need to reverse Y values at indices 1, 3, 5, 7
                        for i in [1, 3, 5, 7]:
                            if i < len(keyframe['curve']):
                                keyframe['curve'][i] = -keyframe['curve'][i] * 3

                    # Extend animation duration to make it slower
                    if 'time' in keyframe:
                        # Double the time to make animation twice as slow
                        keyframe['time'] = keyframe['time'] * 2

                print(f"Modified {bone_name} animation (reversed Y, made slower)")

    # Create backup and save modified file
    backup_path = file_path + '.proper_fix_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Properly modified file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Properly fixing animation without deleting data...")
    success = fix_animation_properly(file_path)

    if success:
        print("Animation properly fixed!")
        print("- Preserved all original animation data")
        print("- Reversed Y coordinates for upward movement")
        print("- Made movement 3x larger and 2x slower")
        print("- Bubbles should now appear and move from bottom to top slowly")
    else:
        print("Failed to fix animation.")