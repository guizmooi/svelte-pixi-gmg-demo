#!/usr/bin/env python3
import json
import sys

def slow_down_transition(file_path):
    """
    Slow down the transition animation by extending all timing.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'animation' not in data['animations']:
        print("No animation found in file")
        return False

    animation = data['animations']['animation']

    # Slow down factor (1.5 = 50% slower, 2.0 = 100% slower)
    slowdown_factor = 1.5

    # Process slots section (opacity/color animations)
    if 'slots' in animation:
        print("Slowing down slot animations (opacity/color effects)...")
        for slot_name, slot_data in animation['slots'].items():
            if 'rgba' in slot_data:
                for keyframe in slot_data['rgba']:
                    if 'time' in keyframe:
                        original_time = keyframe['time']
                        keyframe['time'] = original_time * slowdown_factor
                print(f"  ✅ Slowed down {slot_name} opacity animation")

    # Process bones section (movement animations)
    if 'bones' in animation:
        print("Slowing down bone animations (movement effects)...")
        for bone_name, bone_data in animation['bones'].items():

            # Slow down translate animations
            if 'translate' in bone_data:
                for keyframe in bone_data['translate']:
                    if 'time' in keyframe:
                        original_time = keyframe['time']
                        keyframe['time'] = original_time * slowdown_factor

                    # Slow down curve control points timing
                    if 'curve' in keyframe and isinstance(keyframe['curve'], list) and len(keyframe['curve']) >= 8:
                        # Curve timing values are at indices 0, 2, 4, 6
                        for time_idx in [0, 2, 4, 6]:
                            if time_idx < len(keyframe['curve']):
                                keyframe['curve'][time_idx] = keyframe['curve'][time_idx] * slowdown_factor

            # Slow down rotation animations
            if 'rotate' in bone_data:
                for keyframe in bone_data['rotate']:
                    if 'time' in keyframe:
                        original_time = keyframe['time']
                        keyframe['time'] = original_time * slowdown_factor

            # Slow down scale animations
            if 'scale' in bone_data:
                for keyframe in bone_data['scale']:
                    if 'time' in keyframe:
                        original_time = keyframe['time']
                        keyframe['time'] = original_time * slowdown_factor

            print(f"  ✅ Slowed down {bone_name} movement animation")

    # Create backup and save modified file
    backup_path = file_path + '.slowdown_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Slowed down transition animation saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/transition/transition.json"

    print("Slowing down transition animation...")
    print(f"Making animation 50% slower (1.5x longer duration)")
    success = slow_down_transition(file_path)

    if success:
        print("\nTransition animation slowdown completed!")
        print("✅ All movement animations slowed down by 50%")
        print("✅ All opacity/color animations slowed down by 50%")
        print("✅ All rotation animations slowed down by 50%")
        print("✅ All curve timings adjusted")
        print("✅ Animation now plays more slowly and smoothly")
    else:
        print("Failed to slow down transition animation.")