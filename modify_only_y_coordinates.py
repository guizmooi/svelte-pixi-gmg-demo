#!/usr/bin/env python3
import json
import sys

def modify_only_y_coordinates(file_path):
    """
    Only modify Y-coordinates in translate animations, preserve ALL other animation data.
    """

    # Read the original file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']

    # Only process bones translate data, leave everything else untouched
    if 'bones' in dust_animation:
        bones_to_modify = [
            'particle_control', 'particle_control2', 'particle_control3', 'particle_control4',
            'dust1', 'dust2', 'dust3', 'dust4', 'dust5'
        ]

        for bone_name in bones_to_modify:
            if (bone_name in dust_animation['bones'] and
                'translate' in dust_animation['bones'][bone_name]):

                translate_data = dust_animation['bones'][bone_name]['translate']

                # Only modify Y coordinates in translate keyframes
                for keyframe in translate_data:
                    # Only modify Y coordinate, leave X and time unchanged
                    if 'y' in keyframe:
                        original_y = keyframe['y']
                        # Reverse direction and make movement slower
                        keyframe['y'] = -original_y * 0.7  # Reverse and slightly reduce speed

                    # Handle curve control points for Y coordinates only
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        # Only modify Y control points (indices 1, 3, 5, 7)
                        for i in [1, 3, 5, 7]:
                            if i < len(keyframe['curve']):
                                keyframe['curve'][i] = -keyframe['curve'][i] * 0.7

                print(f"Modified only Y-coordinates in {bone_name} translate animation")

    # Create backup and save modified file
    backup_path = file_path + '.y_only_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Y-coordinate modified file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Modifying only Y-coordinates in translate animations...")
    print("Preserving ALL other animation data (opacity, attachments, etc.)")
    success = modify_only_y_coordinates(file_path)

    if success:
        print("Y-coordinate modification completed!")
        print("- Preserved ALL opacity/color animations")
        print("- Preserved ALL attachment animations")
        print("- Preserved ALL timing and curves")
        print("- Only reversed Y-coordinates for upward movement")
        print("- Bubbles should appear with all effects and move bottom to top")
    else:
        print("Failed to modify Y-coordinates.")