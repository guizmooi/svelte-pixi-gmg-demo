#!/usr/bin/env python3
import json
import sys

def fix_bubble_animation(file_path):
    """
    Fix bubble animation to start from very bottom of display and move slowly to top like real bubbles.
    """

    # Read the current file
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

                # Create much slower bubble-like movement
                # Start from very bottom of screen (much higher positive Y value)
                # End at very top of screen (much lower negative Y value)
                bottom_y = 2000  # Start from very bottom (off-screen bottom)
                top_y = -2000    # End at very top (off-screen top)

                # Much longer duration for very slow movement (like real bubbles)
                animation_duration = 60  # 60 seconds for very slow movement

                # Create new slow bubble animation
                new_translate_data = [
                    {
                        "x": 0,
                        "y": bottom_y  # Start from bottom
                    },
                    {
                        "time": animation_duration,
                        "x": 0,        # No horizontal movement
                        "y": top_y     # End at top
                    }
                ]

                # Replace the existing animation data
                dust_animation['bones'][bone_name]['translate'] = new_translate_data
                print(f"Fixed {bone_name} for slow bottom-to-top bubble movement (60s duration)")

    # Create another backup
    backup_path = file_path + '.bubble_fix_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Fixed file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Fixing bubble animation for realistic slow bottom-to-top movement...")
    success = fix_bubble_animation(file_path)

    if success:
        print("Bubble animation fix completed successfully!")
        print("Bubbles should now move very slowly from bottom of display to top of screen.")
        print("Animation duration: 60 seconds for realistic bubble behavior.")
    else:
        print("Failed to fix bubble animation.")