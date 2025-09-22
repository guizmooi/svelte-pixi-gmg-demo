#!/usr/bin/env python3
import json
import sys
import copy

def create_single_frequent_bubble(file_path):
    """
    Remove group bubble animations and create a single frequent bubble animation.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Create backup
    backup_path = file_path + '.single_bubble_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Remove all bubble6-bubble15 bones
    if 'bones' in data:
        data['bones'] = [bone for bone in data['bones'] if not (
            bone.get('name', '').startswith('bubble') and
            bone.get('name', '')[6:].isdigit() and
            int(bone.get('name', '')[6:]) >= 6
        )]
        print("Removed bubble6-bubble15 bones")

    # Remove all bubble6-bubble15 slots
    if 'slots' in data:
        data['slots'] = [slot for slot in data['slots'] if not (
            slot.get('name', '').startswith('bubble') and
            slot.get('name', '')[6:].isdigit() and
            int(slot.get('name', '')[6:]) >= 6
        )]
        print("Removed bubble6-bubble15 slots")

    # Remove bubble6-bubble15 skin attachments
    if 'skins' in data and len(data['skins']) > 0:
        default_skin = data['skins'][0]
        if 'attachments' in default_skin:
            for bubble_name in [f'bubble{i}' for i in range(6, 16)]:
                if bubble_name in default_skin['attachments']:
                    del default_skin['attachments'][bubble_name]
            print("Removed bubble6-bubble15 skin attachments")

    # Remove bubble6-bubble15 animations from dust animation
    if 'animations' in data and 'dust' in data['animations']:
        dust_animation = data['animations']['dust']

        # Remove from bones animations
        if 'bones' in dust_animation:
            for bubble_name in [f'bubble{i}' for i in range(6, 16)]:
                if bubble_name in dust_animation['bones']:
                    del dust_animation['bones'][bubble_name]

        # Remove from slots animations
        if 'slots' in dust_animation:
            for bubble_name in [f'bubble{i}' for i in range(6, 16)]:
                if bubble_name in dust_animation['slots']:
                    del dust_animation['slots'][bubble_name]

        print("Removed bubble6-bubble15 from dust animation")

    # Create a single frequent bubble (bubble_single)
    single_bubble_name = "bubble_single"

    # Add single bubble bone
    single_bubble_bone = {
        "name": single_bubble_name,
        "parent": "root",
        "x": 0,  # Center position
        "y": 600  # Start from bottom
    }
    data['bones'].append(single_bubble_bone)

    # Add single bubble slot
    single_bubble_slot = {
        "name": single_bubble_name,
        "bone": single_bubble_name,
        "attachment": single_bubble_name,
        "blend": "additive"
    }
    data['slots'].append(single_bubble_slot)

    # Add single bubble skin attachment (reuse dust1 image)
    if 'skins' in data and len(data['skins']) > 0:
        default_skin = data['skins'][0]
        if 'attachments' in default_skin:
            default_skin['attachments'][single_bubble_name] = {
                single_bubble_name: copy.deepcopy(default_skin['attachments']['dust1']['dust1'])
            }

    # Create frequent bubble animation (appears every 2 seconds, short duration)
    if 'animations' in data and 'dust' in data['animations']:
        dust_animation = data['animations']['dust']

        # Create bone animation for upward movement
        single_bubble_bone_anim = {
            "translate": []
        }

        # Animation cycle: 2 seconds up, 0.5 seconds pause, repeat
        cycle_duration = 2.5
        animation_duration = 2.0
        num_cycles = int(24 / cycle_duration)  # 24 seconds total, multiple cycles

        for cycle in range(num_cycles):
            start_time = cycle * cycle_duration
            end_time = start_time + animation_duration

            # Start position (bottom)
            single_bubble_bone_anim["translate"].append({
                "time": start_time,
                "x": 0,
                "y": 0
            })

            # End position (top) - much higher for faster movement
            single_bubble_bone_anim["translate"].append({
                "time": end_time,
                "x": 0,
                "y": -800,  # Move up 800 pixels
                "curve": [end_time + 0.1, 0, end_time + 0.2, -800]  # Smooth curve
            })

            # Reset position for next cycle
            if cycle < num_cycles - 1:
                single_bubble_bone_anim["translate"].append({
                    "time": start_time + cycle_duration,
                    "x": 0,
                    "y": 0
                })

        dust_animation['bones'][single_bubble_name] = single_bubble_bone_anim

        # Create slot animation for fade in/out
        single_bubble_slot_anim = {
            "rgba": []
        }

        for cycle in range(num_cycles):
            start_time = cycle * cycle_duration
            fade_in_time = start_time + 0.2
            fade_out_start = start_time + animation_duration - 0.5
            end_time = start_time + animation_duration

            # Start invisible
            single_bubble_slot_anim["rgba"].append({
                "time": start_time,
                "color": "ffffff00"  # Transparent
            })

            # Fade in quickly
            single_bubble_slot_anim["rgba"].append({
                "time": fade_in_time,
                "color": "ffffffff"  # Opaque
            })

            # Stay visible
            single_bubble_slot_anim["rgba"].append({
                "time": fade_out_start,
                "color": "ffffffff"  # Opaque
            })

            # Fade out
            single_bubble_slot_anim["rgba"].append({
                "time": end_time,
                "color": "ffffff00"  # Transparent
            })

            # Stay invisible between cycles
            if cycle < num_cycles - 1:
                single_bubble_slot_anim["rgba"].append({
                    "time": start_time + cycle_duration,
                    "color": "ffffff00"  # Transparent
                })

        dust_animation['slots'][single_bubble_name] = single_bubble_slot_anim

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Single frequent bubble animation saved: {file_path}")
    print(f"✅ Removed 10 random bubble group animations (bubble6-bubble15)")
    print(f"✅ Created single frequent bubble animation ({single_bubble_name})")
    print(f"✅ Bubble appears every 2.5 seconds with 2-second upward movement")
    print(f"✅ Smooth fade in/out effects")
    print(f"✅ Much more frequent and predictable than random group")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Creating single frequent bubble animation...")
    success = create_single_frequent_bubble(file_path)

    if success:
        print("\nSingle frequent bubble animation completed!")
    else:
        print("Failed to create single frequent bubble animation.")