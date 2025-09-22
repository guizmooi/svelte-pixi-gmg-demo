#!/usr/bin/env python3
import json
import sys
import copy

def create_bubble_group(file_path):
    """
    Create a group of bubbles with the same good behavior as the current one.
    """

    # Read the current file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if animations exist
    if 'animations' not in data or 'dust' not in data['animations']:
        print("No dust animation found in file")
        return False

    dust_animation = data['animations']['dust']

    # Find a good bubble animation to use as template
    template_bone = None
    template_slot = None

    # Look for a dust particle with good behavior
    if 'bones' in dust_animation:
        for bone_name in ['dust1', 'dust2', 'dust3', 'dust4', 'dust5']:
            if bone_name in dust_animation['bones'] and 'translate' in dust_animation['bones'][bone_name]:
                template_bone = bone_name
                break

    if 'slots' in dust_animation:
        for slot_name in ['dust1', 'dust2', 'dust3', 'dust4', 'dust5']:
            if slot_name in dust_animation['slots']:
                template_slot = slot_name
                break

    if not template_bone or not template_slot:
        print("No suitable template bubble found")
        return False

    print(f"Using {template_bone} as template for bubble group")

    # Create additional bubbles (bubble6 through bubble15 = 10 total bubbles)
    new_bubbles = []
    for i in range(6, 16):  # Create bubble6 to bubble15
        bubble_name = f"bubble{i}"
        new_bubbles.append(bubble_name)

        # Add bone definition
        if 'bones' not in data:
            data['bones'] = []

        # Create new bone with slight position variation
        import random
        random.seed(i)  # Consistent randomization
        x_offset = random.randint(-800, 800)
        y_offset = random.randint(-200, 200)

        new_bone = {
            "name": bubble_name,
            "parent": "root",
            "x": x_offset,
            "y": 500 + y_offset
        }
        data['bones'].append(new_bone)

        # Add slot definition
        if 'slots' not in data:
            data['slots'] = []

        new_slot = {
            "name": bubble_name,
            "bone": bubble_name,
            "attachment": bubble_name,
            "blend": "additive"
        }
        data['slots'].append(new_slot)

        # Add skin attachment (reuse dust1 image)
        if 'skins' in data and len(data['skins']) > 0:
            default_skin = data['skins'][0]
            if 'attachments' in default_skin:
                # Use dust1 image for all bubbles
                default_skin['attachments'][bubble_name] = copy.deepcopy(default_skin['attachments']['dust1'])

        # Add bone animation (copy and modify template)
        if template_bone in dust_animation['bones']:
            new_bone_anim = copy.deepcopy(dust_animation['bones'][template_bone])

            # Add slight timing variation to make bubbles appear at different times
            time_offset = (i - 6) * 0.5  # Stagger by 0.5 seconds each

            if 'translate' in new_bone_anim:
                for keyframe in new_bone_anim['translate']:
                    if 'time' in keyframe:
                        keyframe['time'] += time_offset

                    # Add slight positional variation
                    if 'x' in keyframe:
                        keyframe['x'] += random.randint(-100, 100)
                    if 'y' in keyframe:
                        keyframe['y'] += random.randint(-50, 50)

            dust_animation['bones'][bubble_name] = new_bone_anim

        # Add slot animation (copy template with timing variation)
        if template_slot in dust_animation['slots']:
            new_slot_anim = copy.deepcopy(dust_animation['slots'][template_slot])

            if 'rgba' in new_slot_anim:
                for keyframe in new_slot_anim['rgba']:
                    if 'time' in keyframe:
                        keyframe['time'] += time_offset

            dust_animation['slots'][bubble_name] = new_slot_anim

        print(f"Created {bubble_name} with {time_offset}s time offset")

    # Create backup and save modified file
    backup_path = file_path + '.bubble_group_backup'
    with open(backup_path, 'w') as f:
        json.dump(data, f)
    print(f"Backup saved to: {backup_path}")

    # Save modified file
    with open(file_path, 'w') as f:
        json.dump(data, f, separators=(',', ':'))  # Compact format

    print(f"Bubble group animation saved: {file_path}")
    return True

if __name__ == "__main__":
    file_path = "/home/nana/Documents/svelte-pixi-gmg-demo/apps/gmg/static/assets/spines/foregroundAnimation/mm_bg.json"

    print("Creating group of bubbles with same good behavior...")
    success = create_bubble_group(file_path)

    if success:
        print("\nBubble group creation completed!")
        print("✅ Created 10 additional bubbles (bubble6-bubble15)")
        print("✅ All bubbles have same bottom-to-top movement")
        print("✅ Staggered timing for natural effect")
        print("✅ Slight position variations for realism")
        print("✅ All use the same visual appearance")
        print("✅ Same opacity and color effects")
    else:
        print("Failed to create bubble group.")