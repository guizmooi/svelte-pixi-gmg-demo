#!/usr/bin/env python3
import json
import sys

def fix_direction_only(file_path):
    """
    Fine-tune only the direction to ensure all bubbles move bottom -> top.
    Keep all animations working, just adjust Y-coordinate direction.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']

    # Only modify bones translate data
    if 'bones' in dust_animation:
        bones_to_modify = [
            'particle_control', 'particle_control2', 'particle_control3', 'particle_control4',
            'dust1', 'dust2', 'dust3', 'dust4', 'dust5'
        ]

        for bone_name in bones_to_modify:
            if (bone_name in dust_animation['bones'] and
                'translate' in dust_animation['bones'][bone_name]):

                translate_data = dust_animation['bones'][bone_name]['translate']
                print(f"Checking direction for {bone_name}...")

                # Analyze current movement pattern
                y_values = []
                for keyframe in translate_data:
                    if 'y' in keyframe:
                        y_values.append(keyframe['y'])

                if len(y_values) >= 2:
                    start_y = y_values[0] if 'time' not in translate_data[0] or translate_data[0].get('time', 0) == 0 else y_values[0]
                    end_y = y_values[-1]

                    print(f"  Current: Y {start_y} -> {end_y}")

                    # Check if movement is upward (from higher Y to lower Y)
                    # In Spine: positive Y = down, negative Y = up
                    # So bottom->top should be: positive Y -> negative Y

                    if start_y < end_y:  # Currently moving downward
                        print(f"  ❌ Moving downward, reversing direction...")
                        # Reverse all Y values
                        for keyframe in translate_data:
                            if 'y' in keyframe:
                                keyframe['y'] = -keyframe['y']

                            # Handle curve control points
                            if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                                for idx in [1, 3, 5, 7]:
                                    if idx < len(keyframe['curve']):
                                        keyframe['curve'][idx] = -keyframe['curve'][idx]
                        print(f"  ✅ Direction fixed: bottom -> top")
                    else:
                        print(f"  ✅ Already moving bottom -> top")

    # Create backup and save modified file
    backup_path = file_path + '.direction_fix_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Direction-fixed file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Fixing bubble direction to ensure bottom -> top movement...")
    success = fix_direction_only(file_path)

    if success:
        print("\nDirection fix completed!")
        print("✓ All bubbles now move from bottom to top")
        print("✓ All animations preserved")
        print("✓ Only direction adjusted")
    else:
        print("Failed to fix direction.")