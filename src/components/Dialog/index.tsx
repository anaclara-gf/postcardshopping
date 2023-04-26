import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../../store/hooks';
import {Dialog} from '@rneui/themed';
import {removeAllProducts} from '../../store/shoppingCart/shoppingCartSlice';

interface Props {
  toggleDialog: any;
  dialog: boolean;
}

function DeleteDialog({toggleDialog, dialog}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Dialog isVisible={dialog} onBackdropPress={toggleDialog}>
      <Dialog.Title title="Tem certeza que quer esvaziar seu carrinho?" />
      <Dialog.Actions>
        <View style={styles.buttonsContainer}>
          <Dialog.Button
            title="Cancelar"
            titleProps={{style: styles.cancelButton}}
            onPress={toggleDialog}
          />
          <Dialog.Button
            title="Apagar"
            titleProps={{style: styles.deleteButton}}
            onPress={() => {
              dispatch(removeAllProducts());
              toggleDialog();
            }}
          />
        </View>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    color: 'darkblue',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeleteDialog;
