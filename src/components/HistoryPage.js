import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Modal, Button, Gap } from 'react-native';

import { SvgXml } from 'react-native-svg';

import trashIcon from '../../assets/Trash_font_awesome';
import { getHistory, deleteHistoryById } from '../database';

export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isVisible, setIsVisible] = useState(false);


  const renderItem = ({ item, index }) => (
    <>
      <Modal
        onRequestClose={() => setIsVisible(false)}
        transparent
        visible={isVisible}
      >
        <View style={styles.containeralt}>
          <Text style={{ textAlign: 'center' }}>
            Biztos szeretné törölni?
          </Text>
          <View >
            <Button onPress={() => {
              setIsVisible(false);
            }} title={'Mégsem'} />
            <Button onPress={() => {
              setIsVisible(false);
              deleteHistoryById(props.userData.email, currentId);
              let historyChunk = history.shift();
              setHistory([...history]);
            }} title={'Törlés'} buttonStyle={{ justifyContent: 'flex-end' }} />
          </View>

        </View>

      </Modal>
      <View
        style={[
          styles.historyItemContainer,
          styles.shadow,
          item.state === 'in' ? styles.containerIn : styles.containerOut,
          styles.container
        ]}>
        <View style={[styles.historyTextContainer,]}>
          <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('hu-HU')}</Text>

          <Text style={[
            styles.currentStateText,
            item.state === 'in' ? styles.currentStateTextIn : styles.currentStateTextOut,
          ]}>
            {item.state === 'in' ? 'bejött' : 'távozott'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => { setCurrentId(item.id); setIsVisible(true); }}>
          {index === 0 ? <div style={styles.trashIcon} dangerouslySetInnerHTML={{ __html: trashIcon }} /> : ''}
        </TouchableOpacity>
      </View>
    </>
  );

  useEffect(() => {
    // async IIFE
    (async () => {
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containeralt: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    height: 300,
    margin: 'auto',
    padding: 30,
    width: 300
  },
  gap: {
    height: 10,
  },
  trashIcon: {
    width: 20,
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
