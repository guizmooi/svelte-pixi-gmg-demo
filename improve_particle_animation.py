#!/usr/bin/env python3
import json
import sys

def improve_particle_animation(file_path):
    """
    Improve particle animation to make ALL particles start from bottom and move straight up slowly.
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
                translate_data = dust_animation['bones'][bone_name]['translate']

                # Find the time span of the animation
                max_time = 0
                for keyframe in translate_data:
                    if 'time' in keyframe:
                        max_time = max(max_time, keyframe['time'])

                # Calculate slow upward movement (from bottom to top)
                # Bottom position: around +800 to +1200 (positive Y is down in Spine)
                # Top position: around -800 to -1200 (negative Y is up in Spine)
                bottom_y = 1000  # Start from bottom
                top_y = -1000    # End at top

                # Create new simple animation: straight up movement
                new_translate_data = []

                # Starting keyframe (at bottom)
                new_translate_data.append({
                    "x": 0,
                    "y": bottom_y
                })

                # Ending keyframe (at top) - much slower movement
                new_translate_data.append({
                    "time": max_time if max_time > 0 else 24,  # Use existing duration or 24 seconds
                    "x": 0,  # No horizontal movement
                    "y": top_y,
                    "curve": "linear"  # Smooth linear movement
                })

                # Replace the existing animation data
                dust_animation['bones'][bone_name]['translate'] = new_translate_data
                print(f"Rebuilt {bone_name} animation for bottom-to-top movement")

    # Create another backup
    backup_path = file_path + '.improved_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Improved file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Improving particle animation for bottom-to-top movement...")
    success = improve_particle_animation(file_path)

    if success:
        print("Animation improvement completed successfully!")
        print("All particles should now move straight from bottom to top slowly.")
    else:
        print("Failed to improve animation.")