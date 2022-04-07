import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import colors from '../../../component/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
const Blog = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Story = useSelector(state => state.Story);
  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState(Story);
  const [masterDataSource, setMasterDataSource] = useState(Story);

  useEffect(async () => {
    // dispatch({
    //     type: 'Get_Story_Request',
    //     url: 'getpost',
    //     post_category_id:2
    // })
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      const data = new FormData();
      data.append('post_category_id', 2);
      data.append('user_id', user_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/getpost',
      });
      if (response.data.status == 200) {
        setFilteredDataSource(response.data.data.blogpost);
        setMasterDataSource(response.data.data.blogpost);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData =
          `${item.short_content} ${item.title} ${item.created_date}`
            ? `${item.short_content} ${item.title} ${item.created_date}`.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
          }}>
          <Image
            style={{width: 25, height: 24}}
            source={require('../../../assets/Image/search1.png')}
          />
          <TextInput
            placeholder="Search here"
            value={search}
            placeholderTextColor={colors.heading1}
            onChangeText={val => searchFilterFunction(val)}
            style={{color: colors.textColor, width: '70%',marginLeft: 10}}
            returnKeyType="done"
          />
        </View>
        {search ? (
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => handleSearch()}
            style={{
              backgroundColor: colors.bc,
              borderRadius: 15,
              justifyContent: 'center',
              height: 30,
              width: 30,
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginRight: 10,
                color: '#fff',
                marginLeft: 10,
                marginBottom: 3,
              }}>
              x
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.main}>
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.card}>
              {/* <View style={styles.titleView}> */}
              <View style={styles.titleView}>
                <Text style={styles.Text1}>{item.title}</Text>
              </View>
              {/* </View> */}
              {item.short_content ? (
                <View style={styles.view}>
                  <Text style={styles.Textt}>{item.short_content}</Text>
                </View>
              ) : null}
              <View style={styles.view}>
                <Text
                  style={
                    styles.Textp
                  }>{`published on ${item.created_date}`}</Text>
              </View>
              {/* <View style={styles.view}>
                            <Text style={styles.Textc}>{item.short_content}</Text>
                        </View> */}
              <View style={styles.line} />
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => navigation.navigate('StoryCategory', {item})}>
                <Text style={styles.Textr}>Read More</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Blog;
