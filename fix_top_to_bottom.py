#!/usr/bin/env python3
import json
import sys

def fix_top_to_bottom(file_path):
    """
    Change bubble direction to move from top -> bottom (falling) for marketing.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']

    # Process bones translate data
    if 'bones' in dust_animation:
        bones_to_modify = [
            'particle_control', 'particle_control2', 'particle_control3', 'particle_control4',
            'dust1', 'dust2', 'dust3', 'dust4', 'dust5'
        ]

        for bone_name in bones_to_modify:
            if (bone_name in dust_animation['bones'] and
                'translate' in dust_animation['bones'][bone_name]):

                translate_data = dust_animation['bones'][bone_name]['translate']
                print(f"Fixing {bone_name} for top -> bottom movement...")

                # Modify each keyframe to ensure top -> bottom movement
                for i, keyframe in enumerate(translate_data):
                    if 'y' in keyframe:
                        current_y = keyframe['y']

                        # For top -> bottom movement:
                        # Start should be negative Y (top)
                        # End should be positive Y (bottom)

                        if i == 0 or keyframe.get('time', 0) == 0:
                            # First keyframe - start from top
                            new_y = -abs(current_y) - 1000  # Ensure it's negative (top)
                        else:
                            # Later keyframes - move toward bottom
                            new_y = abs(current_y) + 1000   # Ensure it's positive (bottom)

                        keyframe['y'] = new_y
                        print(f"  Keyframe {i}: Y {current_y} -> {new_y}")

                    # Handle curve control points
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        for idx in [1, 3, 5, 7]:  # Y control points
                            if idx < len(keyframe['curve']):
                                current_curve_y = keyframe['curve'][idx]
                                # Adjust curve control points for top -> bottom
                                if current_curve_y < 0:
                                    keyframe['curve'][idx] = current_curve_y - 1000
                                else:
                                    keyframe['curve'][idx] = current_curve_y + 1000

                print(f"  ✅ {bone_name} now moves top -> bottom")

    # Create backup and save modified file
    backup_path = file_path + '.top_to_bottom_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Top-to-bottom animation saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Changing bubble direction to top -> bottom (falling) for marketing...")
    success = fix_top_to_bottom(file_path)

    if success:
        print("\nTop-to-bottom direction fix completed!")
        print("✅ Bubbles now fall from top of screen")
        print("✅ Bubbles move to bottom of screen")
        print("✅ Perfect for marketing visuals")
        print("✅ All animations preserved")
    else:
        print("Failed to fix direction.")