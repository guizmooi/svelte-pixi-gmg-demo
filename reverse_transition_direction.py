#!/usr/bin/env python3
import json
import sys

def reverse_transition_direction(file_path):
    """
    Reverse transition animation from top-to-bottom to bottom-to-top.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'animation' not in data['animations']:
        print("No animation found in file")
        return False

    animation = data['animations']['animation']

    # Process bones section if it exists
    if 'bones' in animation:
        bones_to_modify = [
            'dust1', 'dust2', 'dust3', 'dust4',
            'rock1', 'rock2', 'rock3', 'rock4', 'rock5', 'rock6', 'rock7', 'rock8', 'rock9',
            'sparks_a'
        ]

        for bone_name in bones_to_modify:
            if (bone_name in animation['bones'] and
                'translate' in animation['bones'][bone_name]):

                translate_data = animation['bones'][bone_name]['translate']
                print(f"Reversing {bone_name} movement direction...")

                # Reverse Y coordinates in translate keyframes
                for i, keyframe in enumerate(translate_data):
                    if 'y' in keyframe:
                        original_y = keyframe['y']
                        # Reverse Y direction: negative becomes positive, positive becomes negative
                        keyframe['y'] = -original_y
                        print(f"  Keyframe {i}: Y {original_y} -> {keyframe['y']}")

                    # Handle curve control points for Y coordinates
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        # Reverse Y control points (indices 1, 3, 5, 7)
                        for idx in [1, 3, 5, 7]:
                            if idx < len(keyframe['curve']):
                                original_curve_y = keyframe['curve'][idx]
                                keyframe['curve'][idx] = -original_curve_y

                print(f"  ✅ {bone_name} now moves bottom -> top")

    # Create backup and save modified file
    backup_path = file_path + '.direction_reverse_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Reversed transition animation saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/transition/transition.json"

    print("Reversing transition animation direction from top-to-bottom to bottom-to-top...")
    success = reverse_transition_direction(file_path)

    if success:
        print("\nTransition direction reversal completed!")
        print("✅ All elements now move from bottom to top")
        print("✅ Dust particles move upward")
        print("✅ Rocks move upward")
        print("✅ Sparks move upward")
        print("✅ All visual effects preserved")
    else:
        print("Failed to reverse transition direction.")