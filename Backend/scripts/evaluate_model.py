import tf_keras
from tf_keras.preprocessing.image import ImageDataGenerator
import numpy as np

model = tf_keras.models.load_model('skin_cancer_simple_model.h5')

IMG_SIZE = 128

print("Setting up validation data...")
val_datagen = ImageDataGenerator(rescale=1./255)

val_generator = val_datagen.flow_from_directory(
    r"C:\Users\Shreshth Gupt\OneDrive\Desktop\Skin-cancer proj\dataset\val",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=16,
    class_mode='categorical',
    shuffle=False,
    color_mode='rgb'
)

print(f"Found {val_generator.samples} validation images")
print(f"Using correct image size: {IMG_SIZE}x{IMG_SIZE}")

print("Evaluating model...")
loss, accuracy = model.evaluate(val_generator)

print(f'\n=== EVALUATION RESULTS ===')
print(f'Validation loss: {loss:.4f}')
print(f'Validation accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)')

class_names = list(val_generator.class_indices.keys())
print(f"Classes found: {class_names}")

val_generator.reset()
predictions = model.predict(val_generator)
predicted_classes = np.argmax(predictions, axis=1)
true_classes = val_generator.classes

print(f'\n=== PER-CLASS PERFORMANCE ===')
for i, class_name in enumerate(class_names):
    class_mask = true_classes == i
    if np.sum(class_mask) > 0:
        class_accuracy = np.mean(predicted_classes[class_mask] == i)
        num_samples = np.sum(class_mask)
        print(f'{class_name}: {class_accuracy:.2f} ({class_accuracy*100:.1f}%) - {num_samples} samples')

print(f'\nOverall validation accuracy: {accuracy*100:.1f}%')