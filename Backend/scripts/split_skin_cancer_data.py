import os
import shutil
import random

ORIGINAL_PATH = r"C:\Users\Shreshth Gupt\OneDrive\Desktop\Skin-cancer proj\Skin cancer ISIC The International Skin Imaging Collaboration\Test"
BASE_OUTPUT = r"C:\Users\Shreshth Gupt\OneDrive\Desktop\Skin-cancer proj\dataset"
TRAIN_PATH = os.path.join(BASE_OUTPUT, 'train')
VAL_PATH = os.path.join(BASE_OUTPUT, 'val')
VAL_FRACTION = 0.2

class_names = [d for d in os.listdir(ORIGINAL_PATH) if os.path.isdir(os.path.join(ORIGINAL_PATH, d))]
for class_name in class_names:
    images = os.listdir(os.path.join(ORIGINAL_PATH, class_name))
    random.shuffle(images)
    n_val = int(len(images) * VAL_FRACTION)
    val_imgs = images[:n_val]
    train_imgs = images[n_val:]

    train_class_path = os.path.join(TRAIN_PATH, class_name)
    val_class_path = os.path.join(VAL_PATH, class_name)
    os.makedirs(train_class_path, exist_ok=True)
    os.makedirs(val_class_path, exist_ok=True)

    for img in train_imgs:
        src = os.path.join(ORIGINAL_PATH, class_name, img)
        dst = os.path.join(train_class_path, img)
        if os.path.isfile(src):
            shutil.copy2(src, dst)
    for img in val_imgs:
        src = os.path.join(ORIGINAL_PATH, class_name, img)
        dst = os.path.join(val_class_path, img)
        if os.path.isfile(src):
            shutil.copy2(src, dst)

print("Done! Check 'dataset/train' and 'dataset/val' — they should have images now.")
