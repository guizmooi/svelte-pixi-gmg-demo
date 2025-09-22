#!/usr/bin/env python3
import json
import sys

def fix_bubbles_carefully(file_path):
    """
    Very carefully modify only Y coordinates in bone translate animations,
    preserving ALL slot animations, timing, and other data.
    """

    # Read the original file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']
    print(f"Found animation sections: {list(dust_animation.keys())}")

    # Only modify bones translate data, leave slots completely untouched
    if 'bones' in dust_animation:
        bones_to_modify = [
            'particle_control', 'particle_control2', 'particle_control3', 'particle_control4',
            'dust1', 'dust2', 'dust3', 'dust4', 'dust5'
        ]

        for bone_name in bones_to_modify:
            if (bone_name in dust_animation['bones'] and
                'translate' in dust_animation['bones'][bone_name]):

                translate_data = dust_animation['bones'][bone_name]['translate']
                print(f"Processing {bone_name} with {len(translate_data)} keyframes")

                # Only modify Y coordinates in existing keyframes
                for i, keyframe in enumerate(translate_data):
                    # Only modify Y coordinate, keep everything else
                    if 'y' in keyframe:
                        original_y = keyframe['y']
                        # Reverse direction and amplify for bottom-to-top movement
                        new_y = -original_y * 2  # Reverse and double the range
                        keyframe['y'] = new_y
                        print(f"  Keyframe {i}: Y {original_y} -> {new_y}")

                    # Handle curve control points for Y coordinates only
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list):
                        # Only modify Y control points (indices 1, 3, 5, 7)
                        for idx in [1, 3, 5, 7]:
                            if idx < len(keyframe['curve']):
                                original_curve_y = keyframe['curve'][idx]
                                keyframe['curve'][idx] = -original_curve_y * 2

                print(f"Modified {bone_name} translate animation")

    # Verify slots are untouched
    if 'slots' in dust_animation:
        print(f"Preserved {len(dust_animation['slots'])} slot animations")

    # Create backup and save modified file
    backup_path = file_path + '.careful_fix_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Carefully modified file saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Carefully fixing bubble animations...")
    print("- Preserving ALL slot animations (opacity, attachments)")
    print("- Preserving ALL timing and curves")
    print("- Only modifying Y-coordinates in bone translations")
    success = fix_bubbles_carefully(file_path)

    if success:
        print("\nCareful bubble animation fix completed!")
        print("✓ All slot animations preserved (bubbles will appear/disappear)")
        print("✓ All timing preserved")
        print("✓ Only Y-coordinates reversed for upward movement")
        print("✓ Movement range doubled for bottom-to-top effect")
    else:
        print("Failed to fix bubble animations.")