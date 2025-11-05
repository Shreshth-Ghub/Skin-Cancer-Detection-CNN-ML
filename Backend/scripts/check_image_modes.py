from PIL import Image
import os

sample_dir = '../dataset/train'  # adjust path as needed

for root, dirs, files in os.walk(sample_dir):
    for file in files[:5]:  # check first 5 files
        path = os.path.join(root, file)
        try:
            img = Image.open(path)
            print(f"{file}: mode = {img.mode}")
        except Exception as e:
            print(f"Error opening {file}: {e}")