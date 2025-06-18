
import { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (item: string, quantity: number) => void;
};

export function AddItemModal({ visible, onClose, onSubmit }: Props) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('1');

  function handleSubmit() {
    const trimmed = item.trim();
    const qty = parseInt(quantity);
    if (!trimmed || isNaN(qty) || qty <= 0) return;

    onSubmit(trimmed, qty);
    setItem('');
    setQuantity('1');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.label}>Item</Text>
          <TextInput
            style={styles.input}
            value={item}
            onChangeText={setItem}
            placeholder="e.g. Milk"
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <Button title="Add Item" onPress={handleSubmit} />
          <Button title="Cancel" color="gray" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
});
