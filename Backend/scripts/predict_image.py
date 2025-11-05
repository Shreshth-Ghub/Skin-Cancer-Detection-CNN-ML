import tf_keras
from tf_keras.preprocessing import image
import numpy as np
import os

model = tf_keras.models.load_model('skin_cancer_simple_model.h5')

IMG_SIZE = 128

class_names = [
    'actinic keratosis', 'basal cell carcinoma', 'dermatofibroma', 
    'melanoma', 'nevus', 'pigmented benign keratosis', 
    'seborrheic keratosis', 'squamous cell carcinoma', 
    'vascular lesion', 'others', 'class11', 'class12', 'class13'
]

def predict_skin_cancer(image_path):
    """Predict skin cancer class for a single image"""
    if not os.path.exists(image_path):
        print(f"Image not found: {image_path}")
        return None
    
    img = image.load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    predictions = model.predict(img_array, verbose=0)
    predicted_idx = np.argmax(predictions[0])
    confidence = predictions[0][predicted_idx]
    
    print(f"\nImage: {os.path.basename(image_path)}")
    print(f"Predicted: {class_names[predicted_idx]} ({confidence*100:.2f}% confidence)")
    print("Top 3 predictions:")
    top3_idx = np.argsort(predictions[0])[-3:][::-1]
    for i, idx in enumerate(top3_idx):
        print(f"  {i+1}. {class_names[idx]}: {predictions[0][idx]*100:.2f}%")
    print("-"*40)
    return predicted_idx, confidence

if __name__ == "__main__":
    print(f"Model expects {IMG_SIZE}x{IMG_SIZE} images")
    
    val_dir = 'Skin_Cancer_Detection_CNN/dataset/val'
    if os.path.exists(val_dir):
        print("\nTesting on validation images...")
        for class_folder in os.listdir(val_dir)[:3]:  
            class_path = os.path.join(val_dir, class_folder)
            if os.path.isdir(class_path):
                print(f"\nClass: {class_folder}")
                for img_name in os.listdir(class_path)[:2]:  
                    img_path = os.path.join(class_path, img_name)
                    predict_skin_cancer(img_path)
    
    custom_img = r"C:\Users\Shreshth Gupt\OneDrive\Desktop\skincancerpredictedmodel1.jpg"
    print(f"\nTesting custom image...")
    predict_skin_cancer(custom_img)