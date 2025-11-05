import tf_keras

model = tf_keras.models.load_model('../skin_cancer_simple_model.h5')

print("=== MODEL INSPECTION ===")
print(f"Model input shape: {model.input_shape}")
print(f"Expected image size: {model.input_shape[1]}x{model.input_shape[2]}")

print("\n=== MODEL ARCHITECTURE ===")
for i, layer in enumerate(model.layers):
    print(f"Layer {i}: {layer.name} - Input: {layer.input_shape} -> Output: {layer.output_shape}")

print("\n=== SOLUTION ===")
expected_size = model.input_shape[1]
print(f"Your model expects images of size: {expected_size}x{expected_size}")
print(f"Make sure to use target_size=({expected_size}, {expected_size}) in your data generators")
