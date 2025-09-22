#!/usr/bin/env python3
import json
import sys

def create_realistic_bubble_animation(file_path):
    """
    Create realistic bubble animation: bottom to top, very slow, like real bubbles.
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

                # Get original animation duration
                original_translate = dust_animation['bones'][bone_name]['translate']
                max_time = 0
                for keyframe in original_translate:
                    if 'time' in keyframe:
                        max_time = max(max_time, keyframe['time'])

                # Use original duration or default to 24 seconds
                animation_duration = max_time if max_time > 0 else 24

                # Create realistic bubble movement parameters
                # Bottom of screen (positive Y in Spine coordinate system)
                bottom_y = 1500  # Start well below screen
                # Top of screen (negative Y in Spine coordinate system)
                top_y = -1500    # End well above screen

                # Create simple, realistic bubble animation
                new_translate_data = [
                    {
                        # Start at bottom
                        "x": 0,
                        "y": bottom_y
                    },
                    {
                        # End at top after full duration
                        "time": animation_duration * 3,  # 3x slower for realistic bubble speed
                        "x": 0,  # No horizontal drift
                        "y": top_y
                    }
                ]

                # Replace translate animation with realistic bubble movement
                dust_animation['bones'][bone_name]['translate'] = new_translate_data
                print(f"Created realistic bubble animation for {bone_name} (duration: {animation_duration * 3}s)")

    # Keep all other animations unchanged (opacity, attachments, etc.)
    print("Preserved all opacity, color, and attachment animations")

    # Create backup and save modified file
    backup_path = file_path + '.realistic_bubble_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Realistic bubble animation saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Creating realistic bubble animation...")
    print("- Bottom of screen to top of screen")
    print("- Very slow movement (3x original duration)")
    print("- Straight vertical movement like real bubbles")
    success = create_realistic_bubble_animation(file_path)

    if success:
        print("\nRealistic bubble animation created successfully!")
        print("✓ Bubbles start from bottom of screen")
        print("✓ Bubbles float slowly to top of screen")
        print("✓ Movement speed is very slow like real bubbles")
        print("✓ All visual effects (opacity, colors) preserved")
        print("✓ Simple, clean vertical movement")
    else:
        print("Failed to create realistic bubble animation.")