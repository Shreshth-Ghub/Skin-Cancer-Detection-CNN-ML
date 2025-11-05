import tensorflow as tf
import tf_keras
from tf_keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = 128
BATCH_SIZE = 16
NUM_CLASSES = 13
EPOCHS = 10

print("Setting up data generators...")

train_datagen = ImageDataGenerator(rescale=1./255)
val_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    'dataset/train',  
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    color_mode='rgb',
    shuffle=True
)

val_generator = val_datagen.flow_from_directory(
    'dataset/val',
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    color_mode='rgb',
    shuffle=False
)

print(f"Found {train_generator.samples} training images")
print(f"Found {val_generator.samples} validation images")
print(f"Steps per epoch: {train_generator.samples // BATCH_SIZE}")

model = tf_keras.Sequential([
    tf_keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    tf_keras.layers.MaxPooling2D(2, 2),
    tf_keras.layers.Conv2D(64, (3,3), activation='relu'),
    tf_keras.layers.MaxPooling2D(2, 2),
    tf_keras.layers.Flatten(),
    tf_keras.layers.Dropout(0.5),
    tf_keras.layers.Dense(128, activation='relu'),
    tf_keras.layers.Dense(NUM_CLASSES, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("Model created successfully!")
model.summary()

print("Starting training...")
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    epochs=EPOCHS,
    validation_data=val_generator,
    validation_steps=val_generator.samples // BATCH_SIZE
)

model.save('skin_cancer_simple_model.h5')
print("Training complete! Model saved as 'skin_cancer_simple_model.h5'")
print(f"Final accuracy: {history.history['accuracy'][-1]:.4f}")
print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")